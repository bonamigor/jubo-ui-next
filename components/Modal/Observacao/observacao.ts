import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 950px;
  max-width: 95vw;
  min-height: 400px;
  background: var(--background);
  border-radius: 0.5rem;
  padding: 2rem;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
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
    margin-bottom: 20px;

    &::placeholder {
      color: var(--gray-300);
      font-size: 1.5rem;
      font-weight: 400;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;

  button {
    flex: 1;
    max-width: 200px;
    padding: 0 1.5rem;
    height: 3rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.2s, transform 0.1s;

    &.no {
      background: var(--gray-300);
      color: var(--text-title);
      
      &:hover {
        filter: brightness(0.95);
      }
    }

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

export const ObservacaoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;
`;