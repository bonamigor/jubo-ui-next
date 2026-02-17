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
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  min-height: 380px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h1 {
    color: var(--gray-800);
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    text-align: center;
  }

  p {
    color: var(--gray-600);
    margin-bottom: 1.5rem;
    text-align: center;
    line-height: 1.5;
  }

  > div:first-of-type {
    width: 100%;
    max-width: 800px;
    margin-bottom: 1rem;
  }

  input[type="text"] {
    padding: 0 1.5rem;
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    background: var(--gray-50);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.2s;

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1);
    }
  }
`

export const Dates = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
  width: 100%;
  max-width: 800px;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    min-width: 200px;
  }

  label {
    color: var(--gray-700);
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
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

export const ButtonArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;

  label {
    color: var(--gray-700);
    font-weight: 500;
    margin-left: 1rem;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  input[type="checkbox"] {
    margin: 0 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--green-500);
  }
`

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  height: 3rem;
  min-width: 150px;
  background: var(--green-500);
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: var(--green-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.3);
  }
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    
    thead {
      background: var(--green-500);
      
      tr {
        th {
          color: white;
          font-weight: 600;
          padding: 1rem;
          text-align: center;
          font-size: 0.95rem;
          border-bottom: 2px solid var(--green-700);
          
          &:first-child {
            border-radius: 0.5rem 0 0 0;
          }
          
          &:last-child {
            border-radius: 0 0.5rem 0 0;
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
          padding: 1rem;
          border: 0;
          background: var(--white);
          color: var(--black);
          text-align: center;
          font-size: 0.95rem;
          border-bottom: 1px solid var(--gray-200);
          
          &:first-child {
            font-weight: 600;
          }
          
          &:last-child {
            font-weight: 600;
            color: var(--green-700);
          }
        }
        
        &:last-child td {
          border-bottom: none;
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
  margin: 3rem 0;
  padding: 3rem;
  background: var(--gray-50);
  border-radius: 0.5rem;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  
  h1 {
    color: var(--gray-600);
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6;
  }
`

export const TotalValue = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--green-500);
  color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
`