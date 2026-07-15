import type { CreateOrderItemInput } from "../../types/OrderItem";
import type { CreateOrderInput } from "../../types/Order";
import { z } from "zod";
import { FormInput } from "../../components/FormInput";
import { useState } from "react";
import { getClients } from "../../services/clientStorage";
import { createOrder } from "../../services/orderStorage";
import { toast } from "react-toastify";
import { orderSchema } from "./schemas/orderSchema";
import { calculateOrderTotal } from "./utils/calculateOrderTotal";
import { calculateItemTotal } from "./utils/calculateItemTotal";
import { ClientSelect } from "./components/ClientSelect";
import { OrderItemsForm } from "./components/OrderItemsForm";
import { OrderItemsList } from "./components/OrderItemsList";
import { OrderSummary } from "./components/OrderSummary";

type OrderFormData = z.infer<typeof orderSchema>;
type OrderFormErrors = Partial<Record<keyof OrderFormData, string>>;

type ItemsError = {
  quantity?: string;
  product?: string;
  unitValue?: string;
};

const initialFormData: CreateOrderInput = {
  clientId: "",

  items: [],

  paymentMethod: "cash",

  reminder: {
    reminderDate: "",
    description: "",
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const total = calculateOrderTotal(formData.items);

    const finalData = { ...formData, orderTotal: total };

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
    <form onSubmit={handleSubmit}>
      <fieldset>
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
      </fieldset>
      -------------------------------------------------------------------------
      <fieldset>
        <OrderItemsForm
          currentItem={currentItem}
          onChange={setCurrentItem}
          onAddItem={handleAddItem}
          error={formErrors.items}
        />
      </fieldset>
      --------------------------------------------------------------
      <fieldset>
        <OrderItemsList
          items={formData.items}
          onRemoveItem={handleRemoveItem}
        />
      </fieldset>
      --------------------------------------------------------------
      <fieldset>
        <legend>Pagamento</legend>
        <select
          id="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({
              ...formData,
              paymentMethod: e.target
                .value as CreateOrderInput["paymentMethod"],
            })
          }
        >
          <option value="cash">Dinheiro</option>
          <option value="credit_card">Cartão de Crédito</option>
          <option value="debit_card">Cartão de Débito</option>
          <option value="pix">PIX</option>
          <option value="bank_transfer">Transferência Bancária</option>
          <option value="other">Outro</option>
        </select>
        {formErrors.paymentMethod && (
          <small className="text-red-600">{formErrors.paymentMethod}</small>
        )}
      </fieldset>
      --------------------------------------------------------------
      <fieldset>
        <OrderSummary orderTotal={orderTotal} />
      </fieldset>
      --------------------------------------------------------------
      <fieldset>
        <legend>Lembrete</legend>

        <FormInput
          name="reminder.reminderDate"
          label="Data"
          type="date"
          value={formData.reminder?.reminderDate ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              reminder: {
                reminderDate: e.target.value,
                description: formData.reminder?.description ?? "",
              },
            })
          }
          placeholder="Informe a data do lembrete"
        />
        <FormInput
          name="reminder.description"
          label="Descrição"
          type="text"
          value={formData.reminder?.description ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              reminder: {
                reminderDate: formData.reminder?.reminderDate ?? "",
                description: e.target.value,
              },
            })
          }
          placeholder="Informe a descrição do lembrete"
        />
      </fieldset>
      <div>
        <button type="submit">Cadastrar Pedido</button>
      </div>
    </form>
  );
}
