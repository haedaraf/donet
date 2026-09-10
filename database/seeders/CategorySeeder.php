<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Elektronik'],
            ['name' => 'Pakaian'],
            ['name' => 'Buku'],
            ['name' => 'Peralatan Sekolah'],
            ['name' => 'Furnitur'],
            ['name' => 'Lain-lain'],
        ];

        $now = Carbon::now();

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
