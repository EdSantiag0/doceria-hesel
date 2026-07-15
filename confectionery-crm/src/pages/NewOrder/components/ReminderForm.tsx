import { FormInput } from "../../../components/FormInput";

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

      <FormInput
        name="reminder.description"
        label="Descrição"
        type="text"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Informe a descrição do lembrete"
      />

      {error && <small className="text-red-600">{error}</small>}
    </fieldset>
  );
}
