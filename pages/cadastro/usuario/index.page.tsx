import type { NextPage } from "next"
import Image from "next/image";
import { useState, useEffect, FormEvent } from 'react';

import { Admin, Container, FormButton, Forms, FormSubmitButton, InputFilter, TableContainer, User } from './usuario';
import EditImg from '../../../assets/edit.png'
import DeleteImg from '../../../assets/delete.png'
import { useClientes } from '../../../hooks/useClientes';
import { usuarioService } from "../../../services";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/Modal/Delete/index.page";
import { useRouter } from "next/router";

interface UserProps {
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

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, errors } = await usuarioService.listarTodosOsUsuarios()
      if (!errors) {
        setUsuarios(data.users)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    populateClienteArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <TableContainer>
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
                usuarios.map(usuario => {
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
        </TableContainer>
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Usuario' id={id} />
      </Container>
    </>
  )
}

export default CadastroUsuario
