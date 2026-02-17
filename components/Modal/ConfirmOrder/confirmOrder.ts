import styled from 'styled-components';

export const Container = styled.div`  /* Alterado de form para div */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  min-height: 250px;  /* Alterado de height fixa para min-height */
  background: var(--background);  /* Adicionado fundo */
  border-radius: 0.5rem;  /* Adicionado borda arredondada */
  padding: 2rem;  /* Adicionado padding */

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;  /* Reduzido de 2rem */
    text-align: center;
    border-bottom: 1px solid var(--gray-300);  /* Adicionado linha separadora */
    padding-bottom: 1rem;
    width: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;  /* Adicionado margem */
  }

  label {
    font-size: 1.2rem;
    color: var(--text-body);
    text-align: center;
    line-height: 1.6;  /* Adicionado espaçamento entre linhas */
  }

  /* Removidos estilos de input que não estão sendo usados neste modal */
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;  /* Garante que o container ocupe toda largura */
  gap: 1rem;  /* Adicionado gap ao invés de margin nos botões */
  margin-top: 1rem;  /* Adicionado espaçamento superior */

  button {
    flex: 1;  /* Faz os botões terem tamanhos iguais */
    max-width: 150px;  /* Limita a largura máxima */
    padding: 0 1.5rem;
    height: 3rem;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;  /* Garante cursor pointer */
    transition: all 0.2s;  /* Muda de filter para all para transições mais suaves */

    /* Estilo específico para o botão "Sim" */
    &:first-child {
      background: var(--green-500);
      color: #FFF;
      
      &:hover {
        background: var(--green-700);  /* Tom mais escuro do verde */
      }
    }

    /* Estilo específico para o botão "Não" */
    &:last-child {
      background: var(--gray-300);  /* Cor de fundo cinza */
      color: var(--text-title);
      
      &:hover {
        background: var(--gray-400);  /* Tom mais escuro do cinza */
      }
    }

    &:hover {
      filter: brightness(0.9);
      transform: translateY(-1px);  /* Leve elevação ao passar o mouse */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Sombra suave ao hover */
    }

    &:active {
      transform: translateY(0);  /* Volta ao lugar ao clicar */
      filter: brightness(0.8);
    }
  }
`