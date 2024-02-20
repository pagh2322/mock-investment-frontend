interface StockListItemProps {
  title: string;
  ticker: string;
  ranking: number;
  price: number;
  percent: number;
}

const StockListItem = (props: StockListItemProps) => {
  return (
    <div>
      <div>{props.ranking} {props.title}</div>
      <div>{props.price} | {props.percent}</div>
    </div>
  );
};

export default StockListItem;