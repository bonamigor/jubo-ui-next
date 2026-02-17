import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 0 1rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  min-height: 320px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h1 {
    margin: 1rem 0 2rem;
    color: var(--gray-700);
    font-size: 1.8rem;
    text-align: center;
  }
`

export const FormItself = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;

  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    justify-content: center;
  }

  input[list] {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    flex: 1;
    min-width: 300px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
    }
  }

  input, .react-number-format {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    width: 200px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
    }
  }

  .react-number-format {
    display: flex;
    align-items: center;
  }

  button[type="submit"] {
    padding: 0 1.5rem;
    height: 3.5rem;
    background: var(--green-600);
    color: #FFF;
    border-radius: 8px;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s;
    min-width: 180px;
    
    &:hover:not(:disabled) {
      background: var(--green-700);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'block'};
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-700);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  min-width: 180px;
  
  &:hover:not(:disabled)) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'block' : 'none'};
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--blue-700);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  min-width: 180px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
    }
  }
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 1rem 0 2rem;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.2rem 1.5rem;
      background: var(--green-500);
      border-bottom: 2px solid #e2e8f0;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
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
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          background: var(--white);
          color: var(--gray-700);
          font-size: 0.95rem;

          &:first-child {
            font-weight: 500;
          }
          
          &:nth-child(4) {
            font-weight: 600;
          }
        }
      }
    }

    td {
      a {
        margin: 0 0.3rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0.4rem;
        border-radius: 6px;
        transition: all 0.2s;
        
        &:hover {
          background: var(--gray-100);
          transform: translateY(-1px);
        }
        
        img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }
      }
    }
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`