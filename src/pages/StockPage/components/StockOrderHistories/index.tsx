import TitleText from "../../../../components/TitleText";
import useStockOrderHistories from "../../../../hooks/stockOrder/useStockOrderHistories";

import * as Styled from "./index.styles";
import StockOrderListItem from "../../../../components/StockOrderListItem";

export interface StockOrderHistories {
  code: string;
};

const StockOrderHistories = (props: StockOrderHistories) => {
  const histories = useStockOrderHistories({ code: props.code }).data?.histories ?? [];
  histories.sort((h1, h2) => h2.id - h1.id);

  return (
    <Styled.Container>
      <TitleText text="Stock order histories" />
      <div style={{ marginTop: "8px" }}>
      {histories.map((history) => (
        <StockOrderListItem
          key={history.id}
          id={history.id}
          date={history.orderDate}
          name={history.name}
          code={history.code}
          quantity={history.quantity}
          bidPrice={history.bidPrice}
          orderType={history.orderType}
          executed={history.executed}
          excutedDate={history.executedDate} />
      ))}
      </div>
    </Styled.Container>
  );
}

export default StockOrderHistories