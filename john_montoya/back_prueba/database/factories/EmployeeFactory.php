<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'employee_code' => 'EMP-'.fake()->unique()->numberBetween(100, 999),
            'trade' => fake()->randomElement([
                'Electrician',
                'Plumber',
                'Carpenter',
                'Welder',
                'Mason',
                'Painter',
                'Ironworker',
                'HVAC Technician',
            ]),
        ];
    }
}
