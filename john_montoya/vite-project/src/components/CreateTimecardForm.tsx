import { useState } from 'react'

import { useCreateTimecard, useEmployees } from '../api/queries'
import { ApiError } from '../api/client'
import type { NewTimecard } from '../types'
import { Modal } from './Modal'

const EMPTY_FORM: NewTimecard = {
  employee_id: '',
  date: '',
  hours: '',
  cost_code: '',
}

interface CreateTimecardFormProps {
  onClose: () => void
}

export function CreateTimecardForm({ onClose }: CreateTimecardFormProps) {
  const [form, setForm] = useState<NewTimecard>(EMPTY_FORM)
  const [created, setCreated] = useState(false)

  const employees = useEmployees()
  const createTimecard = useCreateTimecard()

  const fieldErrors = createTimecard.error instanceof ApiError ? createTimecard.error.errors : {}

  function update<K extends keyof NewTimecard>(key: K, value: NewTimecard[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setCreated(false)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    createTimecard.mutate(
      {
        employee_id: Number(form.employee_id),
        date: form.date,
        hours: Number(form.hours),
        cost_code: form.cost_code.trim() === '' ? null : form.cost_code.trim(),
      },
      {
        onSuccess: () => {
          setForm(EMPTY_FORM)
          setCreated(true)
        },
      },
    )
  }

  return (
    <Modal title="Create timecard" onClose={onClose}>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label>
          Employee
          <select
            value={form.employee_id}
            onChange={(event) =>
              update('employee_id', event.target.value === '' ? '' : Number(event.target.value))
            }
          >
            <option value="">
              {employees.isPending ? 'Loading employees…' : 'Select an employee'}
            </option>
            {employees.data?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.employee_code} — {employee.name}
              </option>
            ))}
          </select>
        </label>
        {employees.isError && <p className="state state-error">{employees.error.message}</p>}
        <FieldError messages={fieldErrors.employee_id} />

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(event) => update('date', event.target.value)}
          />
        </label>
        <FieldError messages={fieldErrors.date} />

        <label>
          Hours
          <input
            type="number"
            step="0.25"
            min="0"
            value={form.hours}
            onChange={(event) => update('hours', event.target.value)}
          />
        </label>
        <FieldError messages={fieldErrors.hours} />

        <label>
          Cost code <span className="muted">(optional)</span>
          <input
            type="text"
            value={form.cost_code}
            onChange={(event) => update('cost_code', event.target.value)}
          />
        </label>
        <FieldError messages={fieldErrors.cost_code} />

        {createTimecard.isError && Object.keys(fieldErrors).length === 0 && (
          <p className="state state-error">{createTimecard.error.message}</p>
        )}

        {created && <p className="state state-success">Timecard created.</p>}

        <button type="submit" className="button" disabled={createTimecard.isPending}>
          {createTimecard.isPending ? 'Saving…' : 'Create timecard'}
        </button>
      </form>
    </Modal>
  )
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) {
    return null
  }

  return <p className="field-error">{messages[0]}</p>
}
