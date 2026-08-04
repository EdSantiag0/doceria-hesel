import { FormInput } from "../../../components/FormInput";
import type { CreateOrderItemInput } from "../../../types/OrderItem";

interface OrderItemsFormProps {
  currentItem: CreateOrderItemInput;
  onChange: (item: CreateOrderItemInput) => void;
  onAddItem: () => void;
  error?: string;
}

export function OrderItemsForm({ currentItem, onChange, onAddItem, error }: OrderItemsFormProps) {
  return (
    <fieldset className="rounded-2xl border border-[#f1dfbd] bg-white p-6 shadow-sm">
      <legend className="px-1 text-lg font-bold text-[#6f2706]">Itens do Pedido</legend>
      <div className="mt-2 grid gap-4 md:grid-cols-[140px_1fr_180px_auto] md:items-end">
        <FormInput name="quantity" label="Quantidade" type="number" value={currentItem.quantity} onChange={(e) => onChange({ ...currentItem, quantity: Number(e.target.value) })} placeholder="Qtd." />
        <FormInput name="product" label="Produto" type="text" value={currentItem.product} onChange={(e) => onChange({ ...currentItem, product: e.target.value })} placeholder="Informe o produto" />
        <FormInput name="unitValue" label="Valor Unitário" type="number" value={currentItem.unitValue} onChange={(e) => onChange({ ...currentItem, unitValue: Number(e.target.value) })} placeholder="R$ 0,00" />
        <button type="button" onClick={onAddItem} className="min-h-12 rounded-xl border border-[#b85a18] px-4 font-semibold text-[#8a3c12] transition hover:bg-[#fff3dc]">Adicionar</button>
      </div>
      {error && <p className="mb-0 mt-3 text-sm text-danger-dark">{error}</p>}
    </fieldset>
  );
}
