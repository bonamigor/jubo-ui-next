import { NextPage } from 'next';
import { Container, Content, Buttons } from './updateStatus';
import Modal from 'react-modal'
import toast from 'react-hot-toast';
import { estanteService, pedidoService } from '../../../services';
import { useRouter } from 'next/router';
import { EstanteProdutoProps } from '../../../pages/admin/cadastro/estante/[id]/produtos/index.page';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  produto: EstanteProdutoProps;
  estanteId: number;
}

const UpdateStatus: NextPage<UpdateStatusModalProps> = ({ isOpen, onRequestClose, produto, estanteId }) => {
  const router = useRouter()
   

  console.log(produto)

  const handleUpdateStatus = async (produto: EstanteProdutoProps) => {
    const ativo = produto.ativo === 1 ? 0 : 1;
    const { data, errors } = await estanteService.atualizarStatusDoProdutoNaEstante({ ativo, estanteId, produtoId: produto.produtoId })

    if (!errors) {
      onRequestClose()
      toast.success(data.message ?? 'Status do produto atualizado com sucesso!')
      router.reload()
    } else {
      toast.error(errors.statusText ?? 'Erro ao alterar status do produto.')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
          <Content>
            <h2>Alterar STATUS do produto.</h2>
            <div>
              {produto && <label>Deseja atualizar o status deste produto para &apos;{produto.ativo === 1 ? 'DESATIVADO' : 'ATIVADO'}&apos;?</label>}
              
            </div>
            <Buttons>
              <button type='button' onClick={() => handleUpdateStatus(produto)}>Sim</button>
              <button type='button' onClick={() => onRequestClose()}>Não</button>
            </Buttons>
          </Content>
        </Container>
    </Modal>

  )
}

export default UpdateStatus
