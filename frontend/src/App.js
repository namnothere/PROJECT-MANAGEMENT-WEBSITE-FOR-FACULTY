import { Route, Routes } from "react-router-dom";
import "./App.css";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { listRouter } from "./contstant";
import { useEffect, useState } from "react";

function App() {
  const [routers, setRouters] = useState([]);
  useEffect(() => {
    const getRouter = () => {
      const authToken = Cookies.get('authToken');  
      console.log("authToken",authToken);
      if (authToken) {
        // Decode the JWT token to get user information
        const decodedToken = jwtDecode(authToken);
        const userToken = decodedToken.user;
        Cookies.remove('authToken');
        console.log("userToken",userToken);
        localStorage.setItem('user', JSON.stringify(userToken));
      }
      const obj = localStorage.getItem("user");

      console.log("Tai khoan:",obj)
      const type = JSON?.parse(obj)?.role;
      switch (type) {
        case 3:
          setRouters(listRouter.admin);
          break;
        case 2:
          setRouters(listRouter.management);
          break;
        case 1:
          setRouters(listRouter.teacher);
          break;
        case 0:
          setRouters(listRouter.student);
          break;
        default:
          setRouters(listRouter.guest);
          break;
      }
    };
    getRouter();
  }, []);
  return (
    <Routes>
      {routers?.map((router, index) => (
        <Route path={router.path} element={router?.element} key={index} />
      ))}
    </Routes>
  );
}

export default App;
