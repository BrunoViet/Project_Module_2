import { useEffect, useState } from "react"
import "../Register/Register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import axios from "axios";

function UserRegister() {

    // Khởi tạo các biến ứng với các thuộc tính User
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [createdAt, setCreatedAt] = useState(new Date())
    const [listUsers, setListUsers] = useState([])
    let isValid = true
    const navigate = useNavigate()

    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

    function isValidEmail(email) {
        return pattern.test(email);
    }

    const handleSetEmail = (e) => {
        const emailInput = e.target.value;
        if (isValidEmail(emailInput)) {
            setEmail(emailInput)
        } else (
            setEmail("")
        )
    }

    const handleRegister = async () => {

        // kiểm tra nếu username tồn tại thì không được tạo
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].userName === userName) {
                isValid = false
                break;
            }
        }

        //validate input
        if (password !== repassword) {
            toast.error("Mật khẩu nhập lại không khớp")
        } else if (password.length < 6) {
            toast.error("Mật khẩu phải chứa 6 kí tự trở lên")
        } else if (userName === "" && password === "") {
            toast.error("Vui lòng nhập đầy đủ thông tin")
        } else if (email === "") {
            toast.error("Vui lòng nhập lại email")
        } else {
            if (isValid == true) {
                //Gọi API thêm mới user
                await axios.post("http://localhost:4000/admin", {
                    userName: userName,
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    role: "User",
                    avatar: avatar,
                    createdAt: createdAt.toLocaleDateString(),
                })
                    .then(function (response) {
                        toast.success(`Successfully created username: ${response.data.userName}`)
                        navigate("/userlogin")
                    })
                    .catch(function (error) {
                        toast.error("Something went wrong!")
                    })

            } else {
                toast.error(`Username is exist: ${userName}`)
            }
        }
    }

    const handleRedirect = () => {
        navigate("/userlogin")
    }

    return (
        <>
            <div className="container">
                <div className="box">
                    <h1 align="center" >Đăng kí</h1>
                    <div className="inputBox">
                        <input type="text" name="username" required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Tên đăng nhập</label>
                    </div>
                    <div className="inputBox">
                        <input type="email" name="email" required
                            onChange={(e) => handleSetEmail(e)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="first-name" required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>First name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="last-name" required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>Last name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="avatar" required
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <label>Avatar URL</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" minLength={6} required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Mật khẩu</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="re-password" required
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <label>Nhập lại mật khẩu</label>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success me-3" onClick={handleRegister}>Đăng kí</button>
                        <button className="btn btn-primary" onClick={handleRedirect}>Trở về đăng nhập</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserRegister