import { Percentage } from "./index.styles";

interface ChangePercentageProps {
  base: number;
  curr: number;
  fontSize?: string;
  fontWeight?: string;
};

const getChangePercent = (base: number, curr: number) => {
  var str = ((curr - base) / base * 100).toFixed(1);
  str = (str === "-0.0") ? "0.0" : str;
  return str.startsWith("-") ? str : "+".concat(str);
};

const ChangePercentage = (props: ChangePercentageProps) => {
  var base = props.base;
  var curr = props.curr;
  const changePercentage = getChangePercent(base, curr);

  const isMinus = changePercentage.startsWith("-");

  const signed = isMinus ? "-" : "+";
  const distance = Math.abs(curr - base).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const percentage = changePercentage.substring(1);
  const label = `${signed}${distance}(${percentage}%)`;

  return (
    <Percentage
      color={isMinus ? "blue" : "red"}
      size={props.fontSize}
      weight={props.fontWeight}
    >
      {label}
    </Percentage>
  );
};

export default ChangePercentage;