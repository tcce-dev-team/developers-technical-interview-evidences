<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimecardRequest;
use App\Services\TimecardService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TimecardController extends Controller
{
    public function __construct(
        private readonly TimecardService $timecards,
    ) {}

    public function store(StoreTimecardRequest $request): JsonResponse
    {
        $timecard = $this->timecards->create($request->validated());

        return response()->json($timecard, Response::HTTP_CREATED);
    }
}
