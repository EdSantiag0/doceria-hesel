import type { OrderItem } from "../../types/OrderItem";
interface ReminderCardProps {
  clientName: string;
  reminderDate: string;
  description: string;
  items: OrderItem[];
  onComplete: () => void;
}

export function ReminderCard({
  clientName,
  reminderDate,
  description,
  items,
  onComplete,
}: ReminderCardProps) {
  return (
    <article className="rounded-lg border border-[#e7ddd5] bg-[#fffaf6] p-4">
      <header className="mb-4">
        <h3 className="text-lg font-bold text-[#2a211d]">{clientName}</h3>
      </header>

      <div className="space-y-3">
        <div>
          <span className="font-semibold text-[#8d493a]">Data cadastrada:</span>
          {reminderDate.split("-").reverse().join("/")}
        </div>

        <div>
          <span className="font-semibold text-[#8d493a]">Lembrete:</span>

          <p className="whitespace-pre-wrap">{description}</p>
        </div>

        <span className="font-semibold text-[#8d493a]">Pedido:</span>

        <ul className="mt-2 list-disc pl-5">
          {items.map((item) => (
            <li key={item.id}>
              {item.quantity}x {item.product}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="rounded bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
        >
          Concluir
        </button>
      </div>
    </article>
  );
}
