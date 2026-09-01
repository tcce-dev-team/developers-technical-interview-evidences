<?php

namespace App\Models;

use Database\Factories\TimecardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timecard extends Model
{
    /** @use HasFactory<TimecardFactory> */
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'date',
        'hours',
        'cost_code',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d',
            'hours' => 'decimal:2',
        ];
    }

    /**
     * @return BelongsTo<Employee, $this>
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
