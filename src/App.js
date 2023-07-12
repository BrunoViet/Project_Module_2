import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import ManagerProducts from "./components/Admin/Products/ManagerProducts";
import ManagerUsers from "./components/Admin/Users/ManagerUsers";
import ManageOrder from "./components/Admin/Order/ManageOrder";
import UserHome from "./components/User/UserHome";
import UserLogin from "./components/User/UserLogin";
import UserRegister from "./components/User/UserRegister";
import CartUser from "./components/User/Cart/CartUser";
import UserDetail from "./components/User/UserDetail";
import Category from "./components/User/Category/Category";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/detail/:id" element={<UserDetail />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/cart" element={<CartUser />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/home" element={<ManagerUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ManagerProducts />} />
        <Route path="/order" element={<ManageOrder />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
