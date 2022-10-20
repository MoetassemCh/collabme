
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Home from "./container/Home";
import Login from "./container/Login";

function App() {
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
