import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Lender from "./pages/Lender";
import Borrower from "./pages/Borrower";

function App() {

  return (
    <div className="bg-sky-100">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/lend" element={<Lender />}/>
            <Route path="/borrow" element={<Borrower />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
