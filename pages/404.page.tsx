// pages/404.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const PageNotFoundStyle = styled.div`
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

const Box = styled.div`
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

const LeftContent = styled.div`
  width: 610px;
  height: 800px;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    height: 300px;
    padding: 1.5rem 1rem;
    border-radius: 16px 16px 0 0;
  }

  h1 {
    color: var(--white);
    font-size: 8rem;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 1024px) {
      font-size: 6rem;
    }
    
    @media (max-width: 768px) {
      font-size: 4rem;
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.95);
    font-size: 2.5rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    margin-top: 1rem;
    letter-spacing: -0.5px;
    
    @media (max-width: 1024px) {
      font-size: 2rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const RightContent = styled.div`
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

  h3 {
    color: var(--green-500);
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    font-family: 'Poppins', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: #4a5568;
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 500px;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .timer-text {
    color: #e53e3e;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: rgba(229, 62, 62, 0.1);
    border-radius: 12px;
    border: 2px solid rgba(229, 62, 62, 0.2);
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
      padding: 0.75rem 1.5rem;
    }
  }

  .redirect-button {
    margin-top: 3rem;
    padding: 0.875rem 2.5rem;
    background: var(--green-500);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.25);

    &:hover {
      background: #2a9d8f;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(72, 187, 120, 0.3);
    }
    
    @media (max-width: 768px) {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      margin-top: 2rem;
    }
  }
`

export default function Custom404() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10); // Pode alterar para 5 se preferir

  useEffect(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleManualRedirect = () => {
    router.push('/');
  };

  return (
    <PageNotFoundStyle>
      <Box>
        <LeftContent>
          <h1>404</h1>
          <h2>Página não encontrada</h2>
        </LeftContent>
        
        <RightContent>
          <h3>Oops! Algo deu errado</h3>
          
          <p>
            A página que você está tentando acessar não existe ou foi removida.
            Verifique o endereço digitado e tente novamente.
          </p>
          
          <p>
            Por segurança, suas informações de sessão foram limpas e você será
            redirecionado automaticamente para a página de login.
          </p>
          
          <div className="timer-text">
            Redirecionando para o login em {countdown} segundos...
          </div>
          
          <button 
            onClick={handleManualRedirect}
            className="redirect-button"
          >
            Ir para o Login Agora
          </button>
        </RightContent>
      </Box>
    </PageNotFoundStyle>
  );
}