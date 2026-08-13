<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [
        'donation_id',
        'donation_request_id',
        'type',
        'last_message_at'
    ];

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }

    public function donationRequest()
    {
        return $this->belongsTo(DonationRequest::class);
    }

    public function participants()
    {
        return $this->hasMany(ConversationParticipant::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
