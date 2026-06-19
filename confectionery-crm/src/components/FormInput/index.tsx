import type { InputHTMLAttributes } from 'react'
import './FormInput.css'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ id, label, error, ...props }: FormInputProps) {
  const inputId = id ?? props.name

  return (
    <label className="form-input" htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} aria-invalid={Boolean(error)} {...props} />
      {error ? <small>{error}</small> : null}
    </label>
  )
}
