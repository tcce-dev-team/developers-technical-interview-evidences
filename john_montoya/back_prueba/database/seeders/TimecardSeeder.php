<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Timecard;
use Illuminate\Database\Seeder;

class TimecardSeeder extends Seeder
{
    public function run(): void
    {
        // The last employee is intentionally left without timecards so the
        // empty-state path can be exercised.
        Employee::query()
            ->orderBy('id')
            ->take(Employee::query()->count() - 1)
            ->get()
            ->each(function (Employee $employee): void {
                Timecard::factory()
                    ->count(fake()->numberBetween(3, 6))
                    ->for($employee)
                    ->create();
            });
    }
}
