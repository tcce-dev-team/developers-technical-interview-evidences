import { useEmployeeTimecards } from '../api/queries'
import type { Employee } from '../types'
import { Modal } from './Modal'

interface TimecardsModalProps {
  employee: Employee
  onClose: () => void
}

export function TimecardsModal({ employee, onClose }: TimecardsModalProps) {
  const { data, isPending, isError, error } = useEmployeeTimecards(employee.id)

  return (
    <Modal title={`Timecards — ${employee.name}`} onClose={onClose}>
      {isPending && <p className="state">Loading timecards…</p>}

      {isError && <p className="state state-error">{error.message}</p>}

      {data &&
        (data.length === 0 ? (
          <p className="state">This employee has no timecards yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Cost code</th>
              </tr>
            </thead>
            <tbody>
              {data.map((timecard) => (
                <tr key={timecard.id}>
                  <td>{timecard.date}</td>
                  <td>{timecard.hours}</td>
                  <td>{timecard.cost_code ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </Modal>
  )
}
