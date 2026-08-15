<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Category;
use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index(Request $request)
    {
        $query = Donation::with(['images', 'category'])->where('status', 'published');

        // Search by title
        if ($request->has('search') && $request->search != '') {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        // Filter by condition
        if ($request->has('condition') && $request->condition != '') {
            $query->where('condition', $request->condition);
        }

        // Sort
        if ($request->has('sort')) {
            if ($request->sort == 'oldest') {
                $query->oldest();
            } else {
                $query->latest();
            }
        } else {
            $query->latest();
        }

        $donations = $query->paginate(12)->withQueryString();
        $categories = Category::all();

        return Inertia::render('explore/index', [
            'donations' => $donations,
            'categories' => $categories,
            'filters' => (object) $request->only(['search', 'category', 'condition', 'sort'])
        ]);
    }

    public function show($id)
    {
        $donation = Donation::with(['images', 'category', 'user'])->findOrFail($id);
        
        // If not published, only the owner can view it
        if ($donation->status !== 'published') {
            if (!Auth::check() || Auth::id() !== $donation->user_id) {
                abort(404);
            }
        }
        
        // Check if current user has already requested this
        $hasRequested = false;
        if (Auth::check() && Auth::user()->role === 'recipient') {
            $hasRequested = DonationRequest::where('donation_id', $id)
                ->where('recipient_id', Auth::id())
                ->exists();
        }

        return Inertia::render('explore/show', [
            'donation' => $donation,
            'hasRequested' => $hasRequested
        ]);
    }

    public function requestDonation(Request $request, $id)
    {
        $donation = Donation::where('status', 'published')->findOrFail($id);

        if (Auth::user()->role !== 'recipient') {
            abort(403, 'Hanya penerima yang bisa mengajukan permintaan.');
        }

        $request->validate([
            'message' => 'nullable|string|max:500'
        ]);

        $existingRequest = DonationRequest::where('donation_id', $id)
            ->where('recipient_id', Auth::id())
            ->first();

        if ($existingRequest) {
            return back()->with('error', 'Anda sudah mengajukan permintaan untuk barang ini.');
        }

        DonationRequest::create([
            'donation_id' => $id,
            'recipient_id' => Auth::id(),
            'message' => $request->message,
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        return back()->with('success', 'Permintaan berhasil diajukan! Menunggu persetujuan donatur.');
    }
}
