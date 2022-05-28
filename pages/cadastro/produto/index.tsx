import { NextPage } from "next";
import Image from "next/image";
import { Container, Content, FormButton, FormItself, FormSubmitButton, InputFilter, TableContainer } from "./produto";
import EditImg from '../../../assets/edit.png'
import DeleteImg from '../../../assets/delete.png'
import { useState, useEffect, FormEvent } from 'react';
import { produtoService } from '../../../services/index';
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import DeleteModal from "../../../components/Modal/Delete";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export interface ProdutoProps {
  id: number;
  nome: string;
  preco: string;
  unidade: string;
}

const CadastroProduto: NextPage = () => {
  const router = useRouter()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [unidade, setUnidade] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredprodutos, setFilteredprodutos] = useState<ProdutoProps[]>([])
  

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, errors } = await produtoService.listarTodosOsProdutos()
      if (!errors) {
        setProdutos(data.produtos)
      }
    }
    fetchProducts()
  }, [])

  const handleFilterProdutoList = (event: any) => {
    setFilter(event.toUpperCase())
    setFilteredprodutos(produtos.filter(produto => {
      return produto.nome.toUpperCase().includes(filter)
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const { errors } = await produtoService.cadastrarProduto({
        nome: nome,
        precoCusto: String(preco),
        unidadeMedida: unidade
      })
      if (!errors) {
        toast.success('Produto cadastrado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao cadastra produto.')
      console.error(error)
    }
  }

  const prepareUpdate = async (produto: ProdutoProps) => {
    setId(produto.id)
    setNome(produto.nome)
    setPreco(String(produto.preco))
    setUnidade(produto.unidade)
    setIsUpdate(true)
  }

  const handleUpdate = async () => {
    try {
      const { errors } = await produtoService.atualizarProduto({
        nome: nome,
        precoCusto: String(preco),
        unidadeMedida: unidade,
        id: id
      })
      if (!errors) {
        toast.success('Produto atualizado com sucesso!')
        router.reload()
      }
    } catch (error) {
      toast.error('Erro ao cadastra produto.')
      console.error(error)
    }
  }

  const handleDeleteProduto = (produto: ProdutoProps) => {
    setId(produto.id)
    setIsDeleteModalOpen(true)
  }

  const onRequestClose = () => {
    setIsDeleteModalOpen(false)
  }

  const generatePdf = () => {
    const doc = new jsPDF('l')

    const formatedPrices = produtos.map(produto => {
      produto.preco = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      }).format(Number(produto.preco))
      return produto
    })

    const newProdutosArray = formatedPrices.map(produto => {
      return Object.values(produto)
    })

    let pageWidth = doc.internal.pageSize.getWidth()

    let pageNumber = doc.internal.pages.length - 1

    doc.text('Pedido', 14, 15)
    doc.text('Pedido 2', 154, 15)

    doc.setFontSize(10)
    doc.text('CEPI Dr. Antônio R. G. da Frota', 14, 20)
    doc.text('CEPI Dr. Antônio R. G. da Frota', 154, 20)

    doc.text('RUA JOSE HONORATO S/N 1 ANDAR', 14, 25)
    doc.text('RUA JOSE HONORATO S/N 1 ANDAR', 154, 25)

    doc.text('Goiânia / GO', 14, 30)
    doc.text('Goiânia / GO', 154, 30)

    doc.text('6232951418', 14, 35)
    doc.text('6232951418', 154, 35)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Preço', 'Unidade']],
      body: newProdutosArray,
      startY: 40,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { right: 125 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    doc.setPage(pageNumber)

    autoTable(doc, {
      head: [['ID', 'Nome', 'Preço', 'Unidade']],
      body: newProdutosArray,
      startY: 40,
      tableWidth: 130,
      showHead: 'firstPage',
      margin: { left: 153 },
      styles: { overflow: 'hidden' },
      pageBreak: 'auto'
    })

    const obs = 'Comi o cu de quem ta lendo'

    doc.text(`Observação: ${obs}`, 14, 200)
    doc.text(`Observação: ${obs}`, 154, 200)

    doc.text(`Assinatura: _______________________________________________`, 14, 205)
    doc.text(`Assinatura: _______________________________________________`, 154, 205)


    doc.save('produtos.pdf')
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Produto</h1>
          <FormItself onSubmit={handleSubmit}>
            <div>
              <input type="text" id="name" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome" />
              <input type="text" id="price" value={preco} onChange={(event: { target: { value: any; }; }) => setPreco(event.target.value)} placeholder="Preço" />
              <select name="unities" id="unity" value={unidade} onChange={event => setUnidade(event.target.value)}>
                <option value="">Und Medida</option>
                <option value="KG">KG</option>
                <option value="PCT">PCT</option>
                <option value="UND">UND</option>
                <option value="LT">LT</option>
                <option value="L">L</option>
                <option value="MÇ">MÇ</option>
              </select>
            </div>
            <FormSubmitButton type="submit" isUpdate={isUpdate}>Cadastrar</FormSubmitButton>
            <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()}>Atualizar</FormButton>
          </FormItself>
        </Content>
        <InputFilter>
          <input type="text" placeholder="Filtre pelo nome do produto" onChange={event => handleFilterProdutoList(event.target.value)} />
        </InputFilter>
        <TableContainer>
          <table id="products-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filter.length > 1 ? (
                filteredprodutos.map(produto => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>
                      { new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(produto.preco))}
                      </td>
                      <td>{produto.unidade}</td>
                      <td>
                        <a><Image onClick={() => prepareUpdate(produto)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => handleDeleteProduto(produto)} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                produtos.map(produto => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>
                      { new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(produto.preco))}
                      </td>
                      <td>{produto.unidade}</td>
                      <td>
                        <a><Image onClick={() => prepareUpdate(produto)} src={EditImg} alt="Visualizar" width={30} height={30} /></a>
                        <a><Image onClick={() => handleDeleteProduto(produto)} src={DeleteImg} alt="Confirmar" width={30} height={30} /></a>
                      </td>
                    </tr>
                  )
                })
              )}
              
            </tbody>
          </table>
        </TableContainer>
        <button onClick={generatePdf}>Criar PDF</button>
        <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={onRequestClose} entity='Produto' id={id} />
      </Container>
    </>
  )
}

export default CadastroProduto
