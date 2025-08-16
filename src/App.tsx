import { Outlet } from "react-router";
import "./App.css";
import Nav from "./layout/Navbar/Nav";

function App() {
   return (
      <>
         <Nav></Nav>
         <Outlet></Outlet>
      </>
   );
}

export default App;
