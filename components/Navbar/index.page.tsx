import logoImg from '../../assets/logo.png' 
import Image from 'next/image';

import { NextPage } from "next";
import { Container, Content, DropdownMenuItem, Logo, Menu, MenuItem } from './navbar';
import LogginButton from '../LoginButton/index.page';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { pedidoService } from '../../services';
import { usePedido } from '../../hooks/usePedido';
import { Dropdown } from '@nextui-org/react';
import Link from 'next/link';

interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar: NextPage<NavbarProps> = ({ isUserLoggedIn }) => {
  const { user, logoutUser } = useUser()
  const { receivePedido } = usePedido()

  const router = useRouter()
  const route = router.pathname
  
  const userName = user.id === 0 ? 'Usuário | Sair' : `${user.name} | Sair`
  const isAdmin = user.admin ? true : false
  
  const isActive = ({route, item}: {route: string, item: string}) => {
    return route.includes(item)
  }

  const criarPedido = async () => {
    const clienteId: number = Number(window.sessionStorage.getItem('userClientId'))

    try {
      const { data, errors } = await pedidoService.criarPedido(clienteId)

      if (!errors) {
        receivePedido({ id: Number(data.pedido.pedidoId), status: String(data.pedido.status), dataCriacao: String(data.pedido.dataCriacao), clienteId: Number(data.pedido.clienteId) })
        router.push(`/cliente/pedido/${data.pedido.pedidoId}/estante`)
      }
    } catch (error) {
      
    }
  }

  return isUserLoggedIn ? (
    <>
      <Container>
        <Content>
          <Logo>
            <Image src={logoImg} alt="Jubo" width={50} height={40}/>
            <h1>Jubo</h1>
          </Logo>
          {isAdmin ? (
            <Menu>
              <Link href="/dashboard" passHref>
                <MenuItem isActive={isActive({route, item: 'dashboard'})}>DASHBOARD</MenuItem>
              </Link>
              <Dropdown>
                <Dropdown.Trigger>
                  <MenuItem isActive={isActive({route, item: 'cadastro'})}>CADASTROS</MenuItem>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link href="/cadastro/usuario" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'usuario'})}>USUÁRIO</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/cadastro/cliente" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'cliente'})}>CLIENTE</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/cadastro/produto" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'produto'})}>PRODUTO</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/cadastro/estante" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'estante'})}>ESTANTE</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Trigger>
                  <MenuItem isActive={isActive({route, item: 'relatorio'})}>RELATÓRIOS</MenuItem>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link href="/relatorios/pedidos" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'pedidos'})}>PEDIDOS</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/relatorios/compras" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'compras'})}>COMPRAS</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/relatorios/vendas" passHref>
                      <DropdownMenuItem isActive={isActive({route, item: 'vendas'})}>VENDAS</DropdownMenuItem>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <LogginButton text={userName} />
            </Menu>
          ) : (
            <Menu>
              <Link href="/cliente/inicial" passHref>
                <MenuItem isActive={isActive({route, item: 'cliente/inicial'})}>INÍCIO</MenuItem>
              </Link>
              <MenuItem onClick={() => {criarPedido()}} isActive={isActive({route, item: 'estante'})}>REALIZAR PEDIDO</MenuItem>
              <Link href="/cliente/pedidos" passHref>
                <MenuItem isActive={isActive({route, item: 'cliente/pedidos'})}>PEDIDOS</MenuItem>
              </Link>
              <LogginButton text={userName} />
            </Menu>
          )}
        </Content>
      </Container>
    </>
  ) : (
    <>
    </>
  )
}

export default Navbar
