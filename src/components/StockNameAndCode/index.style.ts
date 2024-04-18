import styled from "styled-components";

export const StockName = styled.span<{ size?: string }>`
  font-weight: ${(props) => props.size === "large" ? "bold" : "normal"};
  font-size: ${(props) => props.size || "x-large"};
`;

export const StockCode = styled.span<{ size?: string }>`
  color: #868e96;
  border-radius: 8px;
  padding: ${(props) => props.size === "small" ? "4px 8px 4px 8px" : "12px" };
  background-color: #e9ecef;
  font-weight: bold;
  font-size: ${(props) => props.size || "x-small"};
`