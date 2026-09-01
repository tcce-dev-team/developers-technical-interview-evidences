<?php

namespace App\Repositories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Collection;

class EmployeeRepository
{
    /**
     * @return Collection<int, Employee>
     */
    public function all(): Collection
    {
        return Employee::query()->orderBy('name')->get();
    }

    public function find(int $id): ?Employee
    {
        return Employee::query()->find($id);
    }
}
