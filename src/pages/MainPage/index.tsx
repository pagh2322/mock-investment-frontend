import 'bootstrap/dist/css/bootstrap.min.css';
import OwnStockList from "./components/OwnStockList";
import Header from "./components/Header";
import Seperator from '../../components/Separator';
import StockLikeList from './components/StockLikeList';

import * as Styled from "./index.styles";

const MainPage = () => {
  return (
    <Styled.Container>
      <Header /><Seperator />
      <OwnStockList /><Seperator />
      <StockLikeList />
    </Styled.Container>
  );
};

export default MainPage;