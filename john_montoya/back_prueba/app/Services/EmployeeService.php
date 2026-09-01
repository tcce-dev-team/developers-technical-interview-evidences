<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\Timecard;
use App\Repositories\EmployeeRepository;
use App\Repositories\TimecardRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EmployeeService
{
    public function __construct(
        private readonly EmployeeRepository $employees,
        private readonly TimecardRepository $timecards,
    ) {}

    /**
     * @return Collection<int, Employee>
     */
    public function list(): Collection
    {
        return $this->employees->all();
    }

    /**
     * @return Collection<int, Timecard>
     *
     * @throws ModelNotFoundException When the employee does not exist.
     */
    public function timecardsFor(int $employeeId): Collection
    {
        $employee = $this->employees->find($employeeId);

        if ($employee === null) {
            throw (new ModelNotFoundException)->setModel(Employee::class, [$employeeId]);
        }

        return $this->timecards->forEmployee($employee);
    }
}
