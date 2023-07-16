import { useEffect, useState } from "react"
import Header from "../Header/Header"
import "./ManagerUsers.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { deleteUser, getListUser, getUserLoginInfo, updateStatusUser } from "../../../actions/userAction"
import axios from "axios"
import Pagination from "../../../common/pagination/Pagination";

function ManagerUsers() {
    const listUserAPI = useSelector(state => state.user.listUsers)
    console.log("hello", listUserAPI)
    const [listUsers, setListUsers] = useState([])
    const [id, setId] = useState()
    const [userName, setUsername] = useState()
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [avatar, setAvatar] = useState()
    const [createdAt, setCreatedAt] = useState()
    const [role, setRole] = useState()
    const [password, setPassword] = useState()
    const [isChanged, setIsChanged] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let selectedUsers = []
    const localStorageUser = JSON.parse(localStorage.getItem('userLogin'))

    if (!localStorageUser) {
        navigate("/login")
    }

    useEffect(() => {
        axios.get("http://localhost:4000/admin")
            .then(function (response) {
                //Xử lí khi thành công
                dispatch(getListUser(response.data))
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [isChanged])

    useEffect(() => {
        const dataPaging = listUserAPI.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentUser(dataPaging);
    }, [currentPage, listUserAPI])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listUserAPI.filter((item) =>
                item.userName.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentUser(dataPaging)
        } else {
            const dataPaging = listUserAPI.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentUser(dataPaging);
        }
    }, [searchTerm, listUserAPI, currentPage]);

    const handleEdit = (id) => {
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].id == id) {
                setUsername(listUsers[i].userName)
                setEmail(listUsers[i].email)
                setPassword(listUsers[i].password)
                setFirstName(listUsers[i].firstName)
                setLastName(listUsers[i].lastName)
                setAvatar(listUsers[i].avatar)
                setCreatedAt(listUsers[i].createdAt)
                setRole(listUsers[i].role)
                setId(listUsers[i].id)
                break
            }
        }

    }
    const handleSave = () => {
        setIsChanged(!isChanged)
        return axios.put(`http://localhost:4000/admin/${id}`, {
            "userName": userName,
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "role": role,
            "avatar": avatar,
            "createdAt": createdAt,
            "id": id
        })
            .then((response) => { toast.success("Edit User Success") })
            .catch((error) => { toast.error("Something went wrong!") })
    }

    const handleDelete = (id) => {
        setIsChanged(!isChanged);
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            return axios.delete(`http://localhost:4000/admin/${id}`)
                .then(function (response) {
                    toast.success("Delete was successful!")
                })
                .catch(function (error) {
                    toast.error("Something went wrong!")
                })
        }

    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả người dùng này không?")) {
            selectedUsers.forEach(userId => {
                axios.delete(`http://localhost:4000/admin/${userId}`)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }
        toast.success("Delete all users chosen successfully")
        selectedUsers = []
        setIsChanged(!isChanged)
    }

    const handleChooseIdToDelete = (event) => {
        const userId = Number(event.target.value);
        if (event.target.checked) {
            selectedUsers.push(userId);
        } else {
            let index = selectedUsers.indexOf(userId)
            selectedUsers.splice(index, 1);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Header />
            <div style={{ padding: "0 100px" }} className="content">
                <h1 className="text-center" style={{ color: "red", position: "relative", top: "50px" }}>Manager User</h1>
                <div style={{ marginLeft: "44%", position: "relative", top: "70px" }} >
                    <input className="input-group-text" value={searchTerm} onChange={handleSearch} placeholder="Search" type="text" />
                </div>
                <table id="customers" className="text-center" style={{ marginTop: "100px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Avatar</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                            <th><button className="btn btn-primary"
                                onClick={handleDeleteAll}
                            >Delete All</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUser ? currentUser.map((item, index) => {
                            return (
                                <>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                                            {item.userName}
                                        </td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <td>
                                            {item.firstName}
                                        </td>
                                        <td>
                                            {item.lastName}
                                        </td>
                                        <td>
                                            <img src={item.avatar} alt="Ảnh của bạn" />
                                        </td>
                                        <td>
                                            {item.role}
                                        </td>
                                        <td>
                                            {item.createdAt}
                                        </td>
                                        <td>
                                            <button className="btn btn-warning me-2"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                onClick={() => handleEdit(item.id)}
                                            >Edit</button>
                                            <button className="btn btn-secondary"
                                                onClick={() => handleDelete(item.id)}
                                            >Delete</button>
                                        </td>
                                        <td>
                                            <input type="checkbox"
                                                value={item.id}
                                                onChange={(e) => handleChooseIdToDelete(e)}
                                            />
                                        </td>
                                    </tr>
                                </>
                            )
                        }) : []}

                    </tbody>
                </table>
                {/* Hiển thị các nút phân trang */}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={searchTerm == '' ? listUserAPI.length : searchItems.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>



            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body row" style={{ padding: "0 50px" }}>
                            <label className="form-label mt-2">Username</label>
                            <input type="text" className="form-control" defaultValue={userName}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="form-label mt-2">Email</label>
                            <input type="text" className="form-control" defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label mt-2">First Name</label>
                            <input type="text" className="form-control" defaultValue={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label className="form-label mt-2">Last Name</label>
                            <input type="text" className="form-control" defaultValue={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label className="form-label mt-2">Role</label>
                            <input type="text" className="form-control" defaultValue={role} disabled />
                            <label className="form-label mt-2">Avatar</label>
                            <input type="text" className="form-control" defaultValue={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                            <label className="form-label mt-2">Created At</label>
                            <input type="text" className="form-control" defaultValue={createdAt} disabled />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={handleSave}
                            >Save</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagerUsers