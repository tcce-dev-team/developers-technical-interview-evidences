<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\Timecard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_all_employees(): void
    {
        Employee::factory()->count(3)->create();

        $this->getJson('/api/employees')
            ->assertOk()
            ->assertJsonCount(3)
            ->assertJsonStructure([['id', 'name', 'employee_code', 'trade']]);
    }

    public function test_it_lists_the_timecards_of_an_employee(): void
    {
        $employee = Employee::factory()->create();
        Timecard::factory()->count(2)->for($employee)->create();
        Timecard::factory()->count(3)->create();

        $this->getJson("/api/employees/{$employee->id}/timecards")
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonStructure([['id', 'employee_id', 'date', 'hours', 'cost_code']]);
    }

    public function test_it_returns_an_empty_list_when_the_employee_has_no_timecards(): void
    {
        $employee = Employee::factory()->create();

        $this->getJson("/api/employees/{$employee->id}/timecards")
            ->assertOk()
            ->assertExactJson([]);
    }

    public function test_it_returns_not_found_for_an_unknown_employee(): void
    {
        $this->getJson('/api/employees/9999/timecards')
            ->assertNotFound();
    }
}
