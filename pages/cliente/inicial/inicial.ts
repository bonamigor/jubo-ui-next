import styled from 'styled-components';

export const Observacao = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: transparent;
  margin: -10rem auto 0;
  border-radius: 8px;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    h1 {
      font-size: 1rem;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  max-width: 1100px;
  min-height: 320px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-300);
  
  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    color: var(--gray-600);
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 0.9rem;
      padding: 0 1rem;
    }
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  text-align: center;
  overflow-x: auto;

  h2 {
    color: var(--gray-600);
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.6;
    padding: 3rem 1rem;
    text-align: center;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.25rem 1.5rem;
      text-align: center;
      background: var(--green-500);
      font-size: 1rem;
      white-space: nowrap;
      
      &:first-child {
        border-radius: 12px 0 0 0;
      }
      
      &:last-child {
        border-radius: 0 12px 0 0;
      }
    }

    tbody {
      tr {
        transition: all 0.2s ease;
        
        &:hover {
          background-color: var(--gray-200);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        td {
          font-size: 1rem;
          color: var(--gray-800);
          padding: 1.25rem 1.5rem;
          border-bottom: 2px solid var(--black);
          background: var(--gray-50);
          font-weight: 500;

          &:first-child {
            border-left: 1px solid var(--black);
          }
          
          &:last-child {
            border-right: 1px solid var(--black);
          }

          a {
            margin: 0 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
            
            &:hover {
              transform: scale(1.1);
            }
            
            img {
              filter: brightness(0.95);
              transition: filter 0.2s ease;
              
              &:hover {
                filter: brightness(1);
              }
            }
          }
        }
        
        &:last-child {
          td {
            border-bottom: 1px solid var(--black);
            
            &:first-child {
              border-radius: 0 0 0 12px;
            }
            
            &:last-child {
              border-radius: 0 0 12px 0;
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
      }
      
      th {
        font-size: 0.85rem;
      }
    }
    
    h2 {
      font-size: 1.1rem;
      padding: 2rem 0.5rem;
    }
  }

  @media (max-width: 480px) {
    table {
      th, td {
        padding: 0.75rem 0.5rem;
        font-size: 0.85rem;
      }
    }
    
    h2 {
      font-size: 1rem;
    }
  }
`;