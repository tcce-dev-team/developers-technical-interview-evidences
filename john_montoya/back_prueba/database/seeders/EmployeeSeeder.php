<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            ['name' => 'Carlos Ramirez', 'trade' => 'Electrician'],
            ['name' => 'Maria Gonzalez', 'trade' => 'Plumber'],
            ['name' => 'James Whitfield', 'trade' => 'Carpenter'],
            ['name' => 'Aisha Bennett', 'trade' => 'Welder'],
            ['name' => 'Diego Herrera', 'trade' => 'Mason'],
            ['name' => 'Sofia Lindqvist', 'trade' => 'Painter'],
            ['name' => 'Marcus Doyle', 'trade' => 'Ironworker'],
            ['name' => 'Priya Raman', 'trade' => 'HVAC Technician'],
            ['name' => 'Tomas Novak', 'trade' => 'Electrician'],
            ['name' => 'Lucia Ferreira', 'trade' => 'Carpenter'],
        ];

        foreach ($employees as $index => $employee) {
            Employee::create([
                ...$employee,
                'employee_code' => sprintf('EMP-%03d', $index + 1),
            ]);
        }
    }
}
