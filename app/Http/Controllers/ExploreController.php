<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Category;
use Illuminate\Http\Request;
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
}
