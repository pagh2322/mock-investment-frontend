import { useContext } from "react";

import { useCookies } from "react-cookie";
import AuthContext from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

import * as Styled from "./index.styles";
import useStockOrderHistories from "../../hooks/stockOrder/useStockOrderHistories";
import StockOrderListItem from "../../components/StockOrderListItem";
import Logout from "./components/Logout";
import TotalValue from "./components/TotalValue";
import Seperator from "../../components/Separator";
import TitleText from "../../components/TitleText";


const MyAccountPage = () => {
  const auth = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const navigate = useNavigate();
  const histories = (useStockOrderHistories().data?.histories ?? []).sort((h1, h2) => h2.id - h1.id);

  const logout = () => {
    removeCookie('Authorization');
    navigate(`${PATH.HOME}`);
  };

  if (!auth.isLogin) {
    return (
      <Styled.Container>
        <Link to={PATH.LOGIN} style={{ marginLeft: "12px", marginRight: "12px" }}>Register/Login</Link>
      </Styled.Container>
    )
  }

  return (
    <Styled.Container>
      <TotalValue /><Seperator />
      <div style={{ margin: "12px" }}>
        <TitleText text="Stock order histories" />
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
      <Seperator />
      <Logout onClick={logout}/>
    </Styled.Container>
  );
};

export default MyAccountPage;