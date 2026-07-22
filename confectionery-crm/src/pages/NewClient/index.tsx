// Pagina para cadastrar novos clientes.
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { FormInput } from "../../components/FormInput";
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
    <div className="w-full max-w-[720px]">
      <div className="mb-6">
        <h2 className="mb-1.5 mt-0 text-2xl text-brand-900 font-bold">
          Novo Cliente
        </h2>
        <p className="text-text-muted">
          Cadastre os dados principais para vincular pedidos depois.
        </p>
      </div>

      <form
        className="grid gap-[18px] rounded-lg border border-[--color-brand-border] bg-[--color-brand-50] p-6"
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

        <div className="mt-1 flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center min-h-12 px-6 rounded-lg 
             bg-brand-500 text-white font-semibold shadow-sm 
             transition-all hover:bg-brand-500/90 active:scale-[0.98]"
          >
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
