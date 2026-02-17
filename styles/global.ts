import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF; // Links Header

    --black: #000000;

    --cyan-500: #61dafb;
    --green-500: #04B486; // Alternative Background

    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-150: #e5e7eb;
    --gray-200: #e5e7eb;
    --gray-250: #d1d5db;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    
    --green-50: #f0fdf4;
    --green-100: #dcfce7;
    --green-200: #bbf7d0;
    --green-600: #16a34a;
    --green-800: #166534;
    
    --red-50: #fef2f2;
    --red-100: #fee2e2;
    --red-200: #fecaca;
    --red-500: #ef4444;
    --red-600: #dc2626;
    --red-800: #991b1b;
    
    --blue-100: #dbeafe;
    --blue-300: #93c5fd;
    --blue-500: #3b82f6;
    --blue-700: #1d4ed8;
    
    --emerald-50: #ecfdf5;
    --rose-50: #fff1f2;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;

    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }
  body {
    background: var(--gray-200);
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }
  button {
    cursor: pointer;
  }
  a {
    cursor: pointer;
  }
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

.react-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem; /* Adiciona padding ao redor do modal */
}

.react-modal-content {
  position: relative;
  background: transparent;
  overflow: auto;
  border-radius: 8px;
  outline: none;
  max-width: 95vw; /* Limita largura máxima */
  max-height: 95vh; /* Limita altura máxima */
  background-color: var(--white);
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  }
`
