import styled from "styled-components";

export const Percentage = styled.span<{ size?: string, weight?: string, color: string }>`
  font-size: ${(props) => props.size || "small"};
  fong-weight: ${(props) => props.weight || "normal"};
  color: ${(props) => props.color};
`;