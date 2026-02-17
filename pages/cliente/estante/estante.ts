import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 0.5rem;
    color: var(--gray-700);
    font-size: 1.8rem;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  h2 {
    font-weight: 400;
    color: var(--gray-500);
    font-size: 1.1rem;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`

export const InputFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 1.5rem;

  input {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 120, 0.1);
    }

    &:hover {
      border-color: var(--gray-300);
    }
  }
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  table {
    width: 100%;
    border-spacing: 0;
    text-align: left;
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    
    thead {
      background: var(--green-500);
      
      tr {
        th {
          color: var(--white);
          font-weight: 600;
          padding: 1.2rem 1.5rem;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          
          &:first-child {
            width: 80px;
          }
          
          &:last-child {
            width: 100px;
            text-align: center;
          }
        }
      }
    }

    tbody {
      tr {
        transition: all 0.3s ease;
        border-bottom: 1px solid var(--gray-100);
        
        &:hover {
          background-color: var(--gray-50);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        td {
          padding: 1.2rem 1.5rem;
          color: var(--gray-700);
          font-size: 0.95rem;
          border-bottom: 1px solid var(--gray-100);
          
          &:first-child {
            font-weight: 600;
            color: var(--green-600);
          }
          
          &:nth-child(4) {
            max-width: 300px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          &:last-child {
            text-align: center;
            padding: 0.5rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    
    table {
      thead {
        display: none;
      }
      
      tbody {
        tr {
          display: block;
          margin-bottom: 1rem;
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          padding: 1rem;
          
          td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border: none;
            
            &:before {
              content: attr(data-label);
              font-weight: 600;
              color: var(--gray-600);
              font-size: 0.9rem;
              margin-right: 1rem;
            }
            
            &:first-child {
              font-weight: 600;
              color: var(--green-600);
            }
            
            &:last-child {
              justify-content: center;
              padding-top: 1rem;
              border-top: 1px solid var(--gray-100);
            }
          }
        }
      }
    }
  }
`

// Adicionar ao final do arquivo da tela web, antes do export
export const TableRow = styled.tr`
  cursor: pointer;
  
  a {
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    img {
      filter: brightness(1);
      transition: filter 0.3s ease;
      
      &:hover {
        filter: brightness(1.2);
      }
    }
  }
`

// Ajuste no JSX da tabela para usar o componente TableRow:
// Substituir <tr key={estante.id}> por <TableRow key={estante.id}>