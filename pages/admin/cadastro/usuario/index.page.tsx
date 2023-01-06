import type { NextPage } from "next"
import Image from "next/image";
import { useState, useEffect, FormEvent } from 'react';

import { Admin, Container, FormButton, Forms, FormSubmitButton, InputFilter, TableContainer, User } from './usuario';
import EditImg from '../../../../assets/edit.png'
import DeleteImg from '../../../../assets/delete.png'
import { useClientes } from '../../../../hooks/useClientes';
import { usuarioService } from "../../../../services";
import toast from "react-hot-toast";
import DeleteModal from "../../../../components/Modal/Delete/index.page";
import { useRouter } from "next/router";
import Head from "next/head";
import Pagination from "../../../../components/Pagination/index.page";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";

export interface UserProps {
  id: number;
  nome: string;
  email: string;
  cliente?: string;
  admin?: number;
}

const CadastroUsuario: NextPage = () => {
  const router = useRouter()
  const [isUpdateAdmin, setIsUpdateAdmin] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const { clientes, populateClienteArray } = useClientes()
  const [filter, setFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }

  const [id, setId] = useState(0)
  const [nomeAdmin, setNomeAdmin] = useState('')
  const [emailAdmin, setEmailAdmin] = useState('')
  const [senhaAdmin, setSenhaAdmin] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [admin, setAdmin] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [usuarios, setUsuarios] = useState<UserProps[]>([])
  const [usuariosPaginados, setUsuariosPaginados] = useState<UserProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostsPerPage] = useState(5)

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;

  const { data, isLoading, isSuccess, isError } = useQuery('getUsuarios', usuarioService.listarTodosOsUsuarios, { staleTime: Infinity })

  console.log(data)

  useEffect(() => {
    if (data) {
      setUsuarios(data.users)
    }
  }, [])

  useEffect(() => {
    populateClienteArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (usuarios) {
      setUsuariosPaginados(usuarios.slice(firstIndex, lastIndex))
    }
  }, [currentPage, firstIndex, lastIndex, postPerPage, usuarios])

  const handleFilterUserList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredUsers(usuarios.filter(usuario => {
      return usuario.nome.toUpperCase().includes(filter)
    }))
  }

  const handleSubmitAdmin = async () => {
    try {
      const { errors } = await usuarioService.cadastrarUsuarioAdmin({
        nome: nomeAdmin,
        email: emailAdmin,
        senha: senhaAdmin,
        admin: true
      })

      if (!errors) {
        toast.success('Usuário criado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao criar o usuário.')
      console.error(error)
    }
  }

  const handleSubmitUser = async (event: FormEvent) => {
    try {
      const { errors } = await usuarioService.cadastrarUsuarioRegular({
        nome: nome,
        email: email,
        senha: senha,
        clienteId: clienteId.split(' ')[0]
      })

      if (!errors) {
        toast.success('Usuário criado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao criar o usuário.')
      console.error(error)
    }
  }

  const prepareUpdate = (usuario: UserProps) => {
    if (usuario.admin) {
      setId(usuario.id)
      setNomeAdmin(usuario.nome)
      setEmailAdmin(usuario.email)
      setAdmin(String(usuario.admin))
      setIsUpdateAdmin(true)
    } else {
      setId(usuario.id)
      setNome(usuario.nome)
      setEmail(usuario.email)
      setIsUpdate(true)
    }
  }

  const handleUpdate = async () => {
    try {
      if (admin) {
        const { errors } = await usuarioService.atualizarUsuarioAdmin({
          nome: nomeAdmin,
          email: emailAdmin,
          senha: senhaAdmin,
          admin: admin,
          id: id
        })

        if (!errors) {
          toast.success('Usuário atualizado com sucesso!')
          router.reload()
        }
      } else {
        const { errors } = await usuarioService.atualizarUsuarioRegular({
          nome: nome,
          email: email,
          senha: senha,
          clienteId: clienteId.split(' ')[0],
          id: id
        })

        if (!errors) {
          toast.success('Usuário atualizado com sucesso!')
          router.reload()
        }
      }
    } catch (error) {
      toast.error('Erro ao atualizar o Usuário.')
      console.error(error)
    }
  }

  const deleteUsuario = (usuario: UserProps) => {
    setId(usuario.id)
    setIsDeleteModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Cadastro de Usuário</title>
      </Head>
      <Container>
        <Forms>
          <Admin onSubmit={handleSubmitAdmin}>
            <h1>Cadastro de Administrador</h1>
            <input type="text" placeholder="Nome" value={nomeAdmin} onChange={event => {setNomeAdmin(event.target.value)}} />
            <input type="email" placeholder="E-mail" value={emailAdmin} onChange={event => {setEmailAdmin(event.target.value)}} />
            <input type="password" placeholder="Senha" value={senhaAdmin} onChange={event => {setSenhaAdmin(event.target.value)}} />
            <FormSubmitButton type="submit" id="button" isUpdate={isUpdateAdmin}>Cadastrar</FormSubmitButton>
            <FormButton type="button" id="button" isUpdate={isUpdateAdmin} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </Admin>
          <User onSubmit={handleSubmitUser}>
            <h1>Cadastro de Usuário</h1>
            <input type="text" placeholder="Nome" value={nome} onChange={event => {setNome(event.target.value)}} />
            <input type="email" placeholder="E-mail" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input type="password" placeholder="Senha" value={senha} onChange={event => {setSenha(event.target.value)}} />
            <input type="text" placeholder="Pesquise o Cliente" 
              list="clientes" id="cliente-choice" name="cliente-choice" autoComplete="off"
              value={clienteId} onChange={event => {setClienteId(event.target.value)}} />
            <datalist id="clientes">
              {clientes.map(cliente => {
                return (<option key={cliente.id} value={`${cliente.id} - ${cliente.nome}`} />)
              })}
            </datalist>
            <FormSubmitButton type="submit" id="button" isUpdate={isUpdate}>Cadastrar</FormSubmitButton>
            <FormButton type="button" id="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </User>
        </Forms>
        <InputFilter>
        <input type="text" placeholder="Filtre pelo nome do usuário" onChange={event => handleFilterUserList(event.target.value)} />
        </InputFilter>
        {isLoading && <div><Loading color="success" size="lg">Carregando Usuários</Loading></div>}
        {isSuccess && <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cliente</th>
                <th>Admin</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filter.length > 1 ? (
                filteredUsers.map(usuario => {
                  return (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.cliente ? usuario.cliente : 'Não possui'}</td>
                      <td>{usuario.admin ? 'Sim' : 'Não'}</td>
                      <td>
                        <a><Image onClick={() => {prepareUpdate(usuario)}} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {deleteUsuario(usuario)}} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                data.users.map((usuario: UserProps) => {
                  return (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.cliente ? usuario.cliente : 'Não possui'}</td>
                      <td>{usuario.admin ? 'Sim' : 'Não'}</td>
                      <td>
                        <a><Image onClick={() => {prepareUpdate(usuario)}} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => {deleteUsuario(usuario)}} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </TableContainer>}
        {usuarios && <Pagination totalPosts={usuarios.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} />}
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Usuario' id={id} />
      </Container>
    </>
  )
}

export default CadastroUsuario
