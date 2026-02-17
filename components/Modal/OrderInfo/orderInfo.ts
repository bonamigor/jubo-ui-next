import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem;
  background: var(--white);
  border-radius: 8px;
  overflow-y: auto; /* Adiciona scroll no container se necessário */
`

export const OrderHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--gray-300);

  h1 {
    color: var(--gray-800);
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    
    p {
      margin: 0;
      color: var(--gray-600);
      font-size: 0.85rem;
      padding: 0.2rem 0.4rem;
      background: var(--gray-100);
      border-radius: 4px;
      
      &:first-child {
        background: var(--blue-100);
        color: var(--blue-700);
        font-weight: 500;
      }
    }
  }
`

interface OrderItemsProps {
  showScrollBar?: boolean;
}

export const OrderItems = styled.div<OrderItemsProps>`
  width: 100%;
  margin: 0.75rem 0;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  flex-shrink: 0; /* Impede que encolha */
  
  overflow-y: ${(props) => props.showScrollBar ? 'auto' : 'visible'};
  max-height: ${(props) => props.showScrollBar ? '300px' : 'none'};

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--gray-100);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-400);
    border-radius: 4px;
    
    &:hover {
      background: var(--gray-500);
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 1rem;
    
    thead {
      position: sticky;
      top: 0;
      z-index: 10;
      
      tr {
        th {
          background: var(--gray-800);
          color: var(--white);
          font-weight: 600;
          padding: 0.75rem 0.5rem;
          text-align: left;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          
          &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            padding-left: 1rem;
          }
          
          &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            padding-right: 1rem;
          }
        }
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: var(--gray-100);
        }
        
        &:nth-child(even) {
          background-color: var(--gray-50);
          
          &:hover {
            background-color: var(--gray-150);
          }
        }
        
        td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid var(--gray-200);
          color: var(--gray-700);
          font-size: 0.9rem;
          white-space: nowrap;
          
          &:first-child {
            font-weight: 500;
            color: var(--gray-800);
            padding-left: 1rem;
          }
          
          &:last-child {
            padding-right: 1rem;
          }
          
          input {
            width: 100px;
            padding: 0.4rem;
            border: 2px solid var(--blue-300);
            border-radius: 4px;
            font-size: 0.9rem;
            transition: border-color 0.2s;
            
            &:focus {
              outline: none;
              border-color: var(--blue-500);
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
          }
        }
      }
    }
  }

  h3 {
    text-align: right;
    margin: 1rem 0 0;
    padding: 0.75rem;
    background: var(--gray-100);
    border-radius: 6px;
    color: var(--gray-800);
    font-size: 1.1rem;
    font-weight: 600;
    border-left: 4px solid var(--green-500);
  }
`

export const Observacao = styled.div`
  width: 100%;
  margin: 1rem 0;
  
  background: var(--blue-50);
  border-radius: 8px;
  border: 1px solid var(--blue-200);
  flex-shrink: 0; /* Impede que encolha */

  textarea {
    width: 1090px !important;
    min-height: 80px !important;
    padding: 0.75rem !important;
    border: 2px solid var(--blue-300) !important;
    border-radius: 6px !important;
    font-size: 0.9rem !important;
    resize: vertical !important;
    transition: all 0.2s !important;
    background: var(--white) !important;
    
    &:focus {
      outline: none !important;
      border-color: var(--blue-500) !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    }
    
    &::placeholder {
      color: var(--gray-500) !important;
    }
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--blue-800);
    font-weight: 600;
    font-size: 0.95rem;
  }
`

export const OrderFooter = styled.div`
  width: 100%;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  flex-shrink: 0; /* Impede que encolha */

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }

  input {
    padding: 0.625rem 0.75rem;
    height: 2.75rem;
    border-radius: 6px;
    border: 2px solid var(--gray-300);
    background: var(--white);
    font-weight: 400;
    font-size: 0.95rem;
    width: 100%;
    max-width: 220px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: var(--blue-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`

export const GeneratePdf = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  button {
    width: 100%;
    max-width: 280px;
    padding: 0.75rem 1.5rem;
    height: 3rem;
    background: linear-gradient(135deg, var(--green-500), var(--green-600));
    color: var(--white);
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.25);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(16, 185, 129, 0.35);
      filter: brightness(1.05);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
`

export const ConfirmSection = styled.div`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, var(--green-50), var(--emerald-50));
  border-radius: 8px;
  border: 1px solid var(--green-200);
  min-width: 300px;

  h2 {
    color: var(--green-800);
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  #dataentrega {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  button {
    padding: 0.75rem 1.5rem;
    height: 3rem;
    background: linear-gradient(135deg, var(--green-500), var(--green-600));
    color: var(--white);
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.25);
    flex: 1;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(16, 185, 129, 0.35);
      filter: brightness(1.05);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
  }

  #empresa {
    margin-top: 0.75rem;
    width: 100%;
    
    select {
      width: 100%;
      padding: 0.625rem 0.75rem;
      height: 2.75rem;
      border-radius: 6px;
      border: 2px solid var(--gray-300);
      background: var(--white);
      font-size: 0.95rem;
      color: var(--gray-700);
      cursor: pointer;
      transition: all 0.2s;
      
      &:focus {
        outline: none;
        border-color: var(--green-500);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
    }
  }
`

export const CancelSection = styled.div`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, var(--red-50), var(--rose-50));
  border-radius: 8px;
  border: 1px solid var(--red-200);
  min-width: 300px;

  h2 {
    color: var(--red-800);
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  button {
    margin-top: 0.75rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    height: 3rem;
    background: linear-gradient(135deg, var(--red-500), var(--red-600));
    color: var(--white);
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.25);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(239, 68, 68, 0.35);
      filter: brightness(1.05);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
  }
`