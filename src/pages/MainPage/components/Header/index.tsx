import { Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import { useContext } from "react";
import SimulationContext from "../../../../context/simulation";
import { SimulationDate } from "./index.styles";
import AuthContext from "../../../../context/auth";

const Header = () => {
  const auth = useContext(AuthContext);
  const simulation = useContext(SimulationContext);
  const navigate = useNavigate();

  const navigateToSearchPage = () => {
    navigate(PATH.SEARCH);
  }

  return (
    <Stack gap={1} direction="horizontal">
      <SimulationDate>{simulation.date}</SimulationDate>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(1)}>+ 1</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(7)}>+ 7</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.proceedDate(30)}>+ 30</Button>
      <Button variant="primary" size="sm" onClick={() => simulation.restart()}>restart</Button>
      {auth.isLogin() ? 
        <></> :
        <Link to={PATH.LOGIN} className="p-2">Register/Login</Link>
      }
    </Stack>
  )
}

export default Header;