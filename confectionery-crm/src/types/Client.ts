export interface Client {
  id: string
  name: string
  address: string
  phone: string
  createdAt: string
  updatedAt?: string
}

export type CreateClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
