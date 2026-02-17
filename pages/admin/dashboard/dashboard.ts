import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
  padding: 0 2rem;

  > div:first-child {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }

  a {
    color: var(--blue-500);
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: var(--blue-700);
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const InputFilter = styled.div`
  flex: 1;
  
  input {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--gray-300);
    background: var(--gray-50);
    font-size: 1rem;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: var(--blue-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      background: var(--white);
    }

    &::placeholder {
      color: var(--gray-400);
      font-size: 0.95rem;
    }
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--white);
  width: 100%;
  max-width: 500px;
  height: 180px;
  border-radius: 12px;
  padding: 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  > div:first-child {
    flex-shrink: 0;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    text-align: left;
    gap: 0.5rem;

    h2 {
      font-weight: 600;
      font-size: 1.25rem;
      color: var(--gray-800);
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--gray-600);
      line-height: 1.5;
      font-size: 0.95rem;

      &:first-of-type {
        font-size: 1rem;
        font-weight: 500;
        color: var(--gray-700);
      }
    }
  }
`;

export const LeftPanel = styled(Panel)`
  border-left: 4px solid var(--red-500);
`;

export const RightPanel = styled(Panel)`
  border-left: 4px solid var(--green-500);
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const NoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
  text-align: center;
  padding: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 400px;

    h1 {
      font-size: 1.5rem;
      color: var(--gray-700);
      font-weight: 600;
    }

    p {
      color: var(--gray-500);
      line-height: 1.5;
    }
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 800px;

    thead {
      background: var(--green-500);
      
      tr {
        th {
          padding: 1rem 1.5rem;
          color: var(--white);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
          border-bottom: none;

          &:first-child {
            border-top-left-radius: 12px;
            padding-left: 2rem;
          }

          &:last-child {
            border-top-right-radius: 12px;
            padding-right: 2rem;
          }
        }
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s;
        border-bottom: 1px solid var(--gray-100);

        &:hover {
          background-color: var(--blue-50);
        }

        &:last-child {
          td {
            &:first-child {
              border-bottom-left-radius: 12px;
            }
            &:last-child {
              border-bottom-right-radius: 12px;
            }
          }
        }

        td {
          padding: 1.25rem 1.5rem;
          color: var(--gray-700);
          font-size: 0.95rem;
          background: var(--white);
          border-bottom: 1px solid var(--gray-100);

          &:first-child {
            padding-left: 2rem;
            font-weight: 600;
            color: var(--blue-600);
          }

          &:last-child {
            padding-right: 2rem;
          }

          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: var(--gray-100);
              transform: scale(1.05);
            }

            &:active {
              transform: scale(0.95);
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      thead {
        display: none;
      }

      tbody {
        tr {
          display: block;
          margin-bottom: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          td {
          display: block;
          text-align: right;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--gray-100);

          &:before {
            content: attr(data-label);
            float: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            color: var(--gray-500);
          }

          &:first-child {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            padding-top: 1rem;
          }

          &:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            padding-bottom: 1rem;
            border-bottom: none;
          }
        }
      }
    }
  }
`;