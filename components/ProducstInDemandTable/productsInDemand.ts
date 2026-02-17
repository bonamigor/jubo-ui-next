import styled from "styled-components";

export const TableContainer = styled.div`
  text-align: center;
  overflow-x: auto;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  table {
    width: 100%;
    min-width: 800px;
    border-spacing: 0 0.5rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1rem 1.5rem;
      line-height: 1.5rem;
      text-transform: uppercase;
      font-size: 0.875rem;
      letter-spacing: 0.05em;
    }

    thead {
      background: var(--green-500);
      
      tr {
        th:first-of-type {
          text-align: left;
          padding-left: 2rem;
        }
        
        th:last-of-type {
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s;
        
        &:hover {
          td {
            background: var(--gray-150);
          }
        }
        
        td {
          background: var(--white);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          color: var(--black);
          font-size: 0.9375rem;
        }

        td:first-of-type {
          text-align: left;
          padding-left: 2rem;
          font-weight: 500;
        }

        td:last-of-type {
          white-space: nowrap;
        }
      }
    }

    td {
      a {
        margin: 0 0.5rem;
        cursor: pointer;
        display: inline-block;
        transition: transform 0.2s;
        
        &:hover {
          transform: scale(1.1);
        }
        
        img {
          vertical-align: middle;
        }
      }
    }
  }
`

export const TableTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 0;
  
  h2 {
    color: var(--gray-800);
    font-size: 1.5rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.5rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: var(--green-500);
      border-radius: 2px;
    }
  }
`

export const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--gray-100);
  border-radius: 8px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  
  h4 {
    color: var(--gray-800);
    font-size: 1.5rem;
    font-weight: 600;
    
    span {
      color: var(--green-500);
      font-weight: 700;
      margin-left: 0.5rem;
    }
  }
`

export const DecideButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
  margin-top: 1.5rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const ConfirmButton = styled.button`
  width: 240px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 128, 0, 0.2);
  
  &:hover:not(:disabled) {
    background: var(--green-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 128, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }
`

export const CancelButton = styled.button`
  width: 240px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: #dc3545;
  color: #FFF;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

export const StyledTextarea = styled.div`
  max-width: 1000px;  
  margin-top: 1rem; 
  
  textarea {
    width: 1000px;
    padding: 1rem;
    border: 2px solid var(--gray-200);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    resize: vertical;
    min-height: 100px;
    
    &:focus {
      outline: none;
      border-color: var(--green-500);
    }
    
    &::placeholder {
      color: var(--gray-400);
    }
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: var(--gray-100);
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  
  h1 {
    color: var(--gray-600);
    font-size: 1.25rem;
    font-weight: 400;
  }
`