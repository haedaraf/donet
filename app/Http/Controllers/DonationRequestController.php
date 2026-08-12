<?php

namespace App\Http\Controllers;

use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DonationRequestController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'recipient') {
            abort(403, 'Akses ditolak.');
        }

        $requests = DonationRequest::with(['donation.images', 'donation.category', 'donation.user'])
            ->where('recipient_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('requests/index', [
            'requests' => $requests
        ]);
    }

    public function cancel($id)
    {
        $donationRequest = DonationRequest::where('recipient_id', Auth::id())
            ->findOrFail($id);

        if ($donationRequest->status !== 'pending') {
            return back()->with('error', 'Hanya permintaan dengan status pending yang bisa dibatalkan.');
        }

        $donationRequest->update([
            'status' => 'cancelled'
        ]);

        return back()->with('success', 'Permintaan berhasil dibatalkan.');
    }
}
