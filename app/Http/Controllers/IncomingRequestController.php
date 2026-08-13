<?php

namespace App\Http\Controllers;

use App\Models\DonationRequest;
use App\Models\Conversation;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IncomingRequestController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'donor') {
            abort(403, 'Akses ditolak.');
        }

        $requests = DonationRequest::with(['donation.images', 'recipient'])
            ->whereHas('donation', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('notifications/index', [
            'requests' => $requests
        ]);
    }

    public function approve($id)
    {
        if (Auth::user()->role !== 'donor') {
            abort(403, 'Akses ditolak.');
        }

        $donationRequest = DonationRequest::whereHas('donation', function ($query) {
            $query->where('user_id', Auth::id());
        })->findOrFail($id);

        if ($donationRequest->status !== 'pending') {
            return back()->with('error', 'Hanya permintaan pending yang dapat disetujui.');
        }

        $donationRequest->update([
            'status' => 'approved',
            'approved_at' => now()
        ]);
        
        // Decrease donation quantity
        $donation = $donationRequest->donation;
        if ($donation->quantity > 0) {
            $donation->decrement('quantity');
        }
        
        // If out of stock, mark as completed
        if ($donation->fresh()->quantity <= 0) {
            $donation->update(['status' => 'completed']);
        }

        // Create or get conversation
        $conversation = Conversation::firstOrCreate([
            'donation_id' => $donationRequest->donation_id,
            'donation_request_id' => $donationRequest->id,
            'type' => 'donor_recipient'
        ]);

        if (!$conversation->last_message_at) {
            $conversation->update(['last_message_at' => now()]);
        }
        
        // Ensure participants exist
        $conversation->participants()->firstOrCreate(['user_id' => Auth::id()]);
        $conversation->participants()->firstOrCreate(['user_id' => $donationRequest->recipient_id]);

        Notification::create([
            'user_id' => $donationRequest->recipient_id,
            'title' => 'Permintaan Disetujui',
            'message' => 'Permintaan Anda untuk barang "' . $donationRequest->donation->title . '" telah disetujui. Silakan cek Pesan Masuk untuk berdiskusi terkait pengambilan.'
        ]);

        return back()->with('success', 'Permintaan disetujui! Anda sekarang dapat menghubungi penerima.');
    }

    public function reject($id)
    {
        if (Auth::user()->role !== 'donor') {
            abort(403, 'Akses ditolak.');
        }

        $donationRequest = DonationRequest::whereHas('donation', function ($query) {
            $query->where('user_id', Auth::id());
        })->findOrFail($id);

        if ($donationRequest->status !== 'pending') {
            return back()->with('error', 'Hanya permintaan pending yang dapat ditolak.');
        }

        $donationRequest->update([
            'status' => 'rejected',
            'rejected_at' => now()
        ]);

        Notification::create([
            'user_id' => $donationRequest->recipient_id,
            'title' => 'Permintaan Ditolak',
            'message' => 'Mohon maaf, permintaan Anda untuk barang "' . $donationRequest->donation->title . '" belum dapat disetujui oleh Donatur.'
        ]);

        return back()->with('success', 'Permintaan telah ditolak.');
    }
}
