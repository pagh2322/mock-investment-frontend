import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

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
    axios.create({
      baseURL: 'http://localhost:8080',
      withCredentials: true
    }).get('/oauth/loginInfo')
      .then(res => {
        setUsername(res.data["username"]);
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