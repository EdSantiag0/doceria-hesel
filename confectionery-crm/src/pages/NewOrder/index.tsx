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
  orderDate: z.string().date({ message: "Data do pedido inválida." }),
  paymentMethod: z.string().max(100, {
    message: "O método de pagamento deve ter no máximo 100 caracteres.",
  }),
  total: z
    .number()
    .min(0, { message: "O total do pedido deve ser maior ou igual a zero." }),
});

type OrderFormData = z.infer<typeof orderSchema>;
type OrderFormErrors = Partial<Record<keyof OrderFormData, string>>;

const initialFormData: OrderFormData = {
  quantity: 0,
  product: "",
  unitValue: 0,
  orderDate: "",
  paymentMethod: "",
  total: 0,
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
        orderDate: fieldErrors.orderDate?.[0],
        paymentMethod: fieldErrors.paymentMethod?.[0],
        total: fieldErrors.total?.[0],
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
      <h2 className="mb-1.5 mt-0 text-2xl text-[#2a211d]">Novo Pedido</h2>
      <p className="m-0 text-[#77675f]">
        O formulário de pedido com produtos, pagamento e total ficará aqui.
      </p>

      <form
        className="grid gap-[18px] rounded-lg border border-[#e7ddd5] bg-[#fffaf6] p-6"
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

        <FormInput
          label="Data do Pedido" //DATA DO PEDIDO
          name="orderDate"
          type="date"
          value={formData.orderDate}
          onChange={(e) =>
            setFormData({ ...formData, orderDate: e.target.value })
          }
          error={errors.orderDate}
        />

        <FormInput
          label="Método de Pagamento" //MÉTODO DE PAGAMENTO
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({ ...formData, paymentMethod: e.target.value })
          }
          error={errors.paymentMethod}
        />

        <FormInput
          label="Total" //TOTAL
          name="total"
          type="number"
          value={formData.total}
          onChange={(e) =>
            setFormData({ ...formData, total: Number(e.target.value) })
          }
          error={errors.total}
        />

        <div className="mt-1 flex justify-end">
          <button
            type="submit"
            className="min-h-11 cursor-pointer rounded-lg border-0 bg-[#8d493a] px-[18px] font-bold text-white transition-colors duration-150 hover:bg-[#7b3f32]"
          >
            Cadastrar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
