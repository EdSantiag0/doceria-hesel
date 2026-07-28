import { useEffect, useState } from "react";

import type { Order } from "../../types/Order";
import type { CreateOrderItemInput } from "../../types/OrderItem";

import { getClients } from "../../services/clientStorage";

import { calculateOrderTotal } from "../../business/order/calculateOrderTotal";
import { calculateItemTotal } from "../../business/order/calculateItemTotal";

import { OrderItemsForm } from "../../pages/NewOrder/components/OrderItemsForm";
import { PaymentSelect } from "../../pages/NewOrder/components/PaymentSelect";
import { OrderSummary } from "../../pages/NewOrder/components/OrderSummary";
import { ReminderForm } from "../../pages/NewOrder/components/ReminderForm";

interface EditOrderDialogProps {
  isOpen: boolean;
  order: Order | null;
  onCancel: () => void;
  onSave: (order: Order) => void;
}

export function EditOrderDialog({
  isOpen,
  order,
  onCancel,
  onSave,
}: EditOrderDialogProps) {
  const clients = getClients();

  const [formData, setFormData] = useState<Order | null>(null);

  const [currentItem, setCurrentItem] = useState<CreateOrderItemInput>({
    quantity: 1,
    product: "",
    unitValue: 0,
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const orderTotal = formData ? calculateOrderTotal(formData.items) : 0;

  if (!isOpen || !formData) {
    return null;
  }

  function handleAddItem() {
    setFormData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        items: [
          ...prev.items,
          {
            id: crypto.randomUUID(),
            ...currentItem,
            total: calculateItemTotal(
              currentItem.quantity,
              currentItem.unitValue,
            ),
          },
        ],
      };
    });

    setCurrentItem({
      quantity: 1,
      product: "",
      unitValue: 0,
    });
  }

  function handleRemoveItem(id: string) {
    setFormData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  }

  function handlePaymentMethodChange(paymentMethod: Order["paymentMethod"]) {
    setFormData((prev) => (prev ? { ...prev, paymentMethod } : null));
  }

  function handleReminderDateChange(reminderDate: string) {
    setFormData((prev) => {
      if (!prev || !prev.reminder) return prev;

      return {
        ...prev,
        reminder: {
          ...prev.reminder,
          reminderDate,
        },
      };
    });
  }

  function handleReminderDescriptionChange(description: string) {
    setFormData((prev) => {
      if (!prev || !prev.reminder) return prev;

      return {
        ...prev,
        reminder: {
          ...prev.reminder,
          description,
        },
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData) return;

    onSave({
      ...formData,
      orderTotal,
    });
  }
  if (
    currentItem.product.trim() === "" ||
    currentItem.quantity <= 0 ||
    currentItem.unitValue <= 0
  ) {
    return (
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-6">
          <h2 className="mb-6 text-2xl font-bold">Editar Pedido</h2>

          <div className="mb-5">
            <label className="font-semibold">Cliente</label>

            <input
              value={
                clients.find((client) => client.id === formData.clientId)
                  ?.name ?? ""
              }
              disabled
              className="w-full rounded-lg bg-gray-100 p-2"
            />
          </div>

          <OrderItemsForm
            currentItem={currentItem}
            onChange={setCurrentItem}
            onAddItem={handleAddItem}
          />

          <PaymentSelect
            value={formData.paymentMethod}
            onChange={handlePaymentMethodChange}
          />

          <OrderSummary
            items={formData.items}
            onRemoveItem={handleRemoveItem}
            orderTotal={orderTotal}
          />

          <ReminderForm
            reminderDate={formData.reminder?.reminderDate ?? ""}
            description={formData.reminder?.description ?? ""}
            onReminderDateChange={handleReminderDateChange}
            onDescriptionChange={handleReminderDescriptionChange}
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border px-4 py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2  bg-green-600 text-white  hover:bg-green-800"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </form>
    );
  }
}
