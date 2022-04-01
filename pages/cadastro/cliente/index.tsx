import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'
import { Container, Content, FormItself, InputFilter, TableContainer } from './cliente';

interface ClienteProps {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  phone: string;
}

const CadastroCliente: NextPage = () => {
  const [filter, setFilter] = useState('')
  const [filteredClients, setFilteredClients] = useState<ClienteProps[]>([])
  const clients: Array<ClienteProps> = [
    {
      id: 1,
      name: 'CEPI Dr. Antônio R. G. da Frota',
      cnpj: '02.456.789/0001-28',
      email: '52033414@seduc.go.gov.br',
      address: 'RUA JOSE HONORATO S/N 1 ANDAR',
      cep: '74423510',
      city: 'GOIÂNIA',
      state: 'GO',
      phone: '(62) 3295-1418'
    },
    {
      id: 2,
      name: 'Colégio Estadual Damiana da Cunha',
      cnpj: '02.789.123/0001-03',
      email: '52033961@seduc.go.gov.br',
      address: 'RUA C 500 89',
      cep: '74550050',
      city: 'GOIÂNIA',
      state: 'GO',
      phone: '(62) 3291-4010'
    },
    {
      id: 3,
      name: 'CEPI Novo Horizonte',
      cnpj: '02.159.753/0001-89',
      email: '52033945@seduc.go.gov.br',
      address: 'ALAMEDA DAS PALMEIRAS, QD. 51-A S/N',
      cep: '74363810',
      city: 'GOIÂNIA',
      state: 'GO',
      phone: '(62) 3295-1418'
    },
    {
      id: 4,
      name: 'Colégio Estadual do Setor Palmito',
      cnpj: '02.159.753/0002-46',
      email: '52069915@seduc.go.gov.br',
      address: 'AV. CRISTOVO COLOMBO S/N',
      cep: '74705130',
      city: 'GOIÂNIA',
      state: 'GO',
      phone: '(62) 3206-3862'
    }
  ]

  const handleFilterClienteList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredClients(clients.filter(client => {
      return client.name.toUpperCase().includes(filter)
    }))
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Cliente</h1>
          <FormItself>
            <input type="text" id="name" placeholder="Nome" />
            <input type="text" id="cnpj" placeholder="CNPJ" />
            <input type="email" id="email" placeholder="E-mail" />
            <input type="text" id="address" placeholder="Endereço" />
            
            <input type="text" id="cep" placeholder="CEP" />
            <input type="text" id="city" placeholder="Cidade" />
            <input type="text" id="state" placeholder="Estado" />
            
            <input type="text" id="phone" placeholder="Telefone" />

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
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.city}/{client.state}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>
                          <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                          <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  clients.map(client => {
                    return (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.city}/{client.state}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
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
