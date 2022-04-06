
import Modal from 'react-modal'
import { NextPage } from "next";
import { clienteService } from '../../../services';
import toast from 'react-hot-toast';
import { Buttons, Container, Content } from './delete';
import { usuarioService } from '../../../services/index';
import { useUser } from '../../../hooks/useUser';
import { useRouter } from 'next/router';

interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  entity: string;
  id: number;
}

const DeleteModal: NextPage<DeleteModalProps> = ({ isOpen, onRequestClose, entity, id }: DeleteModalProps) => {
  const { user, logoutUser } = useUser()
  const router = useRouter()

  const handleDelete = async () => {
    switch(entity) {
      case 'Cliente':
        const { clienteErrors } = await clienteService.deletarCliente(id)

        if(!clienteErrors) {
          onRequestClose()
          toast.success('Cliente excluído com sucesso!')
        } else {
          toast.error('Erro ao excluir o cliente.')
        }
        break;
      case 'Usuario':
        const { userErrors } = await usuarioService.deletarUsuario(id)

        if(!userErrors) {
          onRequestClose()
          toast.success('Cliente excluído com sucesso!')
          if (id === user.id) {
            window.localStorage.removeItem('token')
            window.sessionStorage.removeItem('userId')
            window.sessionStorage.removeItem('userName')
            window.sessionStorage.removeItem('userEmail')
            window.sessionStorage.removeItem('userAdmin')
            logoutUser()
            router.push('/')
          }
        } else {
          toast.error('Erro ao excluir o cliente.')
        }
        break;
    }
  }

  return(
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <Container>
          <Content>
            <h2>Deseja mesmo excluir esse registro?</h2>
            <Buttons>
              <button type='button' onClick={() => handleDelete()}>Excluir</button>
              <button type='button' className='no' onClick={onRequestClose}>Não</button>
            </Buttons>
          </Content>
        </Container>
      </Modal>
    </>
  )
}

export default DeleteModal
