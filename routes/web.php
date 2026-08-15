<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/cara-kerja', 'CaraKerja')->name('cara-kerja');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('donations', \App\Http\Controllers\DonationController::class);
    Route::get('explore', [\App\Http\Controllers\ExploreController::class, 'index'])->name('explore.index');
    Route::get('explore/{id}', [\App\Http\Controllers\ExploreController::class, 'show'])->name('explore.show');
    Route::post('explore/{id}/request', [\App\Http\Controllers\ExploreController::class, 'requestDonation'])->name('explore.request');
    
    Route::get('requests', [\App\Http\Controllers\DonationRequestController::class, 'index'])->name('requests.index');
    Route::post('requests/{id}/cancel', [\App\Http\Controllers\DonationRequestController::class, 'cancel'])->name('requests.cancel');
    
    Route::get('notifications', [\App\Http\Controllers\IncomingRequestController::class, 'index'])->name('notifications.index');
    Route::post('notifications/{id}/approve', [\App\Http\Controllers\IncomingRequestController::class, 'approve'])->name('notifications.approve');
    Route::post('notifications/{id}/reject', [\App\Http\Controllers\IncomingRequestController::class, 'reject'])->name('notifications.reject');

    Route::get('chats', [\App\Http\Controllers\ChatController::class, 'index'])->name('chats.index');
    Route::get('chats/{id}', [\App\Http\Controllers\ChatController::class, 'show'])->name('chats.show');
    Route::post('chats/{id}', [\App\Http\Controllers\ChatController::class, 'store'])->name('chats.store');
    Route::post('chats/{id}/status', [\App\Http\Controllers\ChatController::class, 'updateStatus'])->name('chats.status');

    Route::get('user-notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('user-notifications.index');
    
    Route::get('donor-history', [\App\Http\Controllers\HistoryController::class, 'donorIndex'])->name('history.donor');
    Route::get('recipient-history', [\App\Http\Controllers\HistoryController::class, 'recipientIndex'])->name('history.recipient');
});

require __DIR__.'/settings.php';
