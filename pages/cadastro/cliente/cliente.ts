import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
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
`

// Dont mind the name
export const FormItself = styled.form`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2.5rem;
  padding: 0 1rem;

  #name {
    grid-column: 1 / 5;
  }

  #cnpj {
    grid-column: 5 / 6;
  }

  #email {
    grid-column: 1 / 6;
  }

  #address {
    grid-column: 1 / 6;
  }

  #cep {
    grid-column: 1 / 2;
  }

  #city {
    grid-column: 2 / 4;
  }

  #state {
    grid-column: 4 / 6;
  }

  #phone {
    grid-column: 1 / 6;
  }

  #button {
    grid-column: 2 / span 3;
    grid-row: 6;
  }


  input {
    width: 100%;
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
  }
  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
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
  }
`
