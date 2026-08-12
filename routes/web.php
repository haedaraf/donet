<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/cara-kerja', 'CaraKerja')->name('cara-kerja');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('donations', \App\Http\Controllers\DonationController::class);
    Route::get('explore', [\App\Http\Controllers\ExploreController::class, 'index'])->name('explore.index');
    Route::get('explore/{id}', [\App\Http\Controllers\ExploreController::class, 'show'])->name('explore.show');
    Route::post('explore/{id}/request', [\App\Http\Controllers\ExploreController::class, 'requestDonation'])->name('explore.request');
    
    Route::get('requests', [\App\Http\Controllers\DonationRequestController::class, 'index'])->name('requests.index');
    Route::post('requests/{id}/cancel', [\App\Http\Controllers\DonationRequestController::class, 'cancel'])->name('requests.cancel');
});

require __DIR__.'/settings.php';
