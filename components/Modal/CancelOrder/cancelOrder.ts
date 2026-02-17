import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.div`
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
  width: 100%;
  max-width: 1000px;
  padding: 2rem;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  textarea {
    width: 100% !important;
    min-width: 300px;
    margin-bottom: 1.5rem;
    resize: vertical;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;

  button {
    flex: 1;
    padding: 0 1.5rem;
    height: 3rem;
    background: var(--green-500);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    transition: filter 0.2s;
    cursor: pointer;

    &:hover {
      filter: brightness(0.9);
    }

    &.no {
      background: var(--red-500, #dc3545);
      
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`