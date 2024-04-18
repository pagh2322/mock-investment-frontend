import PATH from "../../constants/path";
import { useState } from "react";
import * as Styled from "./index.styles";

const BottomNavigator = () => {
  const [activeNav, setActiveNav] = useState(1);

  const selected = (index: number) => {
    return activeNav === index;
  }
  
  return (
    <Styled.Nav>
      <Styled.NavLink to="/" onClick={() => setActiveNav(1)}>
        <div>
          <Styled.NavItem
            icon="home"
            selected={selected(1)}
          />
        </div>
      </Styled.NavLink>

      <Styled.NavLink to={PATH.SEARCH} onClick={() => setActiveNav(2)}>
        <div>
          <Styled.NavItem
            icon="magnifying-glass"
            selected={selected(2)}
          />
        </div>
      </Styled.NavLink>
      
      <Styled.NavLink to={PATH.MY_ACCOUNT} onClick={() => setActiveNav(3)}>
        <div>
          <Styled.NavItem
            icon="user"
            selected={selected(3)}
          />
        </div>
      </Styled.NavLink>
    </Styled.Nav>
  );
};

export default BottomNavigator;