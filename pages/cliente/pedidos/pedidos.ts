import styled from "styled-components";

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
  align-items: flex-start;
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  height: auto;
  min-height: 170px;
  padding: 2rem 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  h1 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--gray-800);
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0.25rem 0;
    color: var(--gray-600);
    font-size: 1rem;
    line-height: 1.5;

    &:first-of-type {
      font-weight: 500;
    }
  }
`

export const InputFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  width: 100%;
  max-width: 1200px;

  input {
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 8px;
    border: 1.5px solid #e5e7eb;
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
    max-width: 1100px;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--gray-400);
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
  }
`

export const TableContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-spacing: 0;
    margin-bottom: 1rem;
    text-align: center;
    background: var(--white);
    
    th {
      color: var(--white);
      font-weight: 600;
      padding: 1.25rem 1rem;
      line-height: 1.5rem;
      background: var(--green-500);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid var(--gray-200);
      
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
        cursor: pointer;
        
        &:hover {
          background-color: var(--gray-100);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid var(--gray-100);
          color: var(--gray-800);
          font-size: 0.95rem;

          &:first-child {
            font-weight: 600;
            color: var(--gray-900);
          }

          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0 4px;
            transition: transform 0.2s ease;

            &:hover {
              transform: scale(1.1);
            }

            img {
              cursor: pointer;
            }
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
      background: transparent;
      color: var(--black);
    }
  }

  @media (max-width: 768px) {
    table {
      th, td {
        padding: 1rem 0.75rem;
        font-size: 0.85rem;
      }
    }
  }
`

export const StatusBadge = styled.span<{ status: string; isFinalizado: number }>`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  
  ${({ status, isFinalizado }) => {
    if (isFinalizado === 1) {
      return `
        background: rgba(16, 185, 129, 0.1);
        color: rgb(16, 185, 129);
        border: 1px solid rgba(16, 185, 129, 0.2);
      `;
    }
    
    switch(status) {
      case 'CRIADO':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: rgb(59, 130, 246);
          border: 1px solid rgba(59, 130, 246, 0.2);
        `;
      case 'PROCESSANDO':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: rgb(245, 158, 11);
          border: 1px solid rgba(245, 158, 11, 0.2);
        `;
      case 'ENTREGUE':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: rgb(16, 185, 129);
          border: 1px solid rgba(16, 185, 129, 0.2);
        `;
      case 'CANCELADO':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: rgb(239, 68, 68);
          border: 1px solid rgba(239, 68, 68, 0.2);
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.1);
          color: rgb(107, 114, 128);
          border: 1px solid rgba(107, 114, 128, 0.2);
        `;
    }
  }}
`

export const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: transparent;

  &:hover {
    background: var(--gray-100);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  text-align: center;

  p {
    color: var(--gray-500);
    font-size: 1.1rem;
    margin: 1rem 0 0;
  }
`