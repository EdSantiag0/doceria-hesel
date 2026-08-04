// Pagina inicial para exibir lembretes de pedidos.
import { useState } from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { ReminderCard } from "../../components/ReminderCard";
import { getPendingReminders } from "../../business/reminder/getPendingReminders";
import { completeReminder } from "../../business/reminder/completeReminder";
import { toast } from "react-toastify";

export function Reminders() {
  const [reminders, setReminders] = useState(getPendingReminders());

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleComplete(orderId: string) {
    completeReminder(orderId);

    setReminders(getPendingReminders());

    toast.success("Lembrete concluído com sucesso!");
  }

  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
      <div>
        <h2 className="m-0 text-2xl font-bold text-[#6f2706]">Lembretes</h2>
        <p className="mb-0 mt-1 text-text-muted">Acompanhe os pedidos que precisam de atenção.</p>
      </div>
      {reminders.length === 0 ? (
        <p>Nenhum lembrete disponível.</p>
      ) : (
        reminders.map((reminder) => (
          <div key={reminder.orderId}>
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
