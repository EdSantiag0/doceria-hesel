// Pagina para cadastrar novos pedidos.
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { FormInput } from "../../components/FormInput";

const orderSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantidade deve ser maior ou igual a zero." }),
  product: z.string().max(255, {
    message: "O nome do produto deve ter no máximo 255 caracteres.",
  }),
  unitValue: z
    .number()
    .min(0, { message: "O valor unitário deve ser maior ou igual a zero." }),
  paymentMethod: z.string().max(100, {
    message: "O método de pagamento deve ter no máximo 100 caracteres.",
  }),
  total: z
    .number()
    .min(0, { message: "O total do pedido deve ser maior ou igual a zero." }),
  reminderDate: z.string().optional(),
  reminder: z
    .object({
      reminderDate: z.string().date({
        message: "Data do lembrete inválida.",
      }),
      description: z.string().max(255, {
        message: "A descrição deve ter no máximo 255 caracteres.",
      }),
    })
    .optional(),
  orderTotal: z
    .number()
    .min(0, { message: "O total do pedido deve ser maior ou igual a zero." }),
});

type OrderFormData = z.infer<typeof orderSchema>;
type OrderFormErrors = Partial<Record<keyof OrderFormData, string>>;

const initialFormData: OrderFormData = {
  quantity: 0,
  product: "",
  unitValue: 0,
  total: 0,
  reminderDate: "",
  reminder: undefined,
  paymentMethod: "",
  orderTotal: 0,
};

export function NewOrder() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<OrderFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = orderSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        quantity: fieldErrors.quantity?.[0],
        product: fieldErrors.product?.[0],
        unitValue: fieldErrors.unitValue?.[0],
        total: fieldErrors.total?.[0],
        reminderDate: fieldErrors.reminderDate?.[0],
        paymentMethod: fieldErrors.paymentMethod?.[0],
        reminder: fieldErrors.reminder?.[0],
        orderTotal: fieldErrors.orderTotal?.[0],
      });

      return;
    }

    // createOrder(result.data); // Crie um arquivo em services/orderStorage.ts para implementar essa função.

    toast.success("Pedido cadastrado com sucesso!");
    setFormData(initialFormData);
    setErrors({});
  }

  return (
    <div className="w-full max-w-[720px]">
      <h2 className="mb-1.5 mt-0 text-2xl text-brand-900 font-bold">
        Novo Pedido
      </h2>
      <p className="m-0 text-text-muted">
        O formulário de pedido com produtos, pagamento e total ficará aqui.
      </p>

      <form
        className="grid gap-[18px] rounded-lg border border-[--color-brand-border] bg-[--color-brand-50] p-6"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Quantidade" //QUANTIDADE
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: Number(e.target.value) })
          }
          error={errors.quantity}
        />

        <FormInput
          label="Produto" //PRODUTO
          name="product"
          value={formData.product}
          onChange={(e) =>
            setFormData({ ...formData, product: e.target.value })
          }
          error={errors.product}
        />

        <FormInput
          label="Valor Unitário" //VALOR UNITÁRIO
          name="unitValue"
          type="number"
          value={formData.unitValue}
          onChange={(e) =>
            setFormData({ ...formData, unitValue: Number(e.target.value) })
          }
          error={errors.unitValue}
        />

        <div className="rounded-lg border bg-stone-100 p-3">
          <span>Total</span>

          <strong>R$ 0,00</strong>
        </div>

        <div className="mt-1 flex justify-end">
          <button
            type="button"
            className="flex items-center justify-center min-h-12 px-6 rounded-lg 
             bg-brand-500 text-white font-semibold shadow-sm 
             transition-all hover:bg-brand-500/90 active:scale-[0.98]"
          >
            Adicionar Item
          </button>
        </div>

        <FormInput
          label="Data do Lembrete" //DATA DO LEMBRETE
          name="reminderDate"
          type="date"
          value={formData.reminderDate}
          onChange={(e) =>
            setFormData({ ...formData, reminderDate: e.target.value })
          }
          error={errors.reminderDate}
        />

        <FormInput label="Lembrete" />

        <select
          name="paymentMethod" // MÉTODO DE PAGAMENTO
          id="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({ ...formData, paymentMethod: e.target.value })
          }
        >
          <option value="">Selecione o método de pagamento</option>
          <option value="cash">Dinheiro</option>
          <option value="debit_card">Cartão Débito</option>
          <option value="credit_card">Cartão de Crédito</option>
          <option value="bank_transfer">Transferência Bancária</option>
          <option value="pix">Pix</option>
          <option value="other">Outro</option>
        </select>

        <div className="rounded-lg border bg-stone-100 p-3">
          <span>Total do Pedido</span>

          <strong>R$ 0,00</strong>
        </div>

        <div className="mt-1 flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center min-h-12 px-6 rounded-lg 
             bg-brand-500 text-white font-semibold shadow-sm 
             transition-all hover:bg-brand-500/90 active:scale-[0.98]"
          >
            Cadastrar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
