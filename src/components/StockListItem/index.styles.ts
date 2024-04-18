import styled from "styled-components";

export const Price = styled.span`
  font-size: medium;
  font-weight: bold;
`;

export const PricePercentage = styled.span<{ isMinus: boolean }>`
  font-size: small;
  color: ${(props) => props.isMinus ? "blue" : "red"}
`