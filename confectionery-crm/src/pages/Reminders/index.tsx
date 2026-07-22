// Pagina inicial para exibir lembretes de pedidos.
import { useState } from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { ReminderCard } from "../../components/ReminderCard";
import { getPendingReminders } from "./utils/getPendingReminders";
import { completeOrderReminder } from "../../services/orderStorage";
import { toast } from "react-toastify";

export function Reminders() {
  const [reminders, setReminders] = useState(getPendingReminders());

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          <div>
            <ConfirmDialog
              isOpen={isDialogOpen}
              title="Concluir lembrete"
              message="Tem certeza que deseja concluir este lembrete?"
              confirmText="Concluir"
              variant="primary"
              onCancel={() => {
                setSelectedOrderId(null);
                setIsDialogOpen(false);
              }}
              onConfirm={() => {
                if (!selectedOrderId) return;

                handleComplete(selectedOrderId);

                setSelectedOrderId(null);
                setIsDialogOpen(false);
              }}
            />

            <ReminderCard
              key={reminder.orderId}
              clientName={reminder.clientName}
              reminderDate={reminder.reminderDate}
              description={reminder.description}
              items={reminder.items}
              onComplete={() => {
                setSelectedOrderId(reminder.orderId);
                setIsDialogOpen(true);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}
