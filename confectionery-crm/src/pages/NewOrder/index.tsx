import type { CreateOrderItemInput } from "../../types/OrderItem";
import type { CreateOrderInput } from "../../types/Order";
import { z } from "zod";
import { useState } from "react";
import { getClients } from "../../services/clientStorage";
import { createOrder } from "../../services/orderStorage";
import { toast } from "react-toastify";
import { orderSchema } from "./schemas/orderSchema";
import { calculateOrderTotal } from "../../business/order/calculateOrderTotal";
import { calculateItemTotal } from "../../business/order/calculateItemTotal";
import { ClientSelect } from "./components/ClientSelect";
import { OrderItemsForm } from "./components/OrderItemsForm";
import { PaymentSelect } from "./components/PaymentSelect";
import { OrderSummary } from "./components/OrderSummary";
import { ReminderForm } from "./components/ReminderForm";

type OrderFormData = z.infer<typeof orderSchema>;
type OrderFormErrors = Partial<Record<keyof OrderFormData, string>>;

const initialFormData: CreateOrderInput = {
  clientId: "",

  items: [],

  paymentMethod: "cash",

  reminder: {
    reminderDate: "",
    description: "",
    isCompleted: false,
  },

  orderTotal: 0,
};

export function NewOrder() {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setErrors] = useState<OrderFormErrors>({});

  const orderTotal = calculateOrderTotal(formData.items);

  const clients = getClients();

  const [currentItem, setCurrentItem] = useState<CreateOrderItemInput>({
    quantity: 1,
    product: "",
    unitValue: 0,
  });
  //-------------------------------------------------------------------------

  function handleAddItem() {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: crypto.randomUUID(),
          ...currentItem,
          total: calculateItemTotal(
            currentItem.quantity,
            currentItem.unitValue,
          ),
        },
      ],
    });

    setCurrentItem({
      quantity: 1,
      product: "",
      unitValue: 0,
    });
  }

  function handleRemoveItem(id: string) {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  }

  function handlePaymentMethodChange(
    paymentMethod: CreateOrderInput["paymentMethod"],
  ) {
    setFormData({
      ...formData,
      paymentMethod,
    });
  }

  function handleReminderDateChange(reminderDate: string) {
    setFormData({
      ...formData,
      reminder: {
        reminderDate,
        description: formData.reminder?.description ?? "",
        isCompleted: formData.reminder?.isCompleted ?? false,
      },
    });
  }

  function handleReminderDescriptionChange(description: string) {
    setFormData({
      ...formData,
      reminder: {
        reminderDate: formData.reminder?.reminderDate ?? "",
        description,
        isCompleted: formData.reminder?.isCompleted ?? false,
      },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const finalData = { ...formData, orderTotal };

    const result = orderSchema.safeParse(finalData);

    if (!result.success) {
      const fildsErrors = result.error.flatten().fieldErrors;

      setErrors({
        clientId: fildsErrors.clientId?.[0],
        items: fildsErrors.items?.[0],
        paymentMethod: fildsErrors.paymentMethod?.[0],
        reminder: fildsErrors.reminder?.[0],
        orderTotal: fildsErrors.orderTotal?.[0],
      });

      return;
    }

    createOrder(finalData);

    setErrors({});

    toast.success("Pedido cadastrado com sucesso!");

    setFormData(initialFormData);

    setCurrentItem({
      quantity: 1,
      product: "",
      unitValue: 0,
    });
  }
  //------------------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
      <div>
        <h2 className="m-0 text-2xl font-bold text-[#6f2706]">Novo Pedido</h2>
        <p className="mb-0 mt-1 text-text-muted">Registre os itens e dados do pedido.</p>
      </div>
      <ClientSelect
        clients={clients}
        value={formData.clientId}
        onChange={(id) =>
          setFormData({
            ...formData,
            clientId: id,
          })
        }
        error={formErrors.clientId}
      />
      <OrderItemsForm
        currentItem={currentItem}
        onChange={setCurrentItem}
        onAddItem={handleAddItem}
        error={formErrors.items}
      />
      <PaymentSelect
        value={formData.paymentMethod}
        onChange={handlePaymentMethodChange}
        error={formErrors.paymentMethod}
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
        error={formErrors.reminder}
      />
      <div className="flex justify-end">
        <button type="submit" className="min-h-12 rounded-xl bg-[#792d08] px-6 font-semibold text-white shadow-sm transition hover:bg-[#642305] active:scale-[0.98]">Cadastrar pedido</button>
      </div>
    </form>
  );
}
