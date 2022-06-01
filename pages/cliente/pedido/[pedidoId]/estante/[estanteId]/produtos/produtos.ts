import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  margin-bottom: 2rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 1100px;
  height: 100%;
  padding: 0 5px;
  
  h1 {
    margin-top: 2.5rem;
  }

  h2 {
    font-weight: 400;
  }

`

export const TableBorder = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  margin: 1rem;
  padding-left: 1rem;
  padding-right:  1rem;
  padding-bottom: 1rem;
`

export const PedidoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate
    ? 'none'
    : 'block'};
  width: 150px;
  padding: 0 1rem;
  height: 3rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate
    ? 'block'
    : 'none'};
  width: 200px;
  padding: 0 1rem;
  height: 3rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`

export const PedidoData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  background: var(--gray-300);
  width: 940px;
  border-radius: 10px;
  padding: 1rem;

  h2 {
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 2rem;
  }

  span {
    text-decoration: underline;
    font-weight: 400;
  }
`

export const TableContainer = styled.div`
  margin-top: 4rem 0;
  padding-bottom: 4rem;
  text-align: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    span {
      
      text-align: center;
    }
  }

  h2 {
    font-weight: 400;
    margin-top: 4rem;
  }

  table {
    width: 900px;
    border-spacing: 0 0.5rem;
    margin-bottom: 1rem;
    
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      line-height: 1.5rem;
    }

    thead {
      background: var(--gray-700);
      tr {
        &:first-child {
          color: var(--white);
        }
      }
    }

    tbody {
      tr {
        td {
          background: var(--gray-200);
          font-size: 1rem;
        }
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--black);

      a {
        margin: 0 5px;
      }
    }
  }
`

export const TableTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`

export const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -4rem;
  padding: 1rem 0;
`

export const DecideButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 1rem;
`

export const ConfirmButton = styled.button`
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
`

export const CancelButton = styled.button`
  width: 200px;
  padding: 0 1.5rem;
  height: 4rem;
  margin: 0 1rem;
  background: red;
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`