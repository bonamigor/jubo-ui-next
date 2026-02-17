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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const Box = styled.div`
  width: 1220px;
  height: 800px;
  background: var(--green-500);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  @media (max-width: 1240px) {
    width: 95%;
    max-width: 1220px;
  }
  
  @media (max-width: 1024px) {
    height: auto;
    min-height: 600px;
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    height: auto;
  }
`

export const LeftContent = styled.div`
  width: 610px;
  height: 800px;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 4rem 3rem;
  position: relative;
  background: linear-gradient(135deg, var(--green-500) 0%, #2a9d8f 100%);
  
  @media (max-width: 1024px) {
    width: 100%;
    height: 400px;
    border-radius: 20px 20px 0 0;
    padding: 2rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    padding: 1.5rem 1rem;
    border-radius: 16px 16px 0 0;
  }

  a {
    color: var(--white);
    text-decoration: none;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.9;
      text-decoration: underline;
    }
  }

  h1 {
    color: var(--white);
    font-size: 3rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.75rem;
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.9);
    font-size: 2.25rem;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    margin-top: 2rem;
    letter-spacing: -0.5px;
    
    @media (max-width: 1024px) {
      font-size: 1.75rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-top: 1rem;
    }
  }

  footer {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.85);
    width: 100%;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: auto;
    
    p {
      margin: 0.25rem 0;
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding-top: 1.5rem;
    }
  }
`

export const RightContent = styled.div`
  width: 610px;
  height: 800px;
  background: var(--white);
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 3rem;
  
  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    border-radius: 0 0 20px 20px;
    padding: 3rem 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 0 0 16px 16px;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;

  div {
    margin-top: 1.5rem;
  }

  h1 {
    color: var(--green-500);
    margin-bottom: 3rem;
    font-weight: 600;
    font-size: 2.5rem;
    font-family: 'Poppins', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 60px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    background: var(--white);
    font-weight: 400;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    color: #333;

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
      font-size: 1.1rem;
      font-weight: 400;
    }
  
    & + input {
      margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
      height: 56px;
      font-size: 1rem;
      border-radius: 10px;
      
      &::placeholder {
        font-size: 1rem;
      }
    }
  }

  button[type="submit"] {
    width: 100%;
    max-width: 250px;
    padding: 0 1.5rem;
    height: 55px;
    background: var(--green-500);
    color: #FFF;
    border-radius: 12px;
    border: 0;
    font-size: 1.25rem;
    margin-top: 2rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.25);

    &:hover {
      background: #2a9d8f;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(72, 187, 120, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    @media (max-width: 768px) {
      height: 52px;
      font-size: 1.1rem;
      max-width: 100%;
      margin-top: 1.75rem;
    }
  }
`