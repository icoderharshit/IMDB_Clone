import './App.css';
import Login from "./components/Login";
import Register from './components/Register';
import NavBar from "./components/NavBar";
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  // const [ user, setLoginUser] = useState({})
  return (
    <>
   
   <BrowserRouter>
      <Routes>
      <Route exact path="/" element={localStorage.getItem("loggedIn")==="true"?<>
     <NavBar userName={
       localStorage.getItem("userName")
       }/>
      <Banner/>
      <Movies/>
      </>:<><Register/></>
    }/>

    <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
        <Route path="/favourites" element={<>
        <NavBar  userName={
       localStorage.getItem("userName")
       }/>
        <Favourites/>
        </>}/>
      </Routes>
    </BrowserRouter>
  {/* <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Register/>}/>
</Routes>
</BrowserRouter> */}
</>

  );
}
export default App;

