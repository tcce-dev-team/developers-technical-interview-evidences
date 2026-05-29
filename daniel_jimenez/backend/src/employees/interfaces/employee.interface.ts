// src/employees/interfaces/employee.interface.ts
export interface Employee {
  id: number;
  name: string;
  employee_code: string;
  trade: string;
}

// src/timecards/interfaces/timecard.interface.ts
export interface Timecard {
  id: number;
  employee_id: number;
  date: string; // Formato YYYY-MM-DD
  hours: number;
  cost_code: string;
}