<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        $stats = [];
        $recentItems = [];

        if ($role === 'donor') {
            // Stats for Donor
            $totalDonations = Donation::where('user_id', $user->id)->count();
            
            $pendingRequests = DonationRequest::whereHas('donation', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->where('status', 'pending')->count();

            $completedDonations = Donation::where('user_id', $user->id)
                ->where('status', 'completed')->count();

            $activeTransactions = DonationRequest::whereHas('donation', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->where('status', 'approved')->count();

            $stats = [
                ['label' => 'Total Donasi', 'value' => $totalDonations, 'color' => 'bg-blue-50 text-blue-600 border-blue-200'],
                ['label' => 'Menunggu Persetujuan', 'value' => $pendingRequests, 'color' => 'bg-amber-50 text-amber-600 border-amber-200'],
                ['label' => 'Transaksi Aktif', 'value' => $activeTransactions, 'color' => 'bg-emerald-50 text-emerald-600 border-emerald-200'],
                ['label' => 'Selesai Dibagikan', 'value' => $completedDonations, 'color' => 'bg-indigo-50 text-indigo-600 border-indigo-200'],
            ];

            // Recent Items for Donor
            $recentItems = Donation::where('user_id', $user->id)
                ->with(['images'])
                ->withCount('donationRequests')
                ->latest()
                ->take(4)
                ->get();

        } elseif ($role === 'recipient') {
            // Stats for Recipient
            $totalRequests = DonationRequest::where('recipient_id', $user->id)->count();
            $approvedRequests = DonationRequest::where('recipient_id', $user->id)->where('status', 'approved')->count();
            $completedRequests = DonationRequest::where('recipient_id', $user->id)->where('status', 'completed')->count();
            $rejectedRequests = DonationRequest::where('recipient_id', $user->id)->where('status', 'rejected')->count();

            $stats = [
                ['label' => 'Total Permintaan', 'value' => $totalRequests, 'color' => 'bg-blue-50 text-blue-600 border-blue-200'],
                ['label' => 'Disetujui', 'value' => $approvedRequests, 'color' => 'bg-emerald-50 text-emerald-600 border-emerald-200'],
                ['label' => 'Selesai Diambil', 'value' => $completedRequests, 'color' => 'bg-indigo-50 text-indigo-600 border-indigo-200'],
                ['label' => 'Ditolak / Batal', 'value' => $rejectedRequests, 'color' => 'bg-red-50 text-red-600 border-red-200'],
            ];

            // Recent Items for Recipient
            $recentItems = DonationRequest::where('recipient_id', $user->id)
                ->with(['donation.images', 'donation.user'])
                ->latest()
                ->take(4)
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentItems' => $recentItems
        ]);
    }
}
