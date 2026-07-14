import { z } from "zod";
import { FormInput } from "../../components/FormInput";
import { useState } from "react";
import { getClients } from "../../services/clientStorage";
import type { CreateOrderItemInput } from "../../types/OrderItem";
import type { CreateOrderInput } from "../../types/Order";
import { createOrder } from "../../services/orderStorage";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { orderItemSchema, orderSchema } from "./schemas/orderSchema";
import { calculateOrderTotal } from "./utils/calculateOrderTotal";
import { calculateItemTotal } from "./utils/calculateItemTotal";

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
  const [itemsErrors, setItemsErrors] = useState<ItemsError>({});
  const clients = getClients();

  const [currentItem, setCurrentItem] = useState<CreateOrderItemInput>({
    quantity: 1,
    product: "",
    unitValue: 0,
  });

  function handleDeleteItem(itemId: string) {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <fieldset>
          <legend>Cliente</legend>

          <label htmlFor="clientId"></label>

          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={(e) =>
              setFormData({ ...formData, clientId: e.target.value })
            }
          >
            <option value="">Selecione um cliente</option>
            {clients
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
          </select>
          {formErrors.clientId && (
            <small className="text-red-600">{formErrors.clientId}</small>
          )}
          {clients.length === 0 && (
            <small>
              Nenhum cliente cadastrado. Cadastre um cliente antes de criar um
              pedido.
            </small>
          )}
        </fieldset>
      </div>
      --------------------------------------------------------------
      <div>
        <fieldset>
          <legend>Itens do Pedido</legend>
        </fieldset>
        <FormInput
          name="quantity"
          label="Quantidade"
          type="number"
          value={currentItem.quantity}
          error={itemsErrors.quantity}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              quantity: Number(e.target.value),
            })
          }
          placeholder="Informe a quantidade"
        />
        <FormInput
          name="product"
          label="Produto"
          type="text"
          value={currentItem.product}
          error={itemsErrors.product}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              product: e.target.value,
            })
          }
          placeholder="Informe o produto"
        />
        <FormInput
          name="unitValue"
          label="Valor Unitário"
          type="number"
          value={currentItem.unitValue}
          error={itemsErrors.unitValue}
          onChange={(e) =>
            setCurrentItem({
              ...currentItem,
              unitValue: Number(e.target.value),
            })
          }
          placeholder="Informe o valor unitário"
          step="0.01"
        />
        <button
          type="button"
          onClick={() => {
            const result = orderItemSchema.safeParse(currentItem);

            if (!result.success) {
              const fildsErrors = result.error.flatten().fieldErrors;

              setItemsErrors({
                quantity: fildsErrors.quantity?.[0],
                product: fildsErrors.product?.[0],
                unitValue: fildsErrors.unitValue?.[0],
              });

              return;
            }

            setItemsErrors({});

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
          }}
        >
          Adicionar Item
        </button>
        {formErrors.items && (
          <small className="text-red-600">{formErrors.items}</small>
        )}
      </div>
      --------------------------------------------------------------
      <fieldset>
        <legend>Itens do Pedido</legend>

        {formData.items.length === 0 && (
          <small>Nenhum item adicionado ao pedido.</small>
        )}
        <ul>
          {formData.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <span>
                {item.quantity} {item.product} ={" "}
                <strong>R$ {item.total.toFixed(2)}</strong>
              </span>

              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                title="Remover item"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      --------------------------------------------------------------
      <div>
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
      </div>
      --------------------------------------------------------------
      <div>
        <fieldset>
          <legend>Resumo do Pedido</legend>
        </fieldset>
      </div>
      <div>
        <span>Total do Pedido: </span>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(calculateOrderTotal(formData.items))}
        </strong>
      </div>
      --------------------------------------------------------------
      <div>
        <fieldset>
          <legend>Lembrete</legend>
        </fieldset>
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
      </div>
      <div>
        <button type="submit">Cadastrar Pedido</button>
      </div>
    </form>
  );
}
