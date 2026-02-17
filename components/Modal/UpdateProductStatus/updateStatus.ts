import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background);
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
  }

  > div {
    margin: 1.5rem 0;
    text-align: center;
  }

  label {
    font-size: 1.1rem;
    color: var(--text-body);
    line-height: 1.5;
    
    strong {
      color: var(--text-title);
      font-weight: 600;
      background: var(--gray-100);
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
      margin-left: 0.3rem;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;

  button {
    flex: 1;
    padding: 0 1.5rem;
    height: 3rem;
    border-radius: 0.5rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:first-child {
      background: var(--green-500);
      color: #FFF;
      
      &:hover {
        background: var(--green-800);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 200, 0, 0.2);
      }
    }

    &:last-child {
      background: var(--red-500);
      color: #FFF;
      
      &:hover {
        background: var(--red-800);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }
`;