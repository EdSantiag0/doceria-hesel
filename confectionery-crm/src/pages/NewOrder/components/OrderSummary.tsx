interface OrderSummaryProps {
  orderTotal: number;
}

export function OrderSummary({ orderTotal }: OrderSummaryProps) {
  return (
    <fieldset>
      <legend>Resumo do Pedido</legend>

      <div className="flex items-center justify-between">
        <span>Total do Pedido:</span>

        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(orderTotal)}
        </strong>
      </div>
    </fieldset>
  );
}
