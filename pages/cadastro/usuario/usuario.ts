import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;

  h1 {
    font-weight: 500;
  }

  input {
    width: 80%;
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
      margin-top: 1rem;
    }
  }
  button[type="submit"] {
    width: 80%;
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

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: var(--white);
  width: 500px;
  height: 600px;
  border-radius: 10px;
  margin: 0 2rem;
  text-align: center;
`

export const Admin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: var(--white);
  width: 500px;
  height: 600px;
  border-radius: 10px;
  margin: 0 2rem;
  text-align: center;
`
