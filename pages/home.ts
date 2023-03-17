import styled from "styled-components";

export const HomeStyle = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  @media (min-width: 768px) {
    width: 700px;
    height: 600px;
  }

  @media (min-width: 1440px) {
    width: 1220px;
    height: 800px;
  }
  
  width: 1220px;
  height: 800px;
  background: var(--green-500);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`

export const LeftContent = styled.div`
  @media (min-width: 768px) {
    width: 410px;
    height: 600px;
    justify-content: space-evenly;
  }

  @media (min-width: 1024px) {
    width: 610px;
  }

  @media (min-width: 1440px) {
    width: 610px;
    height: 800px;
  }


  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  a {
    color: var(--white);
  }

  h1 {
    color: var(--white);

    @media (min-width: 768px) {
      font-size: 1.5rem;
      font-weight: 400;
    }

    @media (min-width: 1440px) {
      font-size: 3rem;
      font-weight: 500;
      font-family: 'Poppins', sans-serif;
    }
  }

  h2 {
    color: #000000;

    @media (min-width: 768px) {
      font-size: 1.125rem;
      font-weight: 400;
    }

    @media (min-width: 1440px) {
      font-size: 2.25rem;
      font-weight: 300;
      font-family: 'Poppins', sans-serif;
    }
  }

  footer {
    @media (min-width: 768px) {
      font-size: 0.75rem;
    }
    font-size: 1rem;
    color: var(--white);
    /* display: flex;
    flex-direction: column;
    position: fixed;
    top: 85%;
    color: var(--white); */
  }
`

export const Text = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`

export const RightContent = styled.div`
  @media (min-width: 768px) {
    width: 410px;
    height: 600px;
  }

  @media (min-width: 1024px) {
    width: 610px;
    height: 600px;
  }

  @media (min-width: 1440px) {
    width: 610px;
    height: 800px;
  }

  height: 600px;
  background: var(--white);
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 1.5rem;
  }

  h1 {
    color: var(--green-500);
    @media (min-width: 768px) {
      margin-bottom: 3rem;
      font-weight: 300;
    }

    @media (min-width: 1440px) {
      margin-bottom: 2rem;
      font-weight: 400;
    } 
  }

  input {
    @media (min-width: 768px) {
      width: 290px;
      font-weight: 300;
    }

    @media (min-width: 1440px) {
      width: 390px;
      font-weight: 400;
    } 
    width: 390px;
    padding-top: 5px;
    padding-left: 1rem;
    height: 50px;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: var(--gray-100);

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--gray-300);
      font-size: 1.25rem;
      font-weight: 300;
    }
  
    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    @media (min-width: 768px) {
      width: 150px;
    }

    @media (min-width: 1440px) {
      width: 230px;
    }
    width: 230px;
    padding: 0 1.5rem;
    height: 45px;
    background: var(--green-500);
    color: #FFF;
    border-radius: 2rem;
    border: 0;
    font-size: 1.5rem;
    margin-top: 1.5rem;
    font-weight: 400;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
