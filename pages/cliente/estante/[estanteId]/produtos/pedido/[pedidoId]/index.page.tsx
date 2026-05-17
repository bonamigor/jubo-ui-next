import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from 'react'
import toast from "react-hot-toast"
import ProductsInDemandTable from "../../../../../../../components/ProducstInDemandTable/index.page"
import { clienteService, itemPedidoService, pedidoService, produtoEstanteService } from '../../../../../../../services/index'
import { Container, Content, FormButton, FormContent, FormHeader, FormSubmitButton, PedidoData, PedidoForm } from "./produtos"

interface ProdutoNaEstanteProps {
  produtoId: number;
  nome: string;
  precoCusto?: number;
  unidade: string;
  precoVenda: number;
  quantidade: number;
  total: number;
}

interface ProdutoNoPedidoProps {
  itemPedidoId?: string;
  produtoId: string;
  nome: string;
  unidade: string;
  precoVenda: number;
  quantidade: string;
  total: number;
}

const PedidoProdutos: NextPage = () => {
  const router = useRouter()
  const { pedidoId, estanteId } = router.query
  const [produtoNaEstante, setProdutosNaEstante] = useState<ProdutoNaEstanteProps[]>([])
  const [product, setProduct] = useState<ProdutoNoPedidoProps>({ itemPedidoId: '', produtoId: '', nome: '', unidade: '', precoVenda: 0, quantidade: '', total: 0 })
  const [produtos, setProdutos] = useState<ProdutoNoPedidoProps[]>([])
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [quantidadeAntiga, setQuantidadeAntiga] = useState('')
  const [cliente, setCliente] = useState({ 
    id: 0,
    nome: '',
    cnpj: '',
    endereco: '',
    cep: '',
    email: '',
    cidade: '',
    estado: '',
    telefone: '',
    ativo: ''}
  )
  const [pedido, setPedido] = useState({ id: 0, status: '', dataCriacao: '', dataConfirmacao: '', dataCancelamento: '', dataEntrega: '', valorTotal: 0, clienteId: 0});
  const [isUpdate, setIsUpdate] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProdutoNaEstanteProps | null>(null);
  const [editingItem, setEditingItem] = useState<ProdutoNoPedidoProps | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, errors } = await produtoEstanteService.listarProdutosNaEstantePedido(Number(estanteId))

      if (!errors) {
        setProdutosNaEstante(data.estante.produtos)
      }
    }

    const fetchCliente = async () => {
      const { data, errors } = await clienteService.listarUmCliente(Number(window.sessionStorage.getItem('userClientId')))

      if (!errors) {
        setCliente(data.cliente)
      }
    }

    const fetchPedido = async () => {
      const { data, errors } = await pedidoService.listarPedidoById(Number(pedidoId))

      if (!errors) {
        setPedido(data.pedido[0])
      }
    }

    fetchProdutos()
    fetchCliente()
    fetchPedido()
  }, [estanteId, pedidoId, produtos])

  const validate = () => selectedProduct !== null && quantidade.length > 0;

  useEffect(() => {
  const isValid = validate();
  setIsValid(isValid);
}, [selectedProduct, quantidade]);
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!selectedProduct) {
      toast.error('Selecione um produto válido da lista.');
      return;
    }

    try {
    const { errors } = await itemPedidoService.adicionarProdutoNoPedido({
      estanteId: String(estanteId),
      produtoId: String(selectedProduct.produtoId), // Usa o ID real
      precoVenda: selectedProduct.precoVenda,      // Usa o preço real
      quantidade: Number(quantidade.replace(',', '.')),
      pedidoId: String(pedidoId)
    });

    if (!errors) {
      // Limpa os campos e o produto selecionado
      setSearchTerm('');
      setSelectedProduct(null);
      setQuantidade('');

      // Cria o objeto para a tabela
      const newProduto: ProdutoNoPedidoProps = {
        produtoId: String(selectedProduct.produtoId),
        nome: selectedProduct.nome,
        unidade: selectedProduct.unidade,
        precoVenda: selectedProduct.precoVenda,
        quantidade: quantidade.replace('.', ','),
        total: selectedProduct.precoVenda * Number(quantidade.replace(',', '.'))
      };
      setProduct(newProduto);

      toast.success('Produto adicionado no pedido!');
    }
    } catch (error) {
      toast.error('Erro ao adicionar o produto no pedido.');
      console.error(error);
    }
  }

  const prepareUpdate = async (produto: ProdutoNoPedidoProps) => {
    setEditingItem(produto);
    
    setSelectedProduct({
      produtoId: Number(produto.produtoId),
      nome: produto.nome,
      unidade: produto.unidade,
      precoVenda: produto.precoVenda,
      quantidade: Number(produto.quantidade),
      total: produto.total
    });
    
    setQuantidade(String(produto.quantidade));
    
    setQuantidadeAntiga(produto.quantidade.split('.')[0]);
    
    setIsUpdate(true);
    
    setSearchTerm('');
  };

  const handleUpdate = async () => {
    if (!editingItem || !selectedProduct) {
      toast.error('Selecione um produto para atualizar.');
      return;
    }

    try {
      const { data, errors } = await itemPedidoService.atualizarItemDoPedido({
        estanteId: Number(estanteId),
        produtoId: selectedProduct.produtoId, // Agora usa o ID real do produto
        pedidoId: Number(pedidoId),
        itemPedidoId: Number(editingItem.itemPedidoId), // ID do item no pedido
        precoVenda: selectedProduct.precoVenda,
        quantidadeNova: Number(quantidade.replaceAll('.', '').replaceAll(',', '.')),
        quantidadeAntiga: Number(quantidadeAntiga.replaceAll('.', '').replaceAll(',', '.'))
      });

      if (!errors) {
        toast.success(data.message || 'Item atualizado com sucesso!');
        
        // Cria o objeto atualizado para a tabela
        const updatedProduto: ProdutoNoPedidoProps = {
          itemPedidoId: editingItem.itemPedidoId,
          produtoId: String(selectedProduct.produtoId),
          nome: selectedProduct.nome,
          unidade: selectedProduct.unidade,
          precoVenda: selectedProduct.precoVenda,
          quantidade: quantidade.replaceAll('.', ','),
          total: selectedProduct.precoVenda * Number(quantidade.replaceAll('.', '').replaceAll(',', '.'))
        };
        
        setProduct(updatedProduto);
        
        // Limpa todos os estados
        setSelectedProduct(null);
        setSearchTerm('');
        setQuantidade('');
        setQuantidadeAntiga('');
        setEditingItem(null);
        setIsUpdate(false);
      }
    } catch (error) {
      toast.error('Erro ao atualizar Item do Pedido.');
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Adicionar produtos</title>
      </Head>    
      <Container>
        <Content>
          <FormHeader>
            <h1>Adicione Produtos ao Pedido!</h1>
            <PedidoData>
              <h2>Dados Pedido N° {pedidoId}</h2>
              <div>
                <p><span>Colégio:</span> {cliente.nome}</p>
                <div className="info-grid">
                  <p><span>Data Criação:</span> {new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date())}</p>
                  <p><span>Status:</span> {pedido.status}</p>
                </div>
              </div>
            </PedidoData>
          </FormHeader>
          <h2>Selecione os produtos, digite a quantidade desejada e clique em Adicionar!</h2>
            <PedidoForm onSubmit={handleSubmit}>
              <FormContent>
                <div>
                  {/* Input de busca (some quando produto selecionado) */}
                  {!selectedProduct ? (
                    <input 
                      type="text" 
                      placeholder="Pesquise o Produto" 
                      list="produtos" 
                      id="produto-choice" 
                      name="produto-choice" 
                      autoComplete="off"
                      value={searchTerm}
                      onChange={(event) => {
                        const newValue = event.target.value;
                        setSearchTerm(newValue);
                        
                        const matchedProduct = produtoNaEstante.find(
                          produto => 
                            `${produto.produtoId} ${produto.nome} - ${new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(produto.precoVenda)} / ${produto.unidade}` === newValue
                        );
                        
                        if (matchedProduct) {
                          setSelectedProduct(matchedProduct);
                          setSearchTerm(''); // Limpa o termo de busca
                        }
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '10px',
                      backgroundColor: '#e3f2fd',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #1976d2'
                    }}>
                      <div>
                        <strong>{selectedProduct.nome}</strong>
                        <br />
                        <small>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(selectedProduct.precoVenda)} / {selectedProduct.unidade}
                        </small>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          setSelectedProduct(null);
                          setSearchTerm('');
                        }}
                        style={{
                          backgroundColor: '#ff5252',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        ✕ Alterar
                      </button>
                    </div>
                  )}
                  
                  <datalist id="produtos">
                    {produtoNaEstante.map(produto => (
                      <option 
                        key={produto.produtoId} 
                        value={`${produto.produtoId} ${produto.nome} - ${new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(produto.precoVenda)} / ${produto.unidade}`}
                      />
                    ))}
                  </datalist>
                </div>
                
                <input 
                  type="text" 
                  placeholder="Quantidade" 
                  value={quantidade} 
                  onChange={event => setQuantidade(event.target.value)} 
                />
                
                <FormSubmitButton type="submit" isUpdate={isUpdate} disabled={!isValid}>
                  Adicionar
                </FormSubmitButton>
                
                <FormButton type="button" isUpdate={isUpdate} onClick={() => handleUpdate()} disabled={!isUpdate || !selectedProduct}>
                  Atualizar
                </FormButton>
              </FormContent>
            </PedidoForm>
            <ProductsInDemandTable prepareUpdate={prepareUpdate} product={product} />
        </Content>
      </Container>
    </>
  )
}

export default PedidoProdutos
