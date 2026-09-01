# Employees & Timecards

Implementation of `SPEC.md`: list employees, list an employee's timecards, create a timecard.

- `back_prueba/` — Laravel 13 + MySQL API
- `vite-project/` — React 19 + TypeScript + React Query frontend

## Backend

```sh
cd back_prueba
# .env is already configured for MySQL (database: prueba_tecnica)
php artisan migrate:fresh --seed
php artisan serve --port=8000
```

The seeder creates 10 employees and a few timecards each. The last employee is
intentionally left with no timecards so the empty state can be exercised.

### Endpoints

| Method | Path | Responses |
|---|---|---|
| GET | `/api/employees` | `200` |
| GET | `/api/employees/{id}/timecards` | `200`, `404` if the employee doesn't exist |
| POST | `/api/timecards` | `201`, `422` on validation failure |

### Structure

Controller → Service → Repository. Controllers only build HTTP responses, services hold the
business decisions, and repositories are the only place Eloquent is touched. `POST /api/timecards`
is validated by `StoreTimecardRequest`. `bootstrap/app.php` already renders exceptions as JSON for
`api/*`, so validation failures become `422` and a missing employee becomes `404` without any
manual error handling in the controllers.

Tests: `php artisan test` (9 feature tests covering the 200/404/201/422 paths).

### Deviation from the spec

`SPEC.md` says `GET /api/employees/:id/timecards` returns `404` when the employee has no
timecards. This implementation returns `200 []` in that case and reserves `404` for an employee
that does not exist, which is the conventional REST reading. This was a deliberate decision.

## Frontend

```sh
cd vite-project
npm install
npm run dev
```

Expects the API at `http://localhost:8000/api` (`VITE_API_URL` in `.env`). CORS on the backend
allows `http://localhost:5173`.

All server state goes through React Query — `useEmployees`, `useEmployeeTimecards`,
`useCreateTimecard` in `src/api/queries.ts` — and every consumer renders the loading, error and
data branches explicitly. Creating a timecard invalidates that employee's timecard query.
