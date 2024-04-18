import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import { Stack } from "react-bootstrap";

export const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const OrderType = styled.span<{ buy: boolean }>`
  color: ${(props) => props.buy ? "red" : "blue"};
  font-size: small;
`;

export const Date = styled.div`
  color: ${COLORS.SECONDAY};
  min-width: 92px;
`;

export const Box = styled(Stack)`
  // width: 360px;
`;

export const ExcutedDate = styled.div`
  color: ${COLORS.SECONDAY};
  width: 160px;
  font-size: small;
  text-align: end;
`;