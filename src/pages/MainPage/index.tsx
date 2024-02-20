import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

const MainPage = () => {
  const stockIds = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  return (
    <>
      <span>
        Main Page
      </span>
      <span>
        <Link to={PATH.LOGIN}>Login</Link>
      </span>
      {stockIds.map((id) => (
        <div>
          <button onClick={() => navigate(`${PATH.STOCK}/${id}`)}>
            Stock + {id}
          </button>
        </div>
      ))}
    </>
  );
};

export default MainPage;