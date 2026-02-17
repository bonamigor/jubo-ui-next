import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  margin-bottom: 2rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  
  h1 {
    margin: 2rem 0 1rem;
    color: var(--gray-800);
    font-size: 2.25rem;
    font-weight: 600;
    text-align: center;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-weight: 400;
    color: var(--gray-600);
    font-size: 1.125rem;
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
    
    h1 {
      font-size: 1.75rem;
      margin-top: 1rem;
    }
    
    h2 {
      font-size: 1rem;
    }
  }
`

export const PedidoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  max-width: 1000px;
  width: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;

  div {
    flex: 1;
    min-width: 300px;
    
    input {
      width: 100%;
      padding: 0 1.5rem;
      height: 3.5rem;
      border-radius: 10px;
      border: 2px solid #e2e8f0;
      background: var(--white);
      font-weight: 400;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

      &:focus {
        outline: none;
        border-color: var(--green-500);
        box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
        background: var(--white);
      }

      &::placeholder {
        color: var(--gray-400);
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }

  input {
    width: 200px;
    padding: 0 1.5rem;
    height: 3.5rem;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    background: var(--white);
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

    &:focus {
      outline: none;
      border-color: var(--green-500);
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 1rem;
      font-weight: 400;
    }
  }

  button {
    flex: 0 0 auto;
    width: 180px;
    padding: 0 1.5rem;
    height: 3.5rem;
    background: linear-gradient(135deg, var(--green-500) 0%, #2ecc71 100%);
    color: #FFF;
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(72, 187, 120, 0.25);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(72, 187, 120, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    
    div, input, button {
      width: 100%;
      min-width: unset;
    }
  }
`

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  padding: 1rem;
` 

export const PedidoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 2rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 1000px;
  width: 100%;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    color: var(--gray-800);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--green-500);
  }

  div {
    display: grid;
    grid-template-columns: 1fr; /* Uma coluna para o nome do colégio ocupar toda a largura */
    gap: 1.5rem;
    width: 100%;
  }

  p:first-of-type {
    display: flex;
    width: 100%;
    
    span {
      font-size: 1rem;
    }
    
    &:not(span) {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-800);
      word-break: break-word;
      white-space: normal;
    }
  }

  .info-grid {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 0.5rem;

    p {
      width: 50%;
    }
  }

  p {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin: 0;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }

  span {
    font-weight: 600;
    color: var(--gray-700);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p:not(span) {
    color: var(--gray-600);
    font-size: 1.125rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    
    .info-grid {
      grid-template-columns: 1fr; /* Em mobile, uma coluna */
      gap: 1rem;
    }
    
    h2 {
      font-size: 1.25rem;
    }
    
    p:first-of-type {
      &:not(span) {
        font-size: 1.125rem;
      }
    }
  }
`

interface FormButtonProps {
  isUpdate?: boolean;
}

export const FormSubmitButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'none' : 'block'};
  width: 180px;
  padding: 0 1rem;
  height: 3.5rem;
  background: linear-gradient(135deg, var(--green-500) 0%, #2ecc71 100%);
  color: #FFF;
  border-radius: 10px;
  border: 0;
  font-size: 1rem;
  margin-top: 0;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(72, 187, 120, 0.25);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(72, 187, 120, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FormButton = styled.button<FormButtonProps>` 
  display: ${(props) => props.isUpdate ? 'block' : 'none'};
  width: 180px;
  padding: 0 1rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: #FFF;
  border-radius: 10px;
  border: 0;
  font-size: 1rem;
  margin-top: 0;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.25);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(52, 152, 219, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const DecideButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

export const ConfirmButton = styled.button`
  width: 200px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, var(--green-500) 0%, #2ecc71 100%);
  color: #FFF;
  border-radius: 10px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(72, 187, 120, 0.25);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(72, 187, 120, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const CancelButton = styled.button`
  width: 200px;
  padding: 0 1.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: #FFF;
  border-radius: 10px;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(231, 76, 60, 0.25);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(231, 76, 60, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`