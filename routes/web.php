<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/cara-kerja', 'CaraKerja')->name('cara-kerja');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('donations', \App\Http\Controllers\DonationController::class);
    Route::get('explore', [\App\Http\Controllers\ExploreController::class, 'index'])->name('explore.index');
});

require __DIR__.'/settings.php';
