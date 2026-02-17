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
  justify-content: center;
  width: 520px;
  padding: 2.5rem 2rem;
  background: var(--background);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 2px solid var(--gray-200);
    padding-bottom: 1rem;
    width: 100%;
  }

  div {
    width: 100%;
    margin-bottom: 1.5rem;

    label {
      display: block;
      color: var(--text-body);
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  }

  input {
    width: 100%;
    padding: 0 1.25rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    color: var(--text-body);
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--green-500);
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 200, 100, 0.1);
    }

    &::placeholder {
      color: var(--gray-300);
      font-size: 1rem;
      font-weight: 400;
    }

    &:hover {
      border-color: var(--gray-300);
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-top: 0.5rem;

  button {
    flex: 1;
    padding: 0 1.5rem;
    height: 3.25rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--gray-300);
      
      &:hover {
        filter: brightness(1);
      }
    }

    &:not(:disabled):hover {
      filter: brightness(0.95);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 200, 100, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    &.no {
      background: var(--gray-300);
      color: var(--text-body);
      
      &:hover {
        background: var(--gray-400);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;