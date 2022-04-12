import { NextPage } from "next";
import { Container, Content } from "./criar";

const CriarPedido: NextPage = () => {
  return (
    <Container>
      <Content>
        <h1>Criação de pedido</h1>
        <h2>Seu pedido já está criado! <br /> Visualize os dados abaixo e <br />clique em + para adicionar os produtos nesse pedido!</h2>
      </Content>
    </Container>
  )
}

export default CriarPedido
