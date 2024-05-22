import { useContext, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../../../context/auth';
import useCurrentBalance from '../../../../hooks/balance/useCurrentBalance';
import useOwnStocks from '../../../../hooks/ownStock/useOwnStocks';
import useCreateStockOrder from '../../../../hooks/stockOrder/useCreateStockOrder';

import * as Styled from "./index.styles";
import SimulationContext from '../../../../context/simulation';
import MoneyText from '../../../../components/MoneyText';

interface ModalProps {
  code: string;
  show: boolean;
  close: () => void;
  isBuy: boolean
};

const OrderModal = (props: ModalProps) => {
  const simulation = useContext(SimulationContext);
  const [bidPrice, setBidPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const balance = useCurrentBalance().data?.balance ?? 0;
  const ownStocks = useOwnStocks({ code: props.code }).data?.ownStocks ?? [];
  const { mutate: submitStockOrder } = useCreateStockOrder();

  const bidPriceChange = (event: any) => {
    setBidPrice(event.target.value);
    updateDisabled(event.target.value, quantity);
  }

  const quantityChange = (event: any) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
      updateDisabled(bidPrice, value);
    }
  }

  const updateDisabled = (p: string, q: number) => {
    if (p === "" || parseInt(p) === 0) {
      setDisabled(true);
      return;
    }
    if (q === 0 || (balance < (parseInt(p) * q))) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  const requestBuyStock = () => {
    submitStockOrder({
      code: props.code,
      bidPrice: parseInt(bidPrice),
      quantity,
      orderType: props.isBuy ? "BUY" : "SELL",
      orderDate: simulation.date,
    });
    props.close();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.close}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.isBuy ? "Buy" : "Sell"} stocks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Bid price ($)</InputGroup.Text>
          <Form.Control
            type="text"
            value={bidPrice}
            onChange={bidPriceChange}
          />

          <InputGroup.Text>Quantity</InputGroup.Text>
          <Form.Control
            type="number"
            min="0"
            value={quantity}
            onChange={quantityChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        {props.isBuy ? 
          <div>Current cash : <MoneyText money={balance.toFixed(2)} /></div> :
          ownStocks.length !== 0 ? <div>Own quantity : {ownStocks[0].quantity}</div> : <></>
        }
        
        <Button variant="secondary" onClick={props.close}>
          Cancel
        </Button>
        <Button variant="primary" disabled={disabled} onClick={requestBuyStock}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

interface StockOrderButtonsProps {
  code: string;
  price: number;
};

const StockOrderButtons = (props: StockOrderButtonsProps) => {
  const ownStocks = useOwnStocks({ code: props.code }).data?.ownStocks ?? [];
  const [showBuyWindow, setShowBuyWindow] = useState(false);
  const [showSellWindow, setShowSellWindow] = useState(false);
  const authContextValue = useContext(AuthContext);

  const handleShowBuyWindow = () => {
    setShowBuyWindow(true);
  };
  const handleShowSellWindow = () => {
    setShowSellWindow(true);
  };
  const closeModal = () => {
    setShowBuyWindow(false);
    setShowSellWindow(false);
  };

  return (
    <div>
      <Styled.ButtonGroup gap={3} direction='horizontal'>
        <Button
          variant="primary"
          size="lg"
          disabled={!authContextValue.isLogin}
          onClick={handleShowBuyWindow}
          style={{ width: "100%" }}
        >
          Buy
        </Button>

        <Button
          variant="danger"
          size="lg"
          disabled={!authContextValue.isLogin || ownStocks.length == 0}
          onClick={handleShowSellWindow}
          style={{ width: "100%" }}
        >
          Sell
        </Button>
      </Styled.ButtonGroup>

      <OrderModal
        code={props.code}
        show={showBuyWindow}
        close={closeModal}
        isBuy={true}
      />
      <OrderModal
        code={props.code}
        show={showSellWindow}
        close={closeModal}
        isBuy={false}
      />
    </div>
  );
}

export default StockOrderButtons;