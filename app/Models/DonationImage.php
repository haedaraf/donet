<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DonationImage extends Model
{
    protected $fillable = ['donation_id', 'image', 'is_primary'];

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }
}
