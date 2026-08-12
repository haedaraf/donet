<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DonationRequest extends Model
{
    protected $fillable = [
        'donation_id',
        'recipient_id',
        'message',
        'status',
        'requested_at',
        'approved_at',
        'rejected_at'
    ];

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
}
