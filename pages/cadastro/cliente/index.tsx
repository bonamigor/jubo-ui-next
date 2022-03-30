import { NextPage } from "next";
import { Container, Content, FormItself } from './cliente';

const CadastroCliente: NextPage = () => {
  return (
    <>
      <Container>
        <Content>
          <h1>Cadastro de Cliente</h1>
          <FormItself>
            <input type="text" id="name" placeholder="Nome" />
            <input type="text" id="cnpj" placeholder="CNPJ" />
            <input type="email" id="email" placeholder="E-mail" />
            <input type="text" id="address" placeholder="Endereço" />
            
            <input type="text" id="cep" placeholder="CEP" />
            <input type="text" id="city" placeholder="Cidade" />
            <input type="text" id="state" placeholder="Estado" />
            
            <input type="text" id="phone" placeholder="Telefone" />

            <button type="submit" id="button">Cadastrar</button>
          
          </FormItself>
        </Content>
      </Container>
    </>
  )
}

export default CadastroCliente
