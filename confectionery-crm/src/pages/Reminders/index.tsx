// Pagina inicial para exibir lembretes de pedidos.
import { useState } from "react";
import { ReminderCard } from "../../components/ReminderCard";
import { getPendingReminders } from "./utils/getPendingReminders";
import { completeOrderReminder } from "../../services/orderStorage";
import { toast } from "react-toastify";

export function Reminders() {
  const [reminders, setReminders] = useState(getPendingReminders());

  function handleComplete(orderId: string) {
    completeOrderReminder(orderId);

    setReminders(getPendingReminders());

    toast.success("Lembrete concluído com sucesso!");
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
