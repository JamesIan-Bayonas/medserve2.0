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
        // Admin User
        User::factory()->create([
            'name' => 'System Administrator',
            'email' => 'admin@medserve.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Staff User
        User::factory()->create([
            'name' => 'Staff',
            'email' => 'staff@medserve.com',
            'password' => bcrypt('password'),
            'role' => 'staff',
        ]);

        // Seed Medicines
        $this->call([
            MedicineSeeder::class,
            UserSeeder::class
        ]);
    }
}