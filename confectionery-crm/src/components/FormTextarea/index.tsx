interface FormTextareaProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({
  name,
  label,
  value,
  placeholder,
  rows,
  error,
  onChange,
}: FormTextareaProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={name}>
      <span className="text-base font-semibold text-[#642708]">{label}</span>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full resize-y rounded-xl border border-[#f0cf64] bg-[#fffaf0] px-4 py-3 text-[#43281c] outline-none placeholder:text-[#9a877d] focus:border-[#b85a18] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,90,24,0.12)]"
      />
      {error && <small className="text-[13px] text-danger-dark">{error}</small>}
    </label>
  );
}
