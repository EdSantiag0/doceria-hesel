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
    <label className="flex flex-col gap-2" htmlFor={name}>
      <span className="text-sm font-bold text-[#3b312c]">{label}</span>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <small>{error}</small>}
    </label>
  );
}
