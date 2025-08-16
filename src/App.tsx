import { Outlet } from "react-router";
import "./App.css";
import Nav from "./layout/Navbar/Nav";
import Footer from "./layout/Footer/Footer";

function App() {
   return (
      <div>
         <div className="h-[80vh]">
            <Nav></Nav>
            <Outlet></Outlet>
         </div>
         <Footer></Footer>
      </div>
   );
}

export default App;
