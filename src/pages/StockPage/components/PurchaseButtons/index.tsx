import { useContext, useState } from 'react';
import { Form, InputGroup, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../../../context/Auth';
import { requestPostStockPurchase } from '../../../../api/stockOrder';

interface PurchaseButtonsProps {
  code: string;
  balance: number;
}

const PurchaseButtons = (props: PurchaseButtonsProps) => {
  const [showBuyWindow, setShowBuyWindow] = useState(false);
  const [showSellWindow, setShowSellWindow] = useState(false);
  const [volume, setVolume] = useState(1);
  const [bidPrice, setBidPrice] = useState(0);
  const [cannotBuy, setCannotBuy] = useState(true);
  const authContextValue = useContext(AuthContext);

  const handleShowBuyWindow = () => {
    setShowBuyWindow(true);
  };
  const handleCloseBuyWindow = () => {
    setShowBuyWindow(false);
  };
  const handleShowSellWindow = () => {
    setShowSellWindow(true);
  };

  const handleQuantityChange = (event: any) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setVolume(value);
      setCannotBuy(!authContextValue.isLogin() || props.balance < (bidPrice * value));
    }
  };

  const handlePriceChange = (event: any) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setBidPrice(value);
      setCannotBuy(!authContextValue.isLogin() || props.balance < (value * volume));
      console.log(!authContextValue.isLogin());
    }
  };

  const requestBuyStock = () => {
    requestPostStockPurchase(props.code, {
      bidPrice: bidPrice,
      volume: volume
    })
      .then(() => {
        handleCloseBuyWindow();
        window.location.reload();
      });
  }

  return (
    <>
    <Stack gap={3} direction='horizontal' style={{ position: "fixed", width: "100%", height: "5rem", padding: "12px", bottom: "0", backgroundColor: "white" }}>
      <Button variant="primary" size="lg" disabled={!authContextValue.isLogin()} onClick={handleShowBuyWindow} style={{ width: "100%" }}>
        Buy
      </Button>
      <Button variant="danger" size="lg" disabled={!authContextValue.isLogin()} onClick={handleShowSellWindow}  style={{ width: "100%" }}>
        Sell
      </Button>
    </Stack>

      <Modal
        show={showBuyWindow}
        onHide={handleCloseBuyWindow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Buy stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
          <InputGroup.Text>Bid price</InputGroup.Text>
            <Form.Control
              min="0"
              step="0.01"
              placeholder="0.00"
              value={bidPrice}
              onChange={handlePriceChange}
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Quantity</InputGroup.Text>
            <Form.Control
              type="number"
              min="1"
              placeholder="1"
              value={volume}
              onChange={handleQuantityChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <div>My current balance : {props.balance.toFixed(2)}</div>
          <Button variant="secondary" onClick={handleCloseBuyWindow}>
            Cancel
          </Button>
          <Button variant="primary" disabled={cannotBuy} onClick={requestBuyStock}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PurchaseButtons;