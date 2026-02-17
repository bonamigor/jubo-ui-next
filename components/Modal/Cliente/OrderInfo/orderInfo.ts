// orderInfo.tsx (styled components)
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto; /* Permite scroll no container quando necessário */
`

export const OrderHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--gray-100);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h1 {
    color: var(--gray-800);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--gray-300);
    padding-bottom: 0.5rem;
  }

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    p {
      margin: 0;
      color: var(--gray-700);
      font-size: 1rem;
      
      &:not(:last-child)::after {
        content: "|";
        margin-left: 0.5rem;
        color: var(--gray-400);
      }
    }
  }
`

interface OrderItemsProps {
  showScrollBar?: boolean;
}

export const OrderItems = styled.div<OrderItemsProps>`
  width: 100%;
  margin-top: 1rem;
  text-align: center;

  h3 {
    text-align: center;
    color: var(--gray-800);
    font-size: 1.25rem;
    margin: 1.5rem 0;
    padding-top: 1rem;
    border-top: 2px solid var(--gray-200);
    position: sticky;
    bottom: 0;
    background: white;
    z-index: 5;
    padding-bottom: 1rem;
  }

  table {
    width: 100%;
    min-width: 800px;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-bottom: 1.5rem;
    
    th {
      color: var(--white);
      font-weight: 500;
      padding: 1rem 1.5rem;
      line-height: 1.5rem;
      text-transform: uppercase;
      font-size: 0.875rem;
      letter-spacing: 0.05em;
    }

    thead {
      background: var(--green-500);
      position: sticky;
      top: 0;
      z-index: 15;
      
      tr {
        th {
          &:first-child {
            border-radius: 8px 0 0 8px;
          }
          
          &:last-child {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }

    tbody {
      tr {
        transition: all 0.2s ease;
        
        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        td {
          background: var(--white);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          
          &:first-child {
            border-radius: 8px 0 0 8px;
          }
          
          &:last-child {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }
  }

  textarea {
    width: 100% !important;
    min-height: 100px !important;
    margin-top: 1.5rem;
    background: var(--gray-100) !important;
    border: 1px solid var(--gray-300) !important;
    border-radius: 8px !important;
    padding: 1rem !important;
    font-size: 0.95rem !important;
    color: var(--gray-800) !important;
    resize: vertical !important;
    position: sticky;
    bottom: 0;
    z-index: 5;
    
    &:focus {
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1) !important;
    }
    
    &[readonly] {
      background: var(--gray-50) !important;
      cursor: default;
      opacity: 0.9;
    }
  }
`