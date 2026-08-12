<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'condition',
        'quantity',
        'pickup_address',
        'city',
        'province',
        'status',
        'published_at',
        'completed_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(DonationImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
