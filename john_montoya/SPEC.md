# Technical specification

This is an specification for a simple project, where the system have to list employees, list and create timecards for each employee

## Stack

### Back end
    - Laravel
    - MySQL
### Front end
    - ReactJS
    - Typescript

## Back end specifications
### Enpoints

`api/employees` Endpoint to list all the employees

Response `200 OK`

---

`api/employees/:id/timecards` Endpoint to list all the employee's timecards

Response `200 OK | 404 Not Found` Not found if employee doesn't have timecards

---

`api/timecards` Endpoint to create a timecard of an employee

Response `201 Created | 422 Unprocesable entity` 422 If not all required data is in the request

---

Request validation

`{
    employee_id: required, exists as an employee,
    date: required, valid date,
    hours: required, valid number,
    cost_code: nullable, string
}`

### Models
Employee: 
`
{
    id,
    name,
    employee_code,
    trade
}
`

Timecards
`
{
    id,
    employee_id,
    date,
    hours,
    cost_code
}`

## Front end specifications

In the initial view

1. A table with all the employees (Request to `api/employees`)
2. The table should have a column that show an icon with a table
3. Once the icon is clicked should open a modal with a table with all the timecards for the employee (Request to `api/employees/:id/timecards`)

In this view also

1. Have a button to create a timecard for an employee
2. This button should open a form with employee (select type field with all the employees), date, hours, cost_code(Post to `api/timecards`)

## Requierements
1. For the back end use controller, repository, service structure. Don't use anything that won't be necessary for a small project.
2. Controller must be in charge of the http responses.
3. Post must be validated with laravel request.
4. Create a seeder with employees and timecards.
5. For front end request use ReactQuery (Handle loading, error and data with it).
6. Don't over engineer, do exactly what is asked.