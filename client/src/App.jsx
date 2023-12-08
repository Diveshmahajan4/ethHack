import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <div className="bg-sky-100">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
