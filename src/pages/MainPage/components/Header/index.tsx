import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import PATH from "../../../../constants/path";
import { useContext } from "react";
import SimulationContext from "../../../../context/simulation";
import { SimulationDate } from "./index.styles";
import AuthContext from "../../../../context/auth";

const Header = () => {
  const auth = useContext(AuthContext);
  const simulation = useContext(SimulationContext);

  return (
    <Stack gap={1} direction="horizontal">
      <SimulationDate>현재 시뮬레이션 날짜 : {simulation.date}</SimulationDate>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(1)}>+ 1</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(7)}>+ 7</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(30)}>+ 30</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.restart()}>재시작</Button>
      {auth.isLogin ? 
        <></> :
        <Link to={PATH.LOGIN} className="p-2">회원가입/로그인</Link>
      }
    </Stack>
  )
}

export default Header;