import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserLoginInfo } from "../../actions/userAction";

function Login() {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [listUsers, setListUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("http://localhost:4000/admin")
            .then(function (response) {
                //Xử lí khi thành công
                setListUsers(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [])
    const handleRedirect = () => {
        navigate("/register")
    }

    const handleLogin = () => {
        let isLogin = false
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].userName === userName && listUsers[i].password === password && listUsers[i].role === "Admin") {
                dispatch(getUserLoginInfo(listUsers[i]))
                localStorage.setItem("admin", JSON.stringify(listUsers[i]))
                isLogin = true
                break
            }

        }
        if (!isLogin) {
            toast.error("Admin not found: " + userName)
        } else {
            navigate("/products")
        }

    }

    return (
        <>
            <div className="container">
                <div className="box">
                    <h1 align="center" >Đăng nhập</h1>
                    <div className="inputBox">
                        <input type="text" name="username" required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Tên đăng nhập</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Mật khẩu</label>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-danger me-3" onClick={handleLogin}>Đăng nhập</button>
                        <button type="button" className="btn btn-warning" onClick={handleRedirect}>Đăng kí</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login