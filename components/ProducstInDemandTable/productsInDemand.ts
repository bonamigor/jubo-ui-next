import styled from "styled-components";

export const TableContainer = styled.div`
  margin-top: 4rem 0;
  padding-bottom: 4rem;
  text-align: center;

  table {
    width: 900px;
    border-spacing: 0 0.5rem;
    margin-bottom: 1rem;
    
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      line-height: 1.5rem;
    }

    thead {
      background: var(--gray-700);
      tr {
        &:first-child {
          color: var(--white);
        }
      }
    }

    tbody {
      tr {
        td {
          background: var(--gray-200);
          font-size: 1rem;
        }
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--black);

      a {
        margin: 0 5px;
      }
    }
  }
`

export const TableTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`

export const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -4rem;
  padding: 1rem 0;
`
