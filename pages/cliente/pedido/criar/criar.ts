import styled from "styled-components";

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
  text-align: center;
  background: var(--white);
  border-radius: 10px;
  width: 1100px;
  height: 700px;
  padding: 0 5px;
  
  h1 {
    margin-top: 2.5rem;
  }

  h2 {
    margin-top: 3rem;
    font-weight: 400;
  }
`

export const CreateForm = styled.form`
  margin-top: 2rem;
`
