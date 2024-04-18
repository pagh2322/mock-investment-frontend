import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";

export const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const Content = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`;

export const LeftLabel = styled.span`
  font-size: medium;
  color: ${COLORS.SECONDAY};
  width: 100%;
`;

export const RightLabel = styled.span`
  width: 100%;
  text-align: end;
  font-size: medium;
  font-weight: bold;
  color: ${COLORS.PRIMARY};
`;

export const Price = styled.div`
  font-size: medium;
  font-weight: bold;
`;

export const PricePercentage = styled.div<{ color: string }>`
  font-size: small;
  color: ${(props) => props.color};
  font-weight: normal;
`;

export const Empty = styled.div`
  font-size: medium;
  color: ${COLORS.SECONDAY};
  width: 100%;
  margin-top: 8px;
  text-align: center;
`;