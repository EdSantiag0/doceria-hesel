// Campo de formulario reutilizavel com rotulo e mensagem de erro.
import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  mask?: (value: string) => string;
}

export function FormInput({
  id,
  label,
  error,
  mask,
  onChange,
  ...props
}: FormInputProps) {
  const inputId = id ?? props.name;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (mask) {
      event.target.value = mask(event.target.value);
    }

    if (onChange) {
      onChange(event);
    }
  }
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      <span className="text-base font-semibold text-[#642708]">{label}</span>
      <input
        id={inputId}
        className="min-h-12 w-full rounded-xl border border-[#f0cf64] bg-[#fffaf0] px-4 text-[#43281c] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#9a877d] focus:border-[#b85a18] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,90,24,0.12)] aria-[invalid=true]:border-[#b42318]"
        aria-invalid={Boolean(error)}
        onChange={handleChange}
        {...props}
      />
      {error ? (
        <small className="text-[13px] text-danger-dark">{error}</small>
      ) : null}
    </label>
  );
}
