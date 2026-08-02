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
        Schema::create('donations', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('category_id')
                ->constrained()
                ->restrictOnDelete();

            $table->string('title');

            $table->text('description');

            $table->enum('condition', [
                'new',
                'very_good',
                'good',
                'fair',
                'damaged'
            ]);

            $table->integer('quantity')->default(1);

            $table->text('pickup_address');

            $table->string('city');

            $table->string('province');

            $table->enum('status',[
                'draft',
                'published',
                'requested',
                'approved',
                'rejected',
                'picked_up',
                'completed',
                'cancelled'
            ])->default('draft');

            $table->timestamp('published_at')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
