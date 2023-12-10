import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Lender from "./pages/Lender";
import Borrower from "./pages/Borrower";
import { ThemeProvider } from "@material-tailwind/react";
import Form from "./components/Form";
import Push from "../utils/Push";
import Table from "./components/Table";

function App() {

  return (
    <ThemeProvider>
      <div className="bg-sky-100">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/lend" element={<Lender />}/>
            <Route path="/borrow" element={<Borrower/>}/>
            <Route path="/form" element={<Form />}/>
            <Route path="/transactions" element={<Table />}/>
            {/* <Route path="/push" element={<Push />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    
  )
}

export default App
