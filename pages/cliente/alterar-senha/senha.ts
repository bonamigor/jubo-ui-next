import styled from "styled-components";

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
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  
  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    color: var(--gray-500);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`

export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 600px;

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 12px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 500;
    font-size: 1rem;
    color: var(--gray-700);
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1);
      outline: none;
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }

    &:hover {
      border-color: var(--gray-400);
    }
  }
`

export const FormButton = styled.button` 
  width: 100%;
  max-width: 600px;
  padding: 0 1.5rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-600) 100%);
  color: #FFF;
  border-radius: 12px;
  border: 0;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 200, 83, 0.3);

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 200, 83, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 200, 83, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`