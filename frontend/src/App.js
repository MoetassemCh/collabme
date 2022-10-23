
import { useEffect } from "react";
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Home from "./container/Home";
import Login from "./container/Login";
import { fetchUser } from "./utils/fetchUser";

function App() {

  const navigate=useNavigate()

  useEffect(() => {
    const user=fetchUser()
if(!user) navigate('/login')
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="/*" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
