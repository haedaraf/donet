<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $conversations = Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->with(['participants.user', 'donation.images', 'messages' => function ($q) {
                $q->latest()->limit(1);
            }])
            ->orderByDesc('last_message_at')
            ->get();

        return Inertia::render('chats/index', [
            'conversations' => $conversations
        ]);
    }

    public function show($id)
    {
        $conversation = Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->with([
                'participants.user', 
                'donation.images', 
                'donationRequest',
                'messages.sender'
            ])
            ->findOrFail($id);

        $conversations = Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->with(['participants.user', 'donation.images', 'messages' => function ($q) {
                $q->latest()->limit(1);
            }])
            ->orderByDesc('last_message_at')
            ->get();

        return Inertia::render('chats/show', [
            'conversations' => $conversations,
            'activeConversation' => $conversation
        ]);
    }

    public function store(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        $conversation = Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', Auth::id());
            })->findOrFail($id);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => Auth::id(),
            'message' => $request->message
        ]);

        $conversation->update(['last_message_at' => now()]);

        return back();
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:completed,rejected,cancelled'
        ]);

        $conversation = Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', Auth::id());
            })->findOrFail($id);

        if ($conversation->donationRequest && $conversation->donationRequest->status === 'approved') {
            // Only donor can complete it (donation belongs to them)
            if ($conversation->donation->user_id === Auth::id()) {
                $conversation->donationRequest->update([
                    'status' => $request->status
                ]);

                $title = 'Status Transaksi Diperbarui';
                $message = 'Status transaksi donasi barang "' . $conversation->donation->title . '" telah diubah menjadi ' . $request->status . '.';
                if ($request->status === 'completed') {
                    $title = 'Barang Telah Diterima';
                    $message = 'Transaksi donasi barang "' . $conversation->donation->title . '" telah selesai. Terima kasih!';
                } elseif ($request->status === 'rejected') {
                    $title = 'Transaksi Ditolak';
                    $message = 'Mohon maaf, transaksi donasi barang "' . $conversation->donation->title . '" dibatalkan oleh Donatur.';
                }

                \App\Models\Notification::create([
                    'user_id' => $conversation->donationRequest->recipient_id,
                    'title' => $title,
                    'message' => $message
                ]);

                return back()->with('success', 'Status transaksi berhasil diperbarui.');
            }
        }

        return back()->with('error', 'Tidak dapat memperbarui status transaksi.');
    }
}
