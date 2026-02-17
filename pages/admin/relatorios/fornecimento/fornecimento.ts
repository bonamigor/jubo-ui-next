import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 2rem 1rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h1 {
    color: var(--gray-800);
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }

  p {
    color: var(--gray-600);
    margin-bottom: 2rem;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.6;
  }

  input[type="text"] {
    padding: 0 1rem;
    margin: 0 1rem;
    height: 3rem;
    border-radius: 8px;
    border: 2px solid #e1e5e9;
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
    }
  }

  label {
    color: var(--gray-700);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
`

export const Dates = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    
    &:last-child {
      align-self: flex-end;
    }
  }

  input {
    padding: 0 1rem;
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    background: var(--gray-50);
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1);
    }
  }
`

export const SearchButton = styled.button`
  display: block;
  width: 100%;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-500);
  color: var(--white);
  border-radius: 10px;
  border: 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 125, 50, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(46, 125, 50, 0.3);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`

export const GeneratePdfButton = styled.button`
  display: block;
  width: 100%;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-500);
  color: var(--white);
  border-radius: 10px;
  border: 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(33, 150, 243, 0.3);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background: var(--white);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 2rem;
    
    thead {
      background: var(--green-500);
      
      tr {
        th {
          color: var(--white);
          font-weight: 600;
          padding: 1.2rem 1.5rem;
          text-align: center;
          font-size: 1rem;
          border-bottom: 2px solid var(--gray-700);
          
          &:first-child {
            border-radius: 10px 0 0 0;
          }
          
          &:last-child {
            border-radius: 0 10px 0 0;
          }
        }
      }
    }

    tbody {
      tr {
        transition: all 0.3s ease;
        
        &:hover {
          background-color: rgba(46, 125, 50, 0.05);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        td {
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          color: var(--gray-800);
          font-size: 1rem;
          text-align: center;
          font-weight: 500;
          
          &:first-child {
            border-left: 1px solid var(--gray-200);
          }
          
          &:last-child {
            border-right: 1px solid var(--gray-200);
            font-weight: 600;
            color: var(--green-600);
          }
        }
        
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }

  h1 {
    text-align: center;
    color: var(--gray-800);
    font-size: 1.5rem;
    font-weight: 600;
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--green-50) 0%, var(--green-100) 100%);
    border-radius: 10px;
    margin: 0;
    border: 2px solid var(--green-200);
  }
`

export const EmptyTable = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  width: 100%;
  max-width: 1200px;
  background: var(--white);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    color: var(--gray-600);
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  button {
    margin: 0;
  }

  label[for="isAnalitico"] {
    margin: 0;
    padding: 0.5rem 1rem;
    background: var(--gray-100);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    
    &:hover {
      background: var(--gray-200);
    }
  }

  input[type="checkbox"] {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    cursor: pointer;
    
    &:checked {
      accent-color: var(--green-500);
    }
  }
`

// Adicionando um loader estilizado
export const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  h1 {
    color: var(--gray-700);
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`