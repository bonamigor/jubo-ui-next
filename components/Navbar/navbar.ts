import styled from 'styled-components';

export const Container = styled.div`
  background: var(--green-500);
`

export const Content = styled.div`
  max-width: 1220px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  div {
    display: none;
    position: absolute;
    background-color: var(--gray-250);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    padding: 5px 0;
    border-radius: 10px;

    a {
      color: var(--black);

      &:hover {
        color: var(--white);
      }
    }
  }

  &:hover {
    div {
      display: block;
    }
  }
`

interface MenuItemProps {
  isActive?: boolean;
}

export const MenuItem = styled.a<MenuItemProps>`
  color: var(--white);
  text-decoration: ${(props) => props.isActive
    ? 'underline'
    : 'none'
  };
  margin: 0 5px;

  transition: color 0.2s;

  &:hover {
    color: var(--black);
  }
`

export const Logo = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    margin-left: 10px;
    font-size: 2.25rem;
    font-weight: 500;
    color: var(--white)
  }
`
