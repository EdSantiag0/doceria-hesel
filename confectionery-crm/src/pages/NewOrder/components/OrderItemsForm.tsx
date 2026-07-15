import { FormInput } from "../../../components/FormInput";
import type { CreateOrderItemInput } from "../../../types/OrderItem";

interface OrderItemsFormProps {
  currentItem: CreateOrderItemInput;
  onChange: (item: CreateOrderItemInput) => void;
  onAddItem: () => void;
  error?: string;
}

export function OrderItemsForm({
  currentItem,
  onChange,
  onAddItem,
  error,
}: OrderItemsFormProps) {
  return (
    <fieldset>
      <legend>Itens do Pedido</legend>

      <FormInput
        name="quantity"
        label="Quantidade"
        type="number"
        value={currentItem.quantity}
        onChange={(e) =>
          onChange({
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
          onChange({
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
          onChange({
            ...currentItem,
            unitValue: Number(e.target.value),
          })
        }
        placeholder="Informe o valor unitário"
      />

      <button type="button" onClick={onAddItem}>
        Adicionar Item
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </fieldset>
  );
}
