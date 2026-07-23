import type { Client, CreateClientInput } from "../types/Client";

const CLIENTS_STORAGE_KEY = "doceria-hesel:clients";

function readClients(): Client[] {
  const storedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);

  if (!storedClients) {
    return [];
  }

  try {
    return JSON.parse(storedClients) as Client[];
  } catch {
    return [];
  }
}

function saveClients(clients: Client[]) {
  localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
}

export function getClients() {
  return readClients();
}

export function createClient(input: CreateClientInput) {
  const now = new Date().toISOString();
  const client: Client = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
  };

  const clients = readClients();
  saveClients([client, ...clients]);

  return client;
}

export function deleteClient(id: string) {
  const clients = readClients();

  const updatedClients = clients.filter((client) => client.id !== id);

  saveClients(updatedClients);
}

export function updateClient(updatedClient: Client) {
  const clients = readClients();

  const updatedClients = clients.map((client) =>
    client.id === updatedClient.id ? updatedClient : client,
  );

  saveClients(updatedClients);

  return updateClient;
}
