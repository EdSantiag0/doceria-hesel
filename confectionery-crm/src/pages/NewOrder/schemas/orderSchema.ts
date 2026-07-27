import { z } from "zod";

const orderItemSchema = z.object({
  quantity: z.number().min(1, "A quantidade deve ser maior que zero."),

  product: z
    .string()
    .trim()
    .min(1, "Informe o produto.")
    .max(255, "Máximo de 255 caracteres."),

  unitValue: z.number().min(0.01, "O valor unitário deve ser maior que zero."),
});

const orderSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente."),

  items: z
    .array(
      orderItemSchema.extend({
        id: z.string(),
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

export { orderItemSchema, orderSchema };
