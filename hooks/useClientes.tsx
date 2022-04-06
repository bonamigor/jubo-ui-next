import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { clienteService } from '../services';

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  email: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  ativo: string;
}

type ClienteInput = Omit<Cliente, 'id'>

interface ClienteProviderProps {
  children: ReactNode;
}

interface ClienteContextData {
  clientes: Cliente[];
  populateClienteArray: () => Promise<void>;
  createCliente: (cliente: ClienteInput) => Promise<void>;
  updateCliente: (cliente: Cliente) => Promise<void>;
}

const ClienteContext = createContext<ClienteContextData>({} as ClienteContextData);

export function ClienteProvider({ children }: ClienteProviderProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])

  async function populateClienteArray () {
    const { data, errors } = await clienteService.listarTodosOsClientes()

    if(!errors){
      setClientes(data.clientes)
    }
  }

  async function createCliente(clienteInput: ClienteInput) {
    const { data, errors } = await clienteService.cadastrarCliente(clienteInput)

    if (!errors) {
      setClientes([
        ...clientes,
        data
      ]);
    }
  }

  async function updateCliente(clienteUpdate: Cliente) {
    const { data, errors } = await clienteService.atualizarCliente(clienteUpdate)

    if (!errors) {
      setClientes([
        ...clientes,
        data
      ]);
    }
  }

  return (
    <ClienteContext.Provider value={{ clientes, populateClienteArray, createCliente, updateCliente }}>
      { children }
    </ClienteContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClienteContext);

  return context;
}
