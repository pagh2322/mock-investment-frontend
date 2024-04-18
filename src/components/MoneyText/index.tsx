interface MoneyTextProps {
  money: number | string;
}

const MoneyText = (props: MoneyTextProps) => {
  return (
    <span>${props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
  )
};

export default MoneyText;