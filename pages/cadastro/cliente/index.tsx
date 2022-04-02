import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'
import { Container, Content, FormItself, InputFilter, TableContainer } from './cliente';
import { useClientes } from '../../../hooks/useClientes'
import InputMask from 'react-input-mask'

interface ClienteProps {
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

const CadastroCliente: NextPage = () => {
  const [filter, setFilter] = useState('')
  const [filteredClients, setFilteredClients] = useState<ClienteProps[]>([])
  const { clientes } = useClientes()

  const handleFilterClienteList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredClients(clientes.filter(client => {
      return client.nome.toUpperCase().includes(filter)
    }))
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Cliente</h1>
          <FormItself>
            <input type="text" id="name" placeholder="Nome" />
            
            <InputMask mask="99.999.999/9999-99" alwaysShowMask={false} type="text" id="cnpj" placeholder="CNPJ" />
            <input type="email" id="email" placeholder="E-mail" />
            <input type="text" id="address" placeholder="Endereço" />
            
            <input type="text" id="cep" placeholder="CEP" />
            <input type="text" id="city" placeholder="Cidade" />
            <input type="text" id="state" placeholder="Estado" />
            
            <InputMask mask={'(99) 99999-9999'} alwaysShowMask={false} type="text" id="phone" placeholder="Telefone" />

            <button type="submit" id="button">Cadastrar</button>
          </FormItself>
        </Content>
        <InputFilter>
          <input type="text" placeholder="Filtre pelo nome do Cliente" onChange={event => handleFilterClienteList(event.target.value)} />
          </InputFilter>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cidade/Estado</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {filter.length > 1 ? (
                  filteredClients.map(client => {
                    return (
                      <tr key={client.id.toString()}>
                        <td>{client.nome}</td>
                        <td>{client.cidade}/{client.estado}</td>
                        <td>{client.email}</td>
                        <td>{client.telefone}</td>
                        <td>
                          <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  clientes.map(cliente => {
                    return (
                      <tr key={String(cliente.id)}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cidade}/{cliente.estado}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefone}</td>
                        <td>
                          <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </TableContainer>
      </Container>
    </>
  )
}

export default CadastroCliente
