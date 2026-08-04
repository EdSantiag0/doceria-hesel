import { FormInput } from "../../../components/FormInput";
import { FormTextarea } from "../../../components/FormTextarea";
interface ReminderFormProps { reminderDate: string; description: string; onReminderDateChange: (value: string) => void; onDescriptionChange: (value: string) => void; error?: string; }
export function ReminderForm({ reminderDate, description, onReminderDateChange, onDescriptionChange, error }: ReminderFormProps) {
  return <fieldset className="rounded-2xl border border-[#f1dfbd] bg-white p-6 shadow-sm"><legend className="px-1 text-lg font-bold text-[#6f2706]">Lembrete</legend><div className="mt-2 grid gap-4 md:grid-cols-[220px_1fr]"><FormInput name="reminder.reminderDate" label="Data" type="date" value={reminderDate} onChange={(e) => onReminderDateChange(e.target.value)} /><FormTextarea name="reminder.description" label="Descrição" value={description} rows={3} onChange={(e) => onDescriptionChange(e.target.value)} placeholder="Ex.: Aniversário da Maria. Pedido para festa de aniversário." /></div>{error && <small className="mt-2 block text-[13px] text-danger-dark">{error}</small>}</fieldset>;
}
