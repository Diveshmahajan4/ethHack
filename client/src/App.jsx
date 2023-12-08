import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Lender from "./pages/Lender";

function App() {

  return (
    <div className="bg-sky-100">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/lender" element={<Lender />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
