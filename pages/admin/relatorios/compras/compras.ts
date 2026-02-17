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
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;

  h1 {
    color: var(--gray-800);
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  p {
    color: var(--gray-600);
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  input {
    padding: 0 1rem;
    margin: 0.5rem 0;
    height: 3rem;
    width: 200px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 0.9rem;
    }
  }
`

export const Dates = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 1.5rem 0;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    color: var(--gray-700);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
`

export const SearchButton = styled.button`
  width: 200px;
  padding: 0 1.5rem;
  height: 3rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: var(--green-600);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(72, 187, 120, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

export const GeneratePdfButton = styled.button`
  width: 200px;
  padding: 0 1.5rem;
  height: 3rem;
  background: #dc2626;
  color: #FFF;
  border-radius: 8px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #b91c1c;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

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
      background: var(--green-500);
      border-bottom: 2px solid #e2e8f0;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    tbody {
      tr {
        transition: all 0.2s ease;
        
        &:hover {
          background-color: var(--gray-100);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          color: var(--gray-800);
          font-size: 1rem;
          font-weight: 500;
        }

        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
`

export const EmptyTable = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;

  h1 {
    color: var(--gray-600);
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    line-height: 1.6;
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  button {
    margin: 0;
  }
`

// Adicionando um componente para o estado de carregamento
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 100%;
  max-width: 1200px;

  h1 {
    color: var(--green-500);
    font-size: 1.5rem;
    margin-top: 1rem;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`