import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";
import { Stack } from "react-bootstrap";

export const Container = styled.div`
  padding: 12px;
`;

export const Price = styled.div`
  font-size: x-large;
  font-weight: bold;
  color: ${COLORS.PRIMARY};
`;

export const PricePercentage = styled.div<{ color: string }>`
  font-size: medium;
  color: ${(props) => props.color};
  font-weight: normal;
`;

export const HeaderContent = styled(Stack)`
  padding-top: 16px;
`;