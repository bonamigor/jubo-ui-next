import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 2rem;
  min-height: 100vh;

  h1 {
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.5rem;
    border: 1px solid #d7d7d7;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;
    
    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
    
    & + input {
      margin-top: 1rem;
    }
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 2px rgba(0, 200, 83, 0.1);
    }
  }

  select {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.5rem;
    border: 1px solid #d7d7d7;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 2px rgba(0, 200, 83, 0.1);
    }
    
    option {
      padding: 1rem;
      font-size: 1rem;
    }
  }
`

export const Forms = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`

export const User = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--white);
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--gray-200);
  text-align: center;
  
  h1 {
    width: 100%;
    margin: 0 0 2rem 0;
  }
`

export const Admin = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--white);
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--gray-200);
  text-align: center;
  
  h1 {
    width: 100%;
    margin: 0 0 2rem 0;
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'flex'};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: var(--green-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 200, 83, 0.2);
  }
  
  &:disabled {
    background: var(--gray-300);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:hover {
      background: var(--gray-300);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'flex' : 'none'};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--blue-500);
  color: #FFF;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: var(--blue-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`

export const InputFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
  max-width: 1200px;

  input {
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.5rem;
    border: 1px solid #d7d7d7;
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s;

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 4px 16px rgba(0, 200, 83, 0.1);
    }
  }
`

export const TableContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-spacing: 0;
    text-align: left;
    background: var(--white);
    border-radius: 0.75rem;
    overflow: hidden;
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.25rem 2rem;
      text-align: left;
      line-height: 1.5rem;
      background: var(--green-500);
      border-bottom: 2px solid var(--gray-200);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    tbody {
      tr {
        transition: all 0.2s;
        
        &:hover {
          background: var(--gray-50);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        
        td {
          font-size: 1rem;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--gray-100);
          
          &:first-child {
            font-weight: 500;
            color: var(--gray-800);
          }
        }
      }
      
      tr:last-child td {
        border-bottom: none;
      }
    }

    td {
      padding: 1.25rem 2rem;
      background: var(--white);
      color: var(--gray-700);
      
      a {
        margin: 0 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s;
        
        &:hover {
          transform: scale(1.1);
        }
        
        &:first-child:hover {
          filter: brightness(0.9);
        }
        
        &:last-child:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`

// Adicionando estilos para o datalist
export const DataList = styled.datalist`
  position: absolute;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  padding: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  
  option {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover {
      background: var(--gray-100);
    }
  }
`