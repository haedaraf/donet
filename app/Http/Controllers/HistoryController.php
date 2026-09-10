<?php

namespace App\Http\Controllers;

use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function donorIndex()
    {
        if (Auth::user()->role !== 'donor') {
            abort(403);
        }

        $histories = \App\Models\Donation::withTrashed()
            ->with(['images', 'category', 'donationRequests.recipient'])
            ->where('user_id', Auth::id())
            ->latest('updated_at')
            ->paginate(10);

        $totalDonations = \App\Models\Donation::where('user_id', Auth::id())->count();

        return Inertia::render('history/donor', [
            'histories' => $histories,
            'totalDonations' => $totalDonations
        ]);
    }

    public function recipientIndex()
    {
        if (Auth::user()->role !== 'recipient') {
            abort(403);
        }

        $histories = DonationRequest::with(['donation.images', 'donation.user', 'donation'])
            ->where('recipient_id', Auth::id())
            ->latest('updated_at')
            ->paginate(10);

        return Inertia::render('history/recipient', [
            'histories' => $histories
        ]);
    }
}
