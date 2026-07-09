import { z } from "zod";
import { FormInput } from "../../components/FormInput";
import { useState } from "react";
import { getClients } from "../../services/clientStorage";
import type { CreateOrderItemInput } from "../../types/OrderItem";
import type { CreateOrderInput } from "../../types/Order";
import { createOrder } from "../../services/orderStorage";
import { toast } from "react-toastify";

const orderSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente."),

  items: z
    .array(
      z.object({
        id: z.string(),

        quantity: z.number().min(1, "A quantidade deve ser maior que zero."),

        product: z
          .string()
          .trim()
          .min(1, "Informe o produto.")
          .max(255, "Máximo de 255 caracteres."),

        unitValue: z
          .number()
          .min(0.01, "O valor unitário deve ser maior que zero."),

        total: z.number(),
      }),
    )
    .min(1, "Adicione pelo menos um item ao pedido."),

  paymentMethod: z.enum([
    "cash",
    "credit_card",
    "debit_card",
    "pix",
    "bank_transfer",
    "other",
  ]),

  reminder: z
    .object({
      reminderDate: z.string().date({
        message: "Informe uma data válida.",
      }),
      description: z.string().trim().max(255, "Máximo de 255 caracteres."),
    })
    .optional(),

  orderTotal: z.number(),
});

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
  const clients = getClients();

  const [currentItem, setCurrentItem] = useState<CreateOrderItemInput>({
    quantity: 1,
    product: "",
    unitValue: 0,
  });

  const calculateOrderTotal = () => {
    return formData.items.reduce((acc, item) => acc + item.total, 0);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const total = calculateOrderTotal();

    const finalData = { ...formData, orderTotal: total };

    const result = orderSchema.safeParse(finalData);

    if (!result.success) {
      const fildsErrors = result.error.flatten().fieldErrors;

      return;
    }

    createOrder(finalData);

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
            setFormData({
              ...formData,
              items: [
                ...formData.items,
                {
                  id: crypto.randomUUID(),
                  ...currentItem,
                  total: currentItem.quantity * currentItem.unitValue,
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
      </div>
      --------------------------------------------------------------
      <fieldset>
        <legend>Itens do Pedido</legend>

        {formData.items.length === 0 && (
          <small>Nenhum item adicionado ao pedido.</small>
        )}
        <ul>
          {formData.items.map((item) => (
            <li key={item.id}>
              {item.quantity} {item.product} ={" "}
              <strong>R$ {item.total.toFixed(2)}</strong>
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
        </fieldset>
      </div>
      <div>
        <span>Total do Pedido: </span>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(calculateOrderTotal())}
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
