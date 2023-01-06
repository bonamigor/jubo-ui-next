import { NextPage } from "next";
import Image from "next/image";
import EditImg from '../../../../assets/edit.png'
import DeleteImg from '../../../../assets/delete.png'
import AddImg from '../../../../assets/add.png'
import { Container, Content, FormButton, FormItself, FormSubmitButton, InputFilter, TableContainer } from "./estante";
import { useState, useEffect, FormEvent, SetStateAction } from 'react';
import { estanteService } from '../../../../services/index';
import { useClientes } from '../../../../hooks/useClientes';
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import DeleteModal from "../../../../components/Modal/Delete/index.page";
import toast from "react-hot-toast";
import Head from "next/head";

interface EstanteProps {
  id: number;
  clienteId: string;
  cliente: string;
  periodo: string;
  observacao: string;
  ativa: string;
}

const CadastroEstante: NextPage = () => {
  const router = useRouter()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredEstantes, setFilteredEstantes] = useState<EstanteProps[]>([])
  const [estantes, setEstantes] = useState<EstanteProps[]>([])
  const { clientes, populateClienteArray } = useClientes()

  const [id, setId] = useState(0)
  const [cliente, setCliente] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [observacao, setObservacao] = useState('')

  useEffect(() => {
    const fetchEstantes = async () => {
      const { data, errors } = await estanteService.listarTodosAsEstantes()
      if (!errors) {
        setEstantes(data.estantes)
      }
    }
    fetchEstantes()
  }, [])

  useEffect(() => {
    populateClienteArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterEstanteList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredEstantes(estantes.filter(estante => {
      return estante.cliente.toUpperCase().includes(filter)
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const { errors } = await estanteService.cadastrarEstante({
        clienteId: Number(cliente.split(' ')[0]),
        periodo: periodo,
        observacao
      })
      if (!errors) {
        toast.success('Estante cadastrada com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao criar Estante!')
      console.error(error)
    }
  }

  const prepareUpdate = async (estante: EstanteProps) => {
    setId(estante.id)
    setCliente(`${estante.clienteId} - ${estante.cliente}`)
    setPeriodo(estante.periodo)
    setObservacao(estante.observacao)
    setIsUpdate(true)
  }

  const handleUpdate = async () => {
    try {
      const { errors } = await estanteService.atualizarEstante({
        clienteId: Number(cliente.split(' ')[0]),
        periodo: periodo,
        observacao,
        id: id
      })
      if (!errors) {
        toast.success('Estante atualizado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao cadastrar estante.')
      console.error(error)
    }
  }

  const handleDeleteEstante = (estante: EstanteProps) => {
    setId(estante.id)
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <Head>
        <title>Cadastro de Estante</title>
      </Head>
      <Container>
        <Content>
          <h1>Cadastro de Estante</h1>
          <FormItself onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder="Pesquise o Cliente" 
                list="clientes" id="cliente-choice" name="cliente-choice" autoComplete="off"
                value={cliente} onChange={event => {setCliente(event.target.value)}} />
              <datalist id="clientes">
                {clientes.map(cliente => {
                  return (<option key={cliente.id} value={`${cliente.id} - ${cliente.nome}`} />)
                })}
              </datalist>
              <NumberFormat format="####/##" type="text" id="price" value={periodo} 
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => {setPeriodo(event.target.value)}} 
                placeholder="Período" 
              />
              <input type="text" placeholder="Observação" value={observacao} onChange={event => {setObservacao(event.target.value)}} />
            </div>
            <FormSubmitButton type="submit" isUpdate={isUpdate}>Cadastrar</FormSubmitButton>
            <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </FormItself>
        </Content>
        <InputFilter>
          <input type="text" placeholder="Filtre pelo cliente" onChange={event => handleFilterEstanteList(event.target.value)} />
        </InputFilter>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>ID - Cliente</th>
                <th>Período</th>
                <th>Observação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filter.length > 1 ? (
                filteredEstantes.map(estante => {
                  return (
                    <tr key={estante.id}>
                      <td>{`${estante.clienteId} - ${estante.cliente}`}</td>
                      <td>{estante.periodo}</td>
                      <td>{estante.observacao}</td>
                      <td>
                        <a><Image onClick={() => prepareUpdate(estante)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => handleDeleteEstante(estante)} src={DeleteImg} alt="Deletar" width={30} height={30} /></a>
                        <a><Image onClick={() => router.push(`/cadastro/estante/${estante.id}/produtos`)} src={AddImg} alt="Adicionar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                estantes.map(estante => {
                  return (
                    <tr key={estante.id}>
                      <td>{`${estante.clienteId} - ${estante.cliente}`}</td>
                      <td>{estante.periodo}</td>
                      <td>{estante.observacao}</td>
                      <td>
                        <a><Image onClick={() => prepareUpdate(estante)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => handleDeleteEstante(estante)} src={DeleteImg} alt="Deletar" width={30} height={30} /></a>
                        <a><Image onClick={() => router.push(`admin/cadastro/estante/${estante.id}/produtos`)} src={AddImg} alt="Adicionar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </TableContainer>
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Estante' id={id} />
      </Container>
    </>
  )
}

export default CadastroEstante
