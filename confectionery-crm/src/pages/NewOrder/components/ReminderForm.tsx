import { FormInput } from "../../../components/FormInput";
import { FormTextarea } from "../../../components/FormTextarea";

interface ReminderFormProps {
  reminderDate: string;
  description: string;
  onReminderDateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  error?: string;
}

export function ReminderForm({
  reminderDate,
  description,
  onReminderDateChange,
  onDescriptionChange,
  error,
}: ReminderFormProps) {
  return (
    <fieldset>
      <legend>Lembrete</legend>

      <FormInput
        name="reminder.reminderDate"
        label="Data"
        type="date"
        value={reminderDate}
        onChange={(e) => onReminderDateChange(e.target.value)}
      />

      <FormTextarea
        name="reminder.description"
        label="Descrição"
        value={description}
        rows={5}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Ex.: Aniversário da Maria. Pedido para festa de aniversário."
      />

      {error && <small className="text-red-600">{error}</small>}
    </fieldset>
  );
}
