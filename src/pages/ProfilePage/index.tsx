import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { requestMyPortfolio } from "../../api/portfolio";

const ProfilePage = () => {
  const authContextValue = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logout = () => {
    removeCookie('Authorization');
    navigate(`${PATH.HOME}`);
  };

  useEffect(() => {
    requestMyPortfolio()
      .then(response => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <div>
        {username}
      </div>
      <span className="p-2" onClick={() => logout()}>Logout</span>
    </>
  );
};

export default ProfilePage;