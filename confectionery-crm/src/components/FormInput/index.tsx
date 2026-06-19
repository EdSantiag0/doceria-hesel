// Campo de formulario reutilizavel com rotulo e mensagem de erro.
import type { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ id, label, error, ...props }: FormInputProps) {
  const inputId = id ?? props.name

  return (
    <label className="flex flex-col gap-2" htmlFor={inputId}>
      <span className="text-sm font-bold text-[#3b312c]">{label}</span>
      <input
        id={inputId}
        className="min-h-11 w-full rounded-lg border border-[#decfc4] bg-white px-3 text-[#2f2926] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#8d493a] focus:shadow-[0_0_0_3px_rgba(141,73,58,0.14)] aria-[invalid=true]:border-[#b42318]"
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? (
        <small className="text-[13px] text-[#b42318]">{error}</small>
      ) : null}
    </label>
  )
}
