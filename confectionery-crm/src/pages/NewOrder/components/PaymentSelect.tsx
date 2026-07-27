import type { PaymentMethod } from "../../../types/Order";

interface PaymentSelectProps {
  value: PaymentMethod;
  onChange: (paymentMethod: PaymentMethod) => void;
  error?: string;
}

export function PaymentSelect({ value, onChange, error }: PaymentSelectProps) {
  return (
    <fieldset>
      <legend>Pagamento</legend>

      <label htmlFor="paymentMethod">Forma de Pagamento: </label>

      <select
        id="paymentMethod"
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
      >
        <option value="cash">Dinheiro</option>
        <option value="credit_card">Cartão de Crédito</option>
        <option value="debit_card">Cartão de Débito</option>
        <option value="pix">PIX</option>
        <option value="bank_transfer">Transferência Bancária</option>
        <option value="other">Outro</option>
      </select>

      {error && <small className="text-red-600">{error}</small>}
    </fieldset>
  );
}
