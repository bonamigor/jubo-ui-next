import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -7rem;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border-radius: 10px;
  width: 1500px;
  height: 300px;
  padding: 1.5rem 5px;
`

export const Dates = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  align-items: center;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;
  }
`

export const SearchButton = styled.button`
  display: block;
  width: 200px;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`

export const GeneratePdfButton = styled.button`
  display: block;
  width: 200px;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--green-500);
  color: #FFF;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`

export const TableContainer = styled.div`
  margin: 10px 0;

  table {
    width: 1100px;
    border-spacing: 0 0.5rem;
    margin-bottom: 1rem;
    
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

        th {
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        text-align: center;
        td {
          font-size: 1rem;
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

export const EmptyTable = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
`