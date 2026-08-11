<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Category;
use App\Models\DonationImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donations = Donation::with(['user', 'images'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();
            
        return Inertia::render('donations/index', [
            'donations' => $donations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('donations/form', [
            'categories' => $categories,
            'donation' => new Donation()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'condition' => 'required|in:new,very_good,good,fair,damaged',
            'quantity' => 'required|integer|min:1',
            'pickup_address' => 'required|string',
            'city' => 'required|string',
            'province' => 'required|string',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'draft'; // or published

        $donation = Donation::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('donations', 'public');
                DonationImage::create([
                    'donation_id' => $donation->id,
                    'image' => $path,
                    'is_primary' => $index === 0,
                ]);
            }
        }

        return redirect()->route('donations.index')->with('success', 'Donation created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donation $donation)
    {
        if ($donation->user_id !== Auth::id()) {
            abort(403);
        }

        $donation->load('images');
        $categories = Category::all();
        return Inertia::render('donations/form', [
            'categories' => $categories,
            'donation' => $donation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donation $donation)
    {
        if ($donation->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'condition' => 'required|in:new,very_good,good,fair,damaged',
            'quantity' => 'required|integer|min:1',
            'pickup_address' => 'required|string',
            'city' => 'required|string',
            'province' => 'required|string',
            'status' => 'required|in:draft,published,cancelled',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $donation->update($validated);

        if ($request->hasFile('images')) {
            // Delete old images for simplicity, or add logic to manage them
            foreach ($donation->images as $image) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }

            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('donations', 'public');
                DonationImage::create([
                    'donation_id' => $donation->id,
                    'image' => $path,
                    'is_primary' => $index === 0,
                ]);
            }
        }

        return redirect()->route('donations.index')->with('success', 'Donation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donation $donation)
    {
        if ($donation->user_id !== Auth::id()) {
            abort(403);
        }

        $donation->delete();

        return redirect()->route('donations.index')->with('success', 'Donation deleted successfully.');
    }
}
