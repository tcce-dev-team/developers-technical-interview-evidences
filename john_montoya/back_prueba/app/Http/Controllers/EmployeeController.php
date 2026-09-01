<?php

namespace App\Http\Controllers;

use App\Services\EmployeeService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class EmployeeController extends Controller
{
    public function __construct(
        private readonly EmployeeService $employees,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json($this->employees->list(), Response::HTTP_OK);
    }

    public function timecards(int $employee): JsonResponse
    {
        return response()->json($this->employees->timecardsFor($employee), Response::HTTP_OK);
    }
}
