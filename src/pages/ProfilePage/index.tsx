import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [username, setUsername] = useState("");

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
    <div>
      {username}
    </div>
  );
};

export default ProfilePage;