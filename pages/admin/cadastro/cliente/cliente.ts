import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -7rem auto;
  padding: 0 1rem;
  max-width: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  height: auto;
  padding: 2rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h1 {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    color: var(--gray-700);
    font-size: 2rem;
    text-align: center;
  }
`

export const FormItself = styled.form`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  #name {
    grid-column: 1 / 5;
  }

  #cnpj {
    grid-column: 5 / 6;
    @media (min-width: 768px) {
      grid-column: span 1;
    }
  }

  #email {
    grid-column: 1 / 6;
  }

  #address {
    grid-column: 1 / 6;
  }

  #cep {
    grid-column: 1 / 2;
    @media (min-width: 768px) {
      grid-column: span 1;
    }
  }

  #city {
    grid-column: 2 / 4;
    @media (min-width: 768px) {
      grid-column: span 1;
    }
  }

  #state {
    grid-column: 4 / 6;
    @media (min-width: 768px) {
      grid-column: span 1;
    }
  }

  #phone {
    grid-column: 1 / 6;
  }

  #button {
    grid-column: 2 / span 3;
    grid-row: 6;
    justify-self: center;
    width: 100%;
    max-width: 300px;
    margin-top: 1rem;
  }

  input {
    width: 100%;
    padding: 0 1.25rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: 2px solid #e2e8f0;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
      background: white;
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'block'};
  width: 100%;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-500);
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: var(--green-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'block' : 'none'};
  width: 100%;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--blue-500);
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--blue-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`

export const InputFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
  max-width: 1200px;

  input {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: 2px solid #e2e8f0;
    background: white;
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
  }
`

export const TableContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 600px;
    
    thead {
      background: var(--green-500);
      
      tr {
        th {
          color: white;
          font-weight: 600;
          padding: 1.25rem 1.5rem;
          font-size: 1rem;
          white-space: nowrap;
          text-align: center;
          
          &:first-child {
            text-align: left;
            border-top-left-radius: 0.5rem;
          }
          
          &:last-child {
            border-top-right-radius: 0.5rem;
          }
        }
      }
    }

    tbody {
      tr {
        transition: all 0.2s ease;
        
        &:hover {
          background-color: var(--gray-50);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          background: var(--white);
          color: var(--gray-700);
          font-size: 0.95rem;
          text-align: center;
          
          &:first-child {
            text-align: left;
            font-weight: 500;
            color: var(--gray-800);
          }
          
          &:last-child {
            display: flex;
            gap: 0.5rem;
            padding: 1rem;
          }
        }
        
        &:last-child {
          td {
            &:first-child {
              border-bottom-left-radius: 0.5rem;
            }
            
            &:last-child {
              border-bottom-right-radius: 0.5rem;
            }
          }
        }
      }
    }

    td {
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 0.375rem;
        transition: all 0.2s ease;
        cursor: pointer;
        
        &:first-child {
          background: var(--blue-50);
          
          &:hover {
            background: var(--blue-100);
            transform: scale(1.05);
          }
        }
        
        &:last-child {
          background: var(--red-50);
          
          &:hover {
            background: var(--red-100);
            transform: scale(1.05);
          }
        }
        
        img {
          transition: transform 0.2s ease;
        }
        
        &:hover img {
          transform: scale(1.1);
        }
      }
    }
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--gray-500);
  font-size: 1.1rem;
  
  p {
    margin-top: 1rem;
  }
`