import { useParams } from "react-router-dom";

const StockPage = () => {
  const { id } = useParams();
  return (
    <>
      <div>
        Stock Page with {id}
      </div>
    </>
  );
};

export default StockPage;