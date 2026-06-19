// Pagina para cadastrar novos clientes.
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '../../components/FormInput'
import { createClient } from '../../services/clientStorage'

interface ClientFormData {
  name: string
  address: string
  phone: string
}

const initialFormData: ClientFormData = {
  name: '',
  address: '',
  phone: '',
}

export function NewClient() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Partial<ClientFormData>>({})

  function updateField(field: keyof ClientFormData, value: string) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }

  function validateForm() {
    const nextErrors: Partial<ClientFormData> = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Informe o nome do cliente.'
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Informe o endereço do cliente.'
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Informe o telefone do cliente.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    createClient({
      name: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
    })

    setFormData(initialFormData)
    navigate('/clientes')
  }

  return (
    <div className="w-full max-w-[720px]">
      <div className="mb-6">
        <h2 className="mb-1.5 mt-0 text-2xl text-[#2a211d]">Novo Cliente</h2>
        <p className="m-0 text-[#77675f]">
          Cadastre os dados principais para vincular pedidos depois.
        </p>
      </div>

      <form
        className="grid gap-[18px] rounded-lg border border-[#e7ddd5] bg-[#fffaf6] p-6"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Nome"
          name="name"
          placeholder="Nome do cliente"
          value={formData.name}
          error={errors.name}
          onChange={(event) => updateField('name', event.target.value)}
        />

        <FormInput
          label="Endereço"
          name="address"
          placeholder="Rua, número e bairro"
          value={formData.address}
          error={errors.address}
          onChange={(event) => updateField('address', event.target.value)}
        />

        <FormInput
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          error={errors.phone}
          onChange={(event) => updateField('phone', event.target.value)}
        />

        <div className="mt-1 flex justify-end">
          <button
            type="submit"
            className="min-h-11 cursor-pointer rounded-lg border-0 bg-[#8d493a] px-[18px] font-bold text-white transition-colors duration-150 hover:bg-[#7b3f32]"
          >
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  )
}
