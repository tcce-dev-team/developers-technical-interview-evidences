import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { request } from './client'
import type { Employee, Timecard } from '../types'

export const employeesKey = ['employees'] as const
export const timecardsKey = (employeeId: number) =>
  ['employees', employeeId, 'timecards'] as const

export function useEmployees() {
  return useQuery({
    queryKey: employeesKey,
    queryFn: () => request<Employee[]>('/employees'),
  })
}

export function useEmployeeTimecards(employeeId: number | null) {
  return useQuery({
    queryKey: timecardsKey(employeeId ?? 0),
    queryFn: () => request<Timecard[]>(`/employees/${employeeId}/timecards`),
    enabled: employeeId !== null,
  })
}

export interface CreateTimecardPayload {
  employee_id: number
  date: string
  hours: number
  cost_code: string | null
}

export function useCreateTimecard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTimecardPayload) =>
      request<Timecard>('/timecards', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (timecard) => {
      queryClient.invalidateQueries({ queryKey: timecardsKey(timecard.employee_id) })
    },
  })
}
