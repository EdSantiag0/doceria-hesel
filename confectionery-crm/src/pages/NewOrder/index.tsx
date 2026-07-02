import { z } from "zod";
import { FormInput } from "../../components/FormInput";
import { useState } from "react";

const orderSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente."),

  quantity: z.number().min(1, "Informe a quantidade."),

  product: z.string().trim().min(1, "Informe o produto.").max(255),

  unitValue: z.number().min(0.01, "Informe um valor válido."),

  total: z.number(),

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
      date: z.string().date({
        message: "Informe uma data válida.",
      }),
      description: z.string().trim().max(255, "Máximo de 255 caracteres."),
    })
    .optional(),

  orderTotal: z.number(),
});

const initialFormData = {
  clientId: "",

  quantity: 1,

  product: "",

  unitValue: 0,

  total: 0,

  paymentMethod: "cash" as const,

  reminder: {
    date: "",
    description: "",
  },

  orderTotal: 0,
};

export function NewOrder() {
  const [formData, setFormData] = useState(initialFormData);
  const result = orderSchema.safeParse(formData);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = orderSchema.safeParse(initialFormData);

    if (!result.success) {
      const fildsErrors = result.error.flatten().fieldErrors;

      return;
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <fieldset>
          <legend>Cliente</legend>
        </fieldset>
        <select name="clientId" id="clientId"></select>
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
          placeholder="Informe a quantidade"
        />
        <FormInput
          name="product"
          label="Produto"
          type="text"
          placeholder="Informe o produto"
        />
        <FormInput
          name="unitValue"
          label="Valor Unitário"
          type="number"
          placeholder="Informe o valor unitário"
          step="0.01"
        />
      </div>
      --------------------------------------------------------------
      <div>
        <fieldset>
          <legend>Pagamento</legend>
          <label htmlFor="paymentMethod">Forma de Pagamento</label>
        </fieldset>
      </div>
      <div>
        <span>Total do Pedido</span>
        <strong>R$ 0,00</strong>
      </div>
      --------------------------------------------------------------
      <div>
        <fieldset>
          <legend>Lembrete</legend>
        </fieldset>
        <FormInput
          name="reminder.date"
          label="Data"
          type="date"
          placeholder="Informe a data do lembrete"
        />
        <FormInput
          name="reminder.description"
          label="Descrição"
          type="text"
          placeholder="Informe a descrição do lembrete"
        />
      </div>
      <div>
        <button type="submit">Cadastrar Pedido</button>
      </div>
    </form>
  );
}
