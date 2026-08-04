// Pagina para cadastrar novos clientes.
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { FormInput } from "../../components/FormInput";
import { UserRoundPlus } from "lucide-react";
import { createClient } from "../../services/clientStorage";
import { toast } from "react-toastify";

const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe o nome do cliente.")
    .max(100, "O nome deve ter no maximo 100 caracteres."),
  address: z
    .string()
    .trim()
    .min(2, "Informe o endereco do cliente.")
    .max(200, "O endereco deve ter no maximo 200 caracteres."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone valido.")
    .max(15, "O telefone deve ter no maximo 15 caracteres.")
    .regex(
      /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/,
      "Informe um telefone valido.",
    ),
});

type ClientFormData = z.infer<typeof clientSchema>;
type ClientFormErrors = Partial<Record<keyof ClientFormData, string>>;

const initialFormData: ClientFormData = {
  name: "",
  address: "",
  phone: "",
};

export function NewClient() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<ClientFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = clientSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        address: fieldErrors.address?.[0],
        phone: fieldErrors.phone?.[0],
      });

      return;
    }

    createClient(result.data);
    toast.success(`Cliente ${result.data.name} cadastrado com sucesso!`);
    setFormData(initialFormData);
    setErrors({});
  }

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="mb-6">
        <h2 className="mb-1.5 mt-0 text-2xl font-bold text-[#6f2706]">
          Novo Cliente
        </h2>
        <p className="m-0 text-text-muted">
          Cadastre os dados principais para vincular pedidos depois.
        </p>
      </div>

      <form
        className="grid gap-5 rounded-[22px] border border-[#f1dfbd] bg-white p-7 shadow-[var(--shadow-card)] md:grid-cols-2 md:p-8"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Nome"
          name="name"
          placeholder="Nome do cliente"
          value={formData.name}
          error={errors.name}
          onChange={(event) =>
            setFormData((currentFormData) => ({
              ...currentFormData,
              name: event.target.value,
            }))
          }
        />

        <FormInput
          label="Endereco"
          name="address"
          placeholder="Rua, numero e bairro"
          value={formData.address}
          error={errors.address}
          onChange={(event) =>
            setFormData((currentFormData) => ({
              ...currentFormData,
              address: event.target.value,
            }))
          }
        />

        <FormInput
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          error={errors.phone}
          onChange={(event) =>
            setFormData((currentFormData) => ({
              ...currentFormData,
              phone: event.target.value,
            }))
          }
        />

        <div className="mt-1 flex justify-end md:col-span-2">
          <button
            type="submit"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#792d08] px-6 font-semibold text-white shadow-sm transition-all hover:bg-[#642305] active:scale-[0.98]"
          >
            <UserRoundPlus size={18} />
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
