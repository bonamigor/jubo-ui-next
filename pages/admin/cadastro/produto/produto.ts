import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -7rem auto;
  padding: 0 1rem;
  max-width: 1200px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 1100px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  
  h1 {
    margin: 1rem 0 2rem 0;
    color: var(--gray-700);
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
`

export const FormItself = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 100%;

    #name {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
    }

    #price {
      width: 150px;
      min-width: 150px;
    }

    #unity {
      width: 200px;
      min-width: 200px;
    }
  }

  input {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;
    color: var(--gray-700);

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 100, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
  }

  select {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    color: var(--gray-700);
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1em;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 100, 0.1);
    }

    option {
      color: var(--gray-700);
      padding: 1rem;
    }
  }
  
  button[type="submit"] {
    width: 300px;
    padding: 0 1.5rem;
    height: 3.5rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 8px;
    border: 0;
    font-size: 1.1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover:not(:disabled) {
      background: var(--green-600);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 180, 100, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'block'};
  width: 200px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: var(--green-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 180, 100, 0.3);
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'block' : 'none'};
  width: 200px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--orange-500);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: var(--orange-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
`

export const InputFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 2rem 0;
  width: 100%;
  max-width: 1100px;

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
    color: var(--gray-700);

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 180, 100, 0.1);
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
  max-width: 1100px;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  div {
    margin-top: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: center;
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.25rem 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      background: var(--green-500);
      border-bottom: 2px solid var(--gray-200);
      
      &:first-child {
        border-top-left-radius: 12px;
        padding-left: 2rem;
        text-align: left;
      }
      
      &:last-child {
        border-top-right-radius: 12px;
        padding-right: 2rem;
      }
    }

    thead {
      tr {
        &:first-child {
          color: var(--gray-700);
        }
      }
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
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--gray-100);
          background: var(--white);
          color: var(--gray-700);
          
          &:first-child {
            padding-left: 2rem;
            font-weight: 500;
            text-align: left;
          }
          
          &:last-child {
            padding-right: 2rem;
          }
          
          a {
            margin: 0 5px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            
            &:hover {
              transform: translateY(-2px);
            }
            
            img {
              border-radius: 6px;
              padding: 4px;
              transition: all 0.2s;
              
              &:hover {
                background: var(--gray-100);
              }
            }
          }
        }
        
        &:last-child {
          td {
            border-bottom: none;
            
            &:first-child {
              border-bottom-left-radius: 12px;
            }
            
            &:last-child {
              border-bottom-right-radius: 12px;
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    table {
      th, td {
        padding: 1rem 0.75rem;
        font-size: 0.9rem;
        
        &:first-child {
          padding-left: 1rem;
        }
        
        &:last-child {
          padding-right: 1rem;
        }
      }
    }
  }
`