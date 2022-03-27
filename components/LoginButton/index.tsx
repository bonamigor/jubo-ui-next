import { NextPage } from 'next';
import { LoginButton } from './loginButton';

interface LogginButtonProps {
  text: string
}

const LogginButton: NextPage<LogginButtonProps> = (props) => {
  const { text } = props;
  return (
    <LoginButton type='submit'>{text}</LoginButton>
  )
}

export default LogginButton
