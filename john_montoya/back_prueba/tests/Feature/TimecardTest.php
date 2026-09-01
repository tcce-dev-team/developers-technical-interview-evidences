<?php

namespace Tests\Feature;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TimecardTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_timecard(): void
    {
        $employee = Employee::factory()->create();

        $this->postJson('/api/timecards', [
            'employee_id' => $employee->id,
            'date' => '2025-09-01',
            'hours' => 8.5,
            'cost_code' => 'CC-1000',
        ])
            ->assertCreated()
            ->assertJsonPath('employee_id', $employee->id)
            ->assertJsonPath('cost_code', 'CC-1000');

        $this->assertDatabaseHas('timecards', [
            'employee_id' => $employee->id,
            'date' => '2025-09-01',
            'hours' => 8.5,
            'cost_code' => 'CC-1000',
        ]);
    }

    public function test_it_creates_a_timecard_without_a_cost_code(): void
    {
        $employee = Employee::factory()->create();

        $this->postJson('/api/timecards', [
            'employee_id' => $employee->id,
            'date' => '2025-09-01',
            'hours' => 8,
        ])
            ->assertCreated()
            ->assertJsonPath('cost_code', null);
    }

    public function test_it_requires_all_the_mandatory_fields(): void
    {
        $this->postJson('/api/timecards', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['employee_id', 'date', 'hours']);
    }

    public function test_it_rejects_an_employee_that_does_not_exist(): void
    {
        $this->postJson('/api/timecards', [
            'employee_id' => 9999,
            'date' => '2025-09-01',
            'hours' => 8,
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('employee_id');
    }

    public function test_it_rejects_invalid_data_types(): void
    {
        $employee = Employee::factory()->create();

        $this->postJson('/api/timecards', [
            'employee_id' => $employee->id,
            'date' => 'not-a-date',
            'hours' => 'not-a-number',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['date', 'hours']);
    }
}
