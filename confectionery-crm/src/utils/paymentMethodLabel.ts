import type { PaymentMethod } from "../types/Order";

const labels: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  pix: "PIX",
  credit_card: "Cartão de Crédito",
  debit_card: "Cartão de Débito",
  bank_transfer: "Transferência Bancária",
  other: "Outro",
};

export function paymentMethodLabel(method: PaymentMethod) {
  return labels[method];
}
