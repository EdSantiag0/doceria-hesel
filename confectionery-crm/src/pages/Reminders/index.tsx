// Pagina inicial para exibir lembretes de pedidos.
import { ReminderCard } from "../../components/ReminderCard";
import { getPendingReminders } from "./utils/getPendingReminders";

export function Reminders() {
  const reminders = getPendingReminders();

  function handleComplete(orderId: string) {
    console.log(orderId);
  }

  return (
    <div className="flex flex-col gap-4">
      {reminders.length === 0 ? (
        <p>Nenhum lembrete disponível.</p>
      ) : (
        reminders.map((reminder) => (
          <ReminderCard
            key={reminder.orderId}
            clientName={reminder.clientName}
            reminderDate={reminder.reminderDate}
            description={reminder.description}
            items={reminder.items}
            onComplete={() => handleComplete(reminder.orderId)}
          />
        ))
      )}
    </div>
  );
}
