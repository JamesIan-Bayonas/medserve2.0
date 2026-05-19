<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Seeder;

class MedicineSeeder extends Seeder
{
    public function run()
    {
        Medicine::truncate();

        $data = [
            ['code' => 'MED-001', 'name' => 'Losartan 50mg', 'category' => 'Cardiovascular', 'unit' => 'tablet', 'current_stock' => 450, 'minimum_stock' => 50],
            ['code' => 'MED-002', 'name' => 'Amlodipine 10mg', 'category' => 'Cardiovascular', 'unit' => 'tablet', 'current_stock' => 320, 'minimum_stock' => 40],
            ['code' => 'MED-003', 'name' => 'Paracetamol 500mg', 'category' => 'Analgesic', 'unit' => 'tablet', 'current_stock' => 1250, 'minimum_stock' => 100],
            ['code' => 'MED-004', 'name' => 'Amoxicillin 500mg', 'category' => 'Antibiotic', 'unit' => 'capsule', 'current_stock' => 320, 'minimum_stock' => 50],
            ['code' => 'MED-005', 'name' => 'Paracetamol Syrup 120mg/5ml', 'category' => 'Pediatric', 'unit' => 'bottle', 'current_stock' => 85, 'minimum_stock' => 15],
        ];

        foreach ($data as $item) {
            Medicine::create($item);
        }

        echo "\n✅ " . count($data) . " medicines seeded successfully!\n";
    }
}
