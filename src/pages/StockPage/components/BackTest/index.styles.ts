import styled from "styled-components";
import { Stack } from "react-bootstrap";
import { COLORS } from "../../../../constants/colors";

export const Container = styled.div`
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const OrderType = styled.span<{ buy: boolean }>`
  color: ${(props) => props.buy ? "red" : "blue"};
`;

export const Date = styled.div`
  color: ${COLORS.SECONDAY};
  min-width: 92px;
`;

export const Box = styled(Stack)`
`;

export const ExcutedDate = styled.div`
  color: ${COLORS.SECONDAY};
  text-align: end;
`;