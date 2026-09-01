<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimecardController;
use Illuminate\Support\Facades\Route;

Route::get('employees', [EmployeeController::class, 'index']);
Route::get('employees/{employee}/timecards', [EmployeeController::class, 'timecards']);
Route::post('timecards', [TimecardController::class, 'store']);
