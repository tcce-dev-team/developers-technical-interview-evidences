export interface Employee {
  id: number
  name: string
  employee_code: string
  trade: string
}

export interface Timecard {
  id: number
  employee_id: number
  date: string
  hours: string
  cost_code: string | null
}

export interface NewTimecard {
  employee_id: number | ''
  date: string
  hours: string
  cost_code: string
}
