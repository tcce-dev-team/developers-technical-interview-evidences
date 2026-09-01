import { useState } from 'react'

import { useEmployees } from './api/queries'
import { CreateTimecardForm } from './components/CreateTimecardForm'
import { EmployeesTable } from './components/EmployeesTable'
import { TimecardsModal } from './components/TimecardsModal'
import type { Employee } from './types'
import './App.css'

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const { data, isPending, isError, error } = useEmployees()

  return (
    <main className="page">
      <header className="page-header">
        <h1>Employees</h1>
        <button type="button" className="button" onClick={() => setIsCreating(true)}>
          Create timecard
        </button>
      </header>

      {isPending && <p className="state">Loading employees…</p>}

      {isError && <p className="state state-error">{error.message}</p>}

      {data && <EmployeesTable employees={data} onShowTimecards={setSelectedEmployee} />}

      {selectedEmployee && (
        <TimecardsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {isCreating && <CreateTimecardForm onClose={() => setIsCreating(false)} />}
    </main>
  )
}
