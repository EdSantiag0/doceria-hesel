import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '../../components/FormInput'
import { createClient } from '../../services/clientStorage'
import './NewClient.css'

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
    <div className="new-client-page">
      <div className="new-client-page__heading">
        <h2>Novo Cliente</h2>
        <p>Cadastre os dados principais para vincular pedidos depois.</p>
      </div>

      <form className="new-client-form" onSubmit={handleSubmit}>
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

        <div className="new-client-form__actions">
          <button type="submit">Cadastrar Cliente</button>
        </div>
      </form>
    </div>
  )
}
