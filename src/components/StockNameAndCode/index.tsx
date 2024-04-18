import { Stack } from "react-bootstrap";
import { StockCode, StockName } from "./index.style";

interface StockCodeProps {
  name: string;
  code: string;
  nameSize?: string;
  codeSize?: string;
  subTitle?: string;
}

const Content = (props: { name: string, nameSize?: string, subTitle?: string }) => {
  if (props.subTitle === undefined)
    return <StockName size={props.nameSize ?? "medium"}>{props.name}</StockName>;
    
  return (
    <Stack>
      <StockName size={props.nameSize ?? "medium"}>{props.name}</StockName>
      <div style={{ fontSize: "small", color: "#868e96" }}>{props.subTitle}</div>
    </Stack>
  );
}

const StockNameAndCode = (props: StockCodeProps) => {
  if (props.nameSize === "large") {
    return (
      <Stack gap={2} direction="horizontal">
        <Content name={props.name} nameSize={props.nameSize ?? "small"} subTitle={props.subTitle} />
        <StockCode size={props.codeSize ?? "x-small"}>{props.code}</StockCode>
      </Stack>
    );  
  }
  return (
    <Stack gap={2} direction="horizontal">
      <StockCode size={props.codeSize ?? "x-small"}>{props.code}</StockCode>
      <Content name={props.name} nameSize={props.nameSize ?? "small"} subTitle={props.subTitle} />
    </Stack>
  );
};

export default StockNameAndCode;