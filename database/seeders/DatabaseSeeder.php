<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'System Administrator',
            'email' => 'admin@medserve.com',
            'password' => bcrypt('password'),
        ]);

        // Seed Medicines
        $this->call([
            MedicineSeeder::class,
        ]);
    }
}