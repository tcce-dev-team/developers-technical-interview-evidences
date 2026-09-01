import type { Employee } from '../types'

interface EmployeesTableProps {
  employees: Employee[]
  onShowTimecards: (employee: Employee) => void
}

export function EmployeesTable({ employees, onShowTimecards }: EmployeesTableProps) {
  if (employees.length === 0) {
    return <p className="state">No employees found.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Trade</th>
          <th>Timecards</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.employee_code}</td>
            <td>{employee.name}</td>
            <td>{employee.trade}</td>
            <td>
              <button
                type="button"
                className="icon-button"
                title={`View timecards for ${employee.name}`}
                aria-label={`View timecards for ${employee.name}`}
                onClick={() => onShowTimecards(employee)}
              >
                <TableIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TableIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  )
}
