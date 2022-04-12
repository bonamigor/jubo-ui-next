import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { clienteService } from '../services';

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cep: string;
  email: string;
  cidade: string;
  estado: string;
  telefone: string;
  ativo: string;
}

type ClienteInput = Omit<Cliente, 'id'>

interface ClienteProviderProps {
  children: ReactNode;
}

interface ClienteContextData {
  cliente: Cliente;
  clientes: Cliente[];
  populateClienteArray: () => Promise<void>;
  setClienteData: (id: number) => Promise<void>;
  createCliente: (cliente: ClienteInput) => Promise<void>;
  updateCliente: (cliente: Cliente) => Promise<void>;
}

const ClienteContext = createContext<ClienteContextData>({} as ClienteContextData);

export function ClienteProvider({ children }: ClienteProviderProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    cnpj: '',
    endereco: '',
    cep: '',
    email: '',
    cidade: '',
    estado: '',
    telefone: '',
    ativo: ''
  })

  async function populateClienteArray () {
    const { data, errors } = await clienteService.listarTodosOsClientes()

    if(!errors){
      setClientes(data.clientes)
    }
  }

  async function setClienteData (id: number) {
    const { data, errors } = await clienteService.listarUmCliente(id)
    if (!errors) {
      setCliente(data.cliente)
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
    <ClienteContext.Provider value={{ cliente, clientes, populateClienteArray, setClienteData, createCliente, updateCliente }}>
      { children }
    </ClienteContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClienteContext);

  return context;
}
