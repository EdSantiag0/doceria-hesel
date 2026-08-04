import { useEffect, useState } from "react";
import type { Client } from "../../types/Client";
import { FormInput } from "../FormInput";

interface EditClientDialogProps {
  isOpen: boolean;
  client: Client | null;

  onCancel: () => void;
  onSave: (client: Client) => void;
}

export function EditClientDialog({
  isOpen,
  client,
  onCancel,
  onSave,
}: EditClientDialogProps) {
  const [form, setForm] = useState<Client | null>(client);

  useEffect(() => {
    setForm(client);
  }, [client]);

  if (!isOpen || !form) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl border border-[#f1dfbd] bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-brand-900">
          Editar Cliente
        </h2>

        <div className="space-y-4">
          <FormInput
            label="Nome"
            name="name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <FormInput
            label="Endereço"
            name="address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          <FormInput
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#e6bf74] px-4 py-2 text-[#642708] transition hover:bg-[#fff3dc]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => onSave(form)}
            className="rounded-xl bg-[#792d08] px-4 py-2 font-semibold text-white transition hover:bg-[#642305]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
