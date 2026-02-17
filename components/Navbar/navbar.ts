import styled from 'styled-components';

export const Container = styled.div`
  background: var(--green-500);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: 0;
  z-index: 1000;
`

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`

interface MenuItemProps {
  isActive?: boolean;
}

export const MenuItem = styled.a<MenuItemProps>`
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  
  background: ${(props) => props.isActive
    ? 'rgba(255, 255, 255, 0.15)'
    : 'transparent'
  };
  
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => props.isActive ? '80%' : '0'};
    height: 2px;
    background: var(--white);
    border-radius: 1px;
    transition: width 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--white);
    
    &::after {
      width: 80%;
    }
  }
`

export const DropdownMenuItem = styled.a<MenuItemProps>`
  color: ${(props) => props.isActive ? 'var(--green-600)' : 'var(--gray-700)'};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  width: 100%;
  display: block;
  transition: all 0.2s ease;
  border-radius: 4px;
  background: ${(props) => props.isActive
    ? 'rgba(34, 197, 94, 0.1)'
    : 'transparent'
  };

  &:hover {
    background: rgba(34, 197, 94, 0.15);
    color: var(--green-600);
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  img {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--white);
    letter-spacing: -0.5px;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    
    @media (max-width: 640px) {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    
    img {
      width: 40px;
      height: 32px;
    }
  }
`