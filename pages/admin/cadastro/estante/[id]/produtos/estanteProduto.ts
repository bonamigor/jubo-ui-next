import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 0 1rem;

  h2 {
    color: var(--gray-700);
    font-size: 1.5rem;
    text-align: center;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  h1 {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    color: var(--gray-800);
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
  }
`

export const FormItself = styled.form`
  display: grid;
  grid-template-columns: 1fr 150px 150px auto auto;
  gap: 1rem;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding: 0;

  input:first-of-type {
    padding: 0 1rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 126, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
    }
  }

  input {
    padding: 0 1rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 126, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 0.95rem;
    }
  }

  select {
    width: 100%;
    padding: 0 1rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 126, 0.1);
    }
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 3.5rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: var(--green-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 180, 126, 0.2);
  }

  &:disabled {
    background: var(--gray-300);
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 3.5rem;
  background: var(--blue-500);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--blue-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
  }
`

export const InputFilter = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0 1.5rem 0;

  input {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 126, 0.1);
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
  margin: 1rem 0 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    
    th {
      background: var(--gray-50);
      color: var(--gray-700);
      font-weight: 600;
      padding: 1.2rem 1.5rem;
      text-align: left;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--gray-200);
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
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid var(--gray-100);
          background: var(--white);
          color: var(--gray-700);
          font-size: 0.95rem;

          &:first-child {
            text-align: left;
          }

          &:nth-child(4),
          &:nth-child(2) {
            color: var(--green-600);
            font-weight: 600;
          }

          &:nth-child(6) {
            font-weight: 600;
          }
        }

        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }

    td {
      a {
        margin: 0 0.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: var(--gray-100);
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          background: var(--green-100);
          transform: scale(1.1);
        }

        img {
          border-radius: 4px;
        }
      }
    }
  }
`