import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cliente } from '../services';

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
  ativo: boolean;
}

type ClienteInput = Omit<Cliente, 'id'>

interface ClienteProviderProps {
  children: ReactNode;
}

interface ClienteContextData {
  clientes: Cliente[];
  createCliente: (cliente: ClienteInput) => Promise<void>;
}

const ClienteContext = createContext<ClienteContextData>({} as ClienteContextData);

export function ClienteProvider({ children }: ClienteProviderProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])

  const fetchClientes = async () => {
    const { data, errors } = await cliente.listarTodosOsClientes()

    if(!errors){
      setClientes(data.clientes)
    }
  }

  useEffect(() => {
    fetchClientes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function createCliente(clienteInput: ClienteInput) {
    const { data, errors } = await cliente.cadastrarCliente(clienteInput)

    if (!errors) {
      setClientes([
        ...clientes,
        data
      ]);
    }
  }

  return (
    <ClienteContext.Provider value={{ clientes, createCliente }}>
      { children }
    </ClienteContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClienteContext);

  return context;
}
