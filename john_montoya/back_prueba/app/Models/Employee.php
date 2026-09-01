<?php

namespace App\Models;

use Database\Factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    /** @use HasFactory<EmployeeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_code',
        'trade',
    ];

    /**
     * @return HasMany<Timecard, $this>
     */
    public function timecards(): HasMany
    {
        return $this->hasMany(Timecard::class);
    }
}
