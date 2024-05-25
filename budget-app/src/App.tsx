import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
