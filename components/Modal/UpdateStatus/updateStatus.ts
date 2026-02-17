import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 450px;
  padding: 2.5rem 2rem;
  background: var(--background);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  h2 {
    color: var(--text-title);
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    width: 100%;
    border-bottom: 2px solid var(--gray-200);
    padding-bottom: 1rem;
  }

  div {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;

    label {
      font-size: 1.2rem;
      color: var(--text-body);
      line-height: 1.6;
      font-weight: 500;
    }
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.5rem;
    border: 2px solid var(--gray-200);
    background: var(--white);
    font-weight: 400;
    font-size: 1.1rem;
    margin-bottom: 20px;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--green-500);
      outline: none;
    }

    &::placeholder {
      color: var(--gray-300);
      font-size: 1.1rem;
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
  margin-top: 0.5rem;

  button {
    flex: 1;
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: 0;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:first-child {
      background: var(--green-500);
      color: #FFF;
      box-shadow: 0 4px 6px rgba(0, 200, 83, 0.25);

      &:hover {
        background: var(--green-600);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 200, 83, 0.3);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 200, 83, 0.2);
      }
    }

    &:last-child {
      background: var(--red-500);
      color: #FFF;
      box-shadow: 0 4px 6px rgba(244, 67, 54, 0.25);

      &:hover {
        background: var(--red-600);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(244, 67, 54, 0.3);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(244, 67, 54, 0.2);
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;

      &:hover {
        filter: brightness(1);
        transform: none;
      }
    }
  }
`;

// Adicionar estilos globais para o modal (podem ser colocados no arquivo global de estilos)
export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'transparent',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: '1rem',
  },
};