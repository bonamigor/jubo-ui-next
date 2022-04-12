import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 1100px;
  height: 700px;
  padding: 0 5px;
  
  h1 {
    margin-top: 2.5rem;
  }

  h2 {
    font-weight: 400;
  }
`

export const PedidoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
` 

export const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  width: 600px;

  div {
    input {
      width: 400px;
      padding: 0 1.5rem;
      height: 4rem;
      border-radius: 0.25rem;
      border: 1px solid #d7d7d7;
      background: var(--gray-100);
      font-weight: 400;
      font-size: 1rem;

      &::placeholder {
        color: var(--gray-300);
        font-size: 1.5rem;
        font-weight: 400;
      }
      & + input {
        margin: 0 1rem;
      }
    }
  }

  input {
    width: 300px;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: var(--gray-100);
    font-weight: 400;
    font-size: 1rem;
    margin-left: 15px;
    &::placeholder {
      color: var(--gray-300);
      font-size: 1.5rem;
      font-weight: 400;
    }
    & + input {
      margin-top: 1rem;
    }
  }

  button {
      width: 200px;
      padding: 0 1.5rem;
      height: 4rem;
      margin: 0 1rem;
      background: var(--green-500);
      color: #FFF;
      border-radius: 0.25rem;
      border: 0;
      font-size: 1rem;
      font-weight: 600;
      transition: filter 0.2s;
      &:hover {
        filter: brightness(0.9);
      }
    }
`

export const PedidoData = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
`

export const TableContainer = styled.div`
  margin: 10px 0;

  table {
    width: 1100px;
    border-spacing: 0 0.5rem;
    text-align: left;
    margin-bottom: 1rem;
    
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
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
        td {
          font-size: 1rem;

          &:first-child {
            text-align: left;
          }
        }
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--black);
      border-radius: 0.25rem;

      a {
        margin: 0 5px;
      }
    }
  }
`
