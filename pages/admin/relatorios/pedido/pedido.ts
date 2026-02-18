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
  border-radius: 12px;
  width: 100%;
  max-width: 1500px;
  height: 270px;
  padding: 0 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  header {
    text-align: center;
    margin-bottom: 2rem;
    width: 100%;
  }

  header h1 {
    margin-top: 2.5rem;
    color: var(--gray-700);
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  header p {
    color: var(--gray-500);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
  }

  section {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    width: 100%;
    max-width: 600px;

    input {
      flex: 1;
      min-width: 300px;
      padding: 0 1.5rem;
      height: 3.8rem;
      border-radius: 8px;
      border: 2px solid var(--gray-200);
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
  }

  button {
    width: 180px;
    padding: 0 2rem;
    height: 3.8rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 8px;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      background: var(--green-600);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 200, 83, 0.2);
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
  background: transparent;
  border-radius: 12px;
  width: 100%;
  max-width: 1500px;
  height: 300px;
  padding: 3rem;
  margin-top: 2rem;
  
  h1 {
    color: var(--gray-400);
    font-size: 1.8rem;
    text-align: center;
    font-weight: 500;
    background: var(--gray-50);
    padding: 2rem 4rem;
    border-radius: 12px;
    border: 2px dashed var(--gray-200);
  }
`

export const LoadingOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  margin-top: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 1500px;
  height: 300px;
  padding: 0 5px;
  
  .nextui-loading {
    span {
      color: var(--green-500);
    }
  }
`

export const TableContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: var(--white);

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    text-align: center;
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.2rem 1.5rem;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--green-500);
      border-bottom: 2px solid var(--gray-200);
    }

    thead {
      tr {
        &:first-child {
          color: var(--gray-700);
          background: var(--gray-50);
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
          font-size: 0.9rem;
          padding: 1.2rem 1.5rem;
          border: 0;
          background: var(--white);
          color: var(--gray-800);
          border-bottom: 1px solid var(--gray-100);
          white-space: nowrap;

          &:first-child {
            font-weight: 600;
          }
          
          &:nth-child(4) {
            font-weight: 600;
            
            /* Status colors */
            ${props => {
              const statusColors = {
                'CANCELADO': 'var(--red-500)',
                'CONFIRMADO': 'var(--green-500)',
                'PENDENTE': 'var(--yellow-500)'
              };
              
              let styles = '';
              Object.entries(statusColors).forEach(([status, color]) => {
                styles += `
                  &.status-${status.toLowerCase()} {
                    color: ${color};
                  }
                `;
              });
              return styles;
            }}
          }

          a {
            margin: 0 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
            
            &:hover {
              transform: scale(1.1);
              opacity: 0.8;
            }
            
            img {
              object-fit: contain;
            }
          }
        }

        td:first-child {
          border-radius: 0;
          padding-left: 2rem;
        }

        td:last-child {
          border-radius: 0;
          padding-right: 2rem;
        }
      }
      
      tr:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
`

/* Responsive adjustments */
export const ResponsiveWrapper = styled.div`
  @media (max-width: 1350px) {
    ${Content}, ${TableContainer}, ${Orderless}, ${LoadingOrders} {
      max-width: 95%;
      margin-left: auto;
      margin-right: auto;
    }
    
    ${Content} {
      height: auto;
      padding: 2rem 1.5rem;
      
      section {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        
        input {
          min-width: 100%;
          width: 100%;
        }
        
        button {
          width: 100%;
          max-width: 300px;
        }
      }
    }
    
    ${TableContainer} {
      overflow-x: auto;
      
      table {
        min-width: 1200px;
        
        th, td {
          padding: 1rem 1rem;
          font-size: 0.85rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    ${Container} {
      margin-top: -4rem;
      padding: 1rem;
    }
    
    ${Content} {
      header h1 {
        font-size: 1.8rem;
        margin-top: 1.5rem;
      }
      
      header p {
        font-size: 1rem;
        padding: 0 1rem;
      }
    }
    
    ${Orderless} {
      h1 {
        font-size: 1.4rem;
        padding: 1.5rem 2rem;
      }
    }
  }
`