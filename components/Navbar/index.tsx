import logoImg from '../../assets/logo.png' 
import Image from 'next/image';

import { NextPage } from "next";
import { Container, Content, Dropdown, Logo, Menu, MenuItem } from './navbar';
import LogginButton from '../LoginButton';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';

const Navbar: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const isUserLoggedIn: boolean = user.id === 0 ? false : true
  
  const route = router.pathname

  const isActive = ({route, item}: {route: string, item: string}) => {
    return route.includes(item)
  }

  const userName = user.id === 0 ? 'Usuário | sair' : `${user.name} | sair`

  return isUserLoggedIn ? (
    <>
      <Container>
        <Content>
          <Logo>
            <Image src={logoImg} alt="Jubo" width={50} height={40}/>
            <h1>Jubo</h1>
          </Logo>
          <Menu>
            <MenuItem onClick={() => {router.push('/dashboard')}} isActive={isActive({route, item: 'dashboard'})}>DASHBOARD</MenuItem>
            <Dropdown>
              <MenuItem isActive={isActive({route, item: 'cadastro'})}>CADASTROS</MenuItem>
              <nav>
                <div>
                  <MenuItem onClick={() => {router.push('/cadastro/usuario')}} isActive={isActive({route, item: 'usuario'})}>USUÁRIO</MenuItem>|
                  <MenuItem onClick={() => {router.push('/cadastro/cliente')}} isActive={isActive({route, item: 'cliente'})}>CLIENTE</MenuItem>|
                  <MenuItem onClick={() => {router.push('/cadastro/produto')}} isActive={isActive({route, item: 'produto'})}>PRODUTO</MenuItem>|
                  <MenuItem onClick={() => {router.push('/cadastro/estante')}} isActive={isActive({route, item: 'estante'})}>ESTANTE</MenuItem>
                </div>
              </nav>
            </Dropdown>
            <MenuItem isActive={isActive({route, item: 'pedido'})}>PEDIDOS</MenuItem>
            <MenuItem isActive={isActive({route, item: 'relatorio'})}>RELATÓRIOS</MenuItem>
            <LogginButton text={userName} />
          </Menu>
        </Content>
      </Container>
    </>
  ) : (
    <>
    </>
  )
}

export default Navbar
