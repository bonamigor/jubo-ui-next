import type { NextPage } from "next"
import { Admin, Container, User } from './usuario';

const CadastroUsuario: NextPage = () => {
  return (
    <>
      <Container>
        <Admin>
          <h1>Cadastro de Administrador</h1>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </Admin>
        <User>
          <h1>Cadastro de Usuário</h1>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="text" placeholder="Selecione o Cliente" />
          <button type="submit">Cadastrar</button>
        </User>
      </Container>
    </>
  )
}

export default CadastroUsuario
