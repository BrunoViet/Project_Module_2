import { useEffect, useState } from "react"
import "./Register.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import axios from "axios";
import { addUser, getListUsers } from "../../common/API/userAPI";

function Register() {

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

    useEffect(() => {
        getListUsersFormAPI()
    }, [])

    const getListUsersFormAPI = async () => {
        try {
            const users = await getListUsers()
            setListUsers(users)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }
    const handleRegister = async () => {
        const formData = {
            username: userName,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
            role: 1,
            avatar: avatar,
            created_at: createdAt.toLocaleDateString(),
            updated_at: "",
            created_by_id: "",
            updated_by_id: ""
        }
        // kiểm tra nếu username tồn tại thì không được tạo
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].username === userName) {
                isValid = false
                break;
            }
        }
        //validate input
        if (password !== repassword) {
            toast.error("Mật khẩu nhập lại không khớp")
        } else {
            if (isValid === true) {
                try {
                    //Gọi API thêm mới user
                    await addUser(formData)
                    handleRedirect()
                    toast.success(`Đăng kí tài khoản username: ${formData.username} thành công!`)
                } catch (error) {
                    toast.error(error.response.data.error)
                }
            } else {
                toast.error(`Username is exist: ${userName}`)
            }
        }
    }

    const handleRedirect = () => {
        navigate("/login")
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
                        <input type="email" name="email"
                            onChange={(e) => setEmail(e.target.value)}
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
export default Register