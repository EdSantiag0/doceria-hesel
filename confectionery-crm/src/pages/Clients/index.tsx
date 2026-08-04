// Pagina para listar e pesquisar clientes cadastrados.
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { Client } from "../../types/Client";
import { ClientCard } from "../../components/ClientCard";
import {
  getClients,
  deleteClient,
  updateClient,
} from "../../services/clientStorage";
import { EditClientDialog } from "../../components/EditClientDialog";
import type { Order } from "../../types/Order";
import {
  deleteOrder,
  getOrders,
  updateOrder,
} from "../../services/orderStorage";
import { EditOrderDialog } from "../../components/EditOrderDialog";
import { deleteOrdersByClient } from "../../business/order/deleteClientOrders";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { Search } from "lucide-react";

export function Clients() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState(() => getClients());
  const [orders, setOrders] = useState(() => getOrders());
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [openDeleteOrderDialog, setOpenDeleteOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openEditOrderDialog, setOpenEditOrderDialog] = useState(false);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return clients;
    }

    return clients.filter((client) =>
      client.name.toLowerCase().includes(normalizedSearch),
    );
  }, [clients, search]);

  function handleDelete(client: Client) {
    setSelectedClient(client);

    setOpenDeleteDialog(true);
  }

  function confirmDelete() {
    if (!selectedClient) return;

    deleteOrdersByClient(selectedClient.id);
    deleteClient(selectedClient.id);

    setClients(getClients());
    setOrders(getOrders());

    setOpenDeleteDialog(false);
    setSelectedClient(null);

    toast.success("Cliente removido com sucesso!");
  }

  function handleEdit(client: Client) {
    setSelectedClient(client);
    setOpenEditDialog(true);
  }

  function confirmEdit(client: Client) {
    updateClient(client);

    toast.success("Cliente atualizado com sucesso!");

    setOpenEditDialog(false);
    setSelectedClient(null);

    setClients(getClients());
  }

  function handleDeleteOrder(orderId: string) {
    setSelectedOrderId(orderId);

    setOpenDeleteOrderDialog(true);
  }

  function confirmDeleteOrder() {
    if (!selectedOrderId) return;

    deleteOrder(selectedOrderId);
    setOrders(getOrders());

    toast.success("Pedido removido com sucesso!");

    setOpenDeleteOrderDialog(false);
    setSelectedOrderId(null);
  }

  function handleEditOrder(order: Order) {
    setSelectedOrder(order);

    setOpenEditOrderDialog(true);
  }

  function confirmEditOrder(order: Order) {
    updateOrder(order);

    setOrders(getOrders());

    toast.success("Pedido atualizado com sucesso!");

    setOpenEditOrderDialog(false);

    setSelectedOrder(null);
  }

  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
      <div className="flex flex-col items-start justify-between gap-[18px] sm:flex-row">
        <div>
          <h2 className="mb-1.5 mt-0 text-2xl font-bold text-[#6f2706]">
            Clientes
          </h2>
          <p className="m-0 text-text-muted">
            Consulte os clientes cadastrados e encontre pelo nome.
          </p>
        </div>

        <span className="whitespace-nowrap rounded-xl border border-[#f0cf64] bg-[#fffaf0] px-3 py-2 text-sm font-semibold text-[#8a3c12]">
          {clients.length} cliente(s)
        </span>
      </div>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b85a18]" size={19} />
        <input
          className="min-h-12 w-full rounded-xl border border-[#f0cf64] bg-[#fffaf0] py-2 pl-11 pr-4 text-[#43281c] outline-none placeholder:text-[#9a877d] focus:border-[#b85a18] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,90,24,0.12)]"
          type="search"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="grid gap-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              orders={orders.filter((order) => order.clientId === client.id)}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDeleteOrder={handleDeleteOrder}
              onEditOrder={handleEditOrder}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e6bf74] bg-[#fffaf0] p-8 text-center">
            <strong className="text-brand-900">
              Nenhum cliente encontrado.
            </strong>
            <p className="mb-0 mt-1.5 text-text-muted">
              Cadastre um novo cliente ou ajuste a pesquisa.
            </p>
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={openDeleteDialog}
        title="Excluir cliente"
        message="Tem certeza que deseja excluir este cliente?"
        confirmText="Excluir"
        variant="danger"
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
      <ConfirmDialog
        isOpen={openDeleteOrderDialog}
        title="Excluir pedido"
        message="Tem certeza que deseja excluir este pedido?"
        confirmText="Excluir"
        variant="danger"
        onCancel={() => setOpenDeleteOrderDialog(false)}
        onConfirm={confirmDeleteOrder}
      />
      <EditClientDialog
        isOpen={openEditDialog}
        client={selectedClient}
        onCancel={() => setOpenEditDialog(false)}
        onSave={confirmEdit}
      />
      <EditOrderDialog
        isOpen={openEditOrderDialog}
        order={selectedOrder}
        onCancel={() => setOpenEditOrderDialog(false)}
        onSave={confirmEditOrder}
      />
    </div>
  );
}
