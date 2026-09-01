<?php

namespace App\Repositories;

use App\Models\Employee;
use App\Models\Timecard;
use Illuminate\Database\Eloquent\Collection;

class TimecardRepository
{
    /**
     * @return Collection<int, Timecard>
     */
    public function forEmployee(Employee $employee): Collection
    {
        return $employee->timecards()->orderByDesc('date')->get();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Timecard
    {
        return Timecard::create($data)->refresh();
    }
}
