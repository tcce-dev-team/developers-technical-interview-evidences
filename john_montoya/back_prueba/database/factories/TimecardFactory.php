<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Timecard;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Timecard>
 */
class TimecardFactory extends Factory
{
    protected $model = Timecard::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'date' => fake()->dateTimeBetween('-30 days')->format('Y-m-d'),
            'hours' => fake()->randomElement([4, 6, 7.5, 8, 8.5, 10]),
            'cost_code' => fake()->optional()->randomElement([
                'CC-1000',
                'CC-2000',
                'CC-3000',
                'CC-4000',
            ]),
        ];
    }
}
