<?php

namespace App\Services;

use App\Models\Timecard;
use App\Repositories\TimecardRepository;

class TimecardService
{
    public function __construct(
        private readonly TimecardRepository $timecards,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Timecard
    {
        return $this->timecards->create($data);
    }
}
