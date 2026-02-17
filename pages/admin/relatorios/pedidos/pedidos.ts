import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 2rem 1rem;

  div #loading {
    margin-top: 2rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 1300px;
  height: auto;
  min-height: 270px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  header {
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;

    h1 {
      color: var(--gray-700);
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--gray-500);
      font-size: 1rem;
    }
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
      padding: 0 1.5rem;
      height: 3.5rem;
      border-radius: 8px;
      border: 2px solid var(--gray-200);
      background: var(--white);
      font-weight: 400;
      font-size: 1rem;
      transition: border-color 0.2s;
      
      &:focus {
        outline: none;
        border-color: var(--green-500);
        box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1);
      }
      
      &::placeholder {
        color: var(--gray-400);
        font-size: 1rem;
        font-weight: 400;
      }
      
      &:disabled {
        background: var(--gray-100);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
    
    datalist {
      font-size: 1rem;
    }
  }

  button {
    width: 200px;
    height: 3.5rem;
    padding: 0 1.5rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 8px;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: var(--green-600);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 200, 83, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`

export const Orderless = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 1300px;
  height: 300px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

  h1 {
    color: var(--gray-500);
    font-size: 1.5rem;
    text-align: center;
  }
`

export const LoadingOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 1300px;
  height: 300px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  overflow-x: auto;
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: var(--white);

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 1200px;
    text-align: center;
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.25rem 1.5rem;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--green-500);
      border-bottom: 2px solid var(--gray-200);
      
      &:first-child {
        border-radius: 8px 0 0 0;
      }
      
      &:last-child {
        border-radius: 0 8px 0 0;
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
          font-size: 0.9rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--gray-100);
          color: var(--gray-700);
          
          a {
            margin: 0 0.25rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
            
            &:hover {
              transform: scale(1.1);
            }
            
            img {
              transition: filter 0.2s;
              
              &:hover {
                filter: brightness(0.8);
              }
            }
          }
        }
        
        &:last-child {
          td {
            border-bottom: none;
          }
          
          td:first-child {
            border-radius: 0 0 0 8px;
          }
          
          td:last-child {
            border-radius: 0 0 8px 0;
          }
        }
      }
    }
    
    /* Status color coding */
    td:nth-child(4) {
      font-weight: 600;
      
      &:contains('CONFIRMADO') {
        color: var(--green-500);
      }
      
      &:contains('CANCELADO') {
        color: var(--red-500);
      }
      
      &:contains('PENDENTE') {
        color: var(--orange-500);
      }
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    padding: 0.5rem;
    
    table {
      th, td {
        padding: 0.75rem 1rem;
      }
    }
  }
`