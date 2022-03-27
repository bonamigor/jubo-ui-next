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

export const Table = styled.div`
  
`
