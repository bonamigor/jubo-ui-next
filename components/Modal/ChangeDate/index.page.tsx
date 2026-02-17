import { NextPage } from 'next';
import { Container, Content, Buttons } from './changeDate';
import Modal from 'react-modal'
import toast from 'react-hot-toast';
import { pedidoService } from '../../../services';
import { useEffect, useState } from 'react';
import InputMask from "react-input-mask";
import { PedidosProps } from '../../../services/pedido';
import { isValid } from 'date-fns';

interface ChangeDateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pedido: PedidosProps;
}

const ChangeDate: NextPage<ChangeDateModalProps> = ({ isOpen, onRequestClose, pedido }) => {
  const [dataEntrega, setDataEntrega] = useState('')
  const [isValido, setIsValido] = useState(false)

  const handleChangeOrderDate = async (pedido: PedidosProps) => {
    const dataFormatada = new Date(dataEntrega.split('/').reverse().join('-')).getTime()
    const { data, errors } = await pedidoService.atualizarDataEntregaPedido(pedido.id, dataFormatada)

    if (!errors) {
      onRequestClose()
      toast.success(data.message ?? 'Data de Entrega alterada com sucesso!')
    } else {
      toast.error(errors.statusText ?? 'Erro ao alterar data entrega.')
    }
  }

  const validateAlterar = () => isValid(new Date(dataEntrega.split('/').reverse().join('-')).getTime())
  
  useEffect(() => {
    const isValidado = validateAlterar();
    setIsValido(isValidado);
  }, [dataEntrega])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
          <Content>
            <h2>Alterar data de entrega do Pedido.</h2>
            <div>
              <label>Data Entrega</label>
              <InputMask mask="99/99/9999" onChange={event => setDataEntrega(event.target.value)} value={dataEntrega} />
            </div>
            <Buttons>
              <button type='button' onClick={() => handleChangeOrderDate(pedido)} disabled={!isValido}>Atualizar</button>
              <button type='button' className='no' onClick={onRequestClose}>Fechar</button>
            </Buttons>
          </Content>
        </Container>
    </Modal>

  )
}

export default ChangeDate
