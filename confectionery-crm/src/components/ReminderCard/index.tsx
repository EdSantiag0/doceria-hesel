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
    <article className="rounded-2xl border border-[#f1dfbd] bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h3 className="m-0 text-lg font-bold text-[#51230c]">{clientName}</h3>
      </header>

      <div className="space-y-3">
        <div>
          <span className="font-semibold text-[#8d493a]">
            Data cadastrada:{" "}
          </span>
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
          className="rounded-xl bg-[#792d08] px-5 py-2.5 font-semibold text-white transition hover:bg-[#642305]"
        >
          Concluir
        </button>
      </div>
    </article>
  );
}
