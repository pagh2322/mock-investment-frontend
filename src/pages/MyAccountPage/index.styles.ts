import { Stack } from "react-bootstrap";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  padding-bottom: 80px;
`;

export const Label = styled.span<{ date: boolean }>`
  font-size: small;
  color: ${(props) => props.date ? COLORS.SECONDAY : COLORS.PRIMARY};
`;