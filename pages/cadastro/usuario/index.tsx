import type { NextPage } from "next"
import Image from "next/image";
import { useState } from "react";

import { Admin, Container, Forms, InputFilter, TableContainer, User } from './usuario';
import BloomImg from '../../../assets/bloom.png'
import ConfirmImg from '../../../assets/confirm.png'

interface UserProps {
  id: number;
  name: string;
  email: string;
  admin: boolean;
}

const CadastroUsuario: NextPage = () => {
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
  const users: Array<UserProps> = [
    {
      id: 1,
      name: 'Rafael Bonamigo',
      email: 'rafaelrbonamigo@gmail.com',
      admin: true
    },
    {
      id: 2,
      name: 'Juarez Bonamigo',
      email: 'juarezbonamigo@hotmail.com',
      admin: true
    },
    {
      id: 3,
      name: 'Raquel Murillo',
      email: 'raquel.murillo@cni.es',
      admin: false
    },
    {
      id: 4,
      name: 'Sergio Marquina',
      email: 'elprofessor@bellaciao.es',
      admin: true
    }
  ]

  const handleFilterUserList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredUsers(users.filter(user => {
      return user.name.toUpperCase().includes(filter)
    }))
  }

  return (
    <>
      <Container>
        <Forms>
          <Admin>
            <h1>Cadastro de Administrador</h1>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Cadastrar</button>
          </Admin>
          <User>
            <h1>Cadastro de Usuário</h1>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <input type="text" placeholder="Selecione o Cliente" />
            <button type="submit">Cadastrar</button>
          </User>
        </Forms>
        <InputFilter>
        <input type="text" placeholder="Filtre pelo nome do usuário" onChange={event => handleFilterUserList(event.target.value)} />
        </InputFilter>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Admin</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filter.length > 1 ? (
                filteredUsers.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.admin ? 'Sim' : 'Não'}</td>
                      <td>
                        <a><Image onClick={() => {}} src={BloomImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {}} src={ConfirmImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.admin ? 'Sim' : 'Não'}</td>
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

export default CadastroUsuario
