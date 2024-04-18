import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { COLORS } from "../../constants/colors";

export const Nav = styled.nav`
  overflow: hidden;
  border-radius: 12px 12px 0px 0px;
  border-top: 2px solid ${COLORS.DISABLE};

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: white;

  > div {
    text-align: center;
    float: left;
    width: 33%;

    height: 64px;
    line-height: 45px;
  }
`;

export const NavItem = styled(FontAwesomeIcon)<{ selected: boolean }>`
  font-size: x-large;
  color: ${(props) => props.selected ? COLORS.PRIMARY : COLORS.SECONDAY};
  padding-top: 16px;
`;

export const NavLink = styled(Link)`
  float: left;
  width: 33%;
  text-align: center;

  height: 64px;
  line-height: 45px;
`;