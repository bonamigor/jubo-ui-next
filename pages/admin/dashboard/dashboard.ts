import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;

  div {
    display: flex;
    flex-direction: row;
  }

  a {
      text-decoration: underline
  }
`

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: var(--white);
  width: 500px;
  height: 228px;
  border-radius: 10px;
  margin: 0 2rem;
  text-align: center;

  div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 1rem 0;
    color: var(--black);

    h2 {
      font-weight: 400;
      text-decoration: underline;
    }
  }
`

export const RightPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: var(--white);
  width: 500px;
  height: 228px;
  border-radius: 10px;
  margin: 0 2rem;
  text-align: center;

  div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin: 1rem 0;
    color: var(--black);

    h2 {
      font-weight: 400;
      text-decoration: underline;
    }
  }
`

export const LoadingDiv = styled.div`
  display: flex;
  
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
`

export const NoContent = styled.div`
  display: flex;
  
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
`

export const TableContainer = styled.div`
  display: flex;
  margin-top: 4rem;

  table {
    width: 1055px;
    border-spacing: 0 0.5rem;
    text-align: center;
    
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    thead {
      tr {
        &:first-child {
          color: var(--gray-700);
        }
      }
    }

    tbody {
      tr {
        td {
          font-size: 1rem;

          &:first-child {
            text-align: left;
          }
        }
      }
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--black);
      border-radius: 0.25rem;

      a {
        margin: 0 5px;
      }
    }
  }
`

