import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import ManagerProducts from "./components/Admin/Products/ManagerProducts";
import ManagerUsers from "./components/Admin/Users/ManagerUsers";

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<ManagerUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ManagerProducts />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
