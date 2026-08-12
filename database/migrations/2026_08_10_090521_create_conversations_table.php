<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();

            // Jika chat berkaitan dengan donasi tertentu
            $table->foreignId('donation_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            // Jika chat berkaitan dengan pengajuan tertentu
            $table->foreignId('donation_request_id')
                ->nullable()
                ->constrained('donation_requests')
                ->cascadeOnDelete();

            // Jenis percakapan
            $table->enum('type', [
                'donor_recipient',
                'donor_admin',
                'recipient_admin',
                'general'
            ]);

            $table->timestamp('last_message_at')->nullable();

            $table->timestamps();
        });

        Schema::create('conversation_participants', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conversation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamp('last_read_at')->nullable();

            $table->timestamps();

            // Satu user hanya boleh sekali dalam satu conversation
            $table->unique([
                'conversation_id',
                'user_id'
            ]);
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conversation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('sender_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->text('message');

            $table->timestamp('read_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversation_participants');
        Schema::dropIfExists('conversations');
    }
};
