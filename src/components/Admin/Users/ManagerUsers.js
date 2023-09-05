import { useEffect, useState } from "react"
import Header from "../Header/Header"
import "./ManagerUsers.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import Pagination from "../../../common/pagination/Pagination";
import { deleteUser, getListUsers, getListUsersSortedLastName, getListUsersSortedRole, getListUsersSortedUserName, updateUser } from "../../../Service/userAPI";

function ManagerUsers() {
    const [id, setId] = useState()
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [avatar, setAvatar] = useState()
    const [createdAt, setCreatedAt] = useState()
    const [updatedAt, setUpdatedAt] = useState()
    const [createdById, setCreatedById] = useState()
    const [updatedById, setUpdatedById] = useState()
    const [role, setRole] = useState()
    const [password, setPassword] = useState()
    const [isChanged, setIsChanged] = useState(false)
    const [listUser, setListUsers] = useState([])
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [isSorted, setIsSorted] = useState(true)
    let selectedUsers = []
    const localStorageUser = JSON.parse(localStorage.getItem('admin'))

    if (!localStorageUser) {
        navigate("/login")
    }

    useEffect(() => {
        getListUsersFormAPI()
    }, [isChanged])


    useEffect(() => {
        if (searchTerm !== '') {
            const results = listUser.filter((item) =>
                item.username.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentUser(dataPaging)
        } else {
            const dataPaging = listUser.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentUser(dataPaging);
        }
    }, [searchTerm, listUser, currentPage]);

    useEffect(() => {
        if (listUser.length > 0) {
            const dataPaging = listUser.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentUser(dataPaging);
        }
    }, [currentPage, listUser])

    const getListUsersFormAPI = async () => {
        try {
            const users = await getListUsers()
            setListUsers(users)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const handleEdit = (id) => {
        for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].id == id) {
                setUserName(listUser[i].username)
                setEmail(listUser[i].email)
                setPassword(listUser[i].password)
                setFirstName(listUser[i].first_name)
                setLastName(listUser[i].last_name)
                setAvatar(listUser[i].avatar)
                setCreatedAt(listUser[i].created_at)
                setRole(listUser[i].role)
                setId(listUser[i].id)
                setCreatedById(listUser[i].created_by_id)
                setUpdatedAt(listUser[i].updated_at)
                setUpdatedById(listUser[i].updated_by_id)
                break
            }
        }
    }
    const handleSave = async () => {
        const formDataUpdate = {
            "id": id,
            "username": userName,
            "email": email,
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
            "role": role,
            "avatar": avatar,
            "created_at": createdAt,
            "updated_at": new Date(),
            "created_by_id": localStorageUser.id,
            "updated_by_id": localStorageUser.id
        }
        try {
            //Gọi API thêm mới user
            await updateUser(formDataUpdate)
            toast.success(`Cập nhật thông tin tài khoản id ${formDataUpdate.id} thành công!`)
        } catch (error) {
            toast.error(error.response.data.error)
        }
        setIsChanged(!isChanged)
    }

    const handleDelete = async (id) => {
        setIsChanged(!isChanged);
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            try {
                await deleteUser(id)
                toast.success(`Xóa thông tin tài khoản id ${id} thành công!`)
            } catch (error) {
                toast.error(error.response.data.error)
            }
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả người dùng này không?")) {
            selectedUsers.forEach(async (userId) => {
                try {
                    await deleteUser(userId)
                } catch (error) {
                    toast.error(error.response.data.error)
                }
            })
        }
        toast.success(`Xóa các thông tin tài khoản đã chọn thành công!`)
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

    const handleSortUserName = async () => {
        setIsSorted(!isSorted);
        try {
            const listUserSort = isSorted ? await getListUsersSortedUserName("ASC") : await getListUsersSortedUserName("DESC")
            setListUsers(listUserSort)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const handleSortRole = async () => {
        setIsSorted(!isSorted);
        try {
            const listUserSort = isSorted ? await getListUsersSortedRole("ASC") : await getListUsersSortedRole("DESC")
            setListUsers(listUserSort)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const handleSortLastName = async () => {
        setIsSorted(!isSorted);
        try {
            const listUserSort = isSorted ? await getListUsersSortedLastName("ASC") : await getListUsersSortedLastName("DESC")
            setListUsers(listUserSort)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }
    return (
        <>
            <Header />
            <div style={{ padding: "0 100px" }} className="content">
                <h1 className="text-center">Manager User</h1>
                <div className="text-center mt-3">
                    <button className="btn btn-primary me-2 mb-2" onClick={() => navigate("/register")}>
                        Add User
                    </button>
                </div>
                <div style={{ marginLeft: "44%", position: "relative", top: "70px" }} >
                    <input className="input-group-text" value={searchTerm} onChange={handleSearch} placeholder="Search" type="text" />
                </div>
                <table id="customers" className="text-center" style={{ marginTop: "100px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username <span><i style={{ cursor: "pointer" }} onClick={handleSortUserName} class="fa-solid fa-sort"></i></span></th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name <span><i style={{ cursor: "pointer" }} onClick={handleSortLastName} class="fa-solid fa-sort"></i></span></th>
                            <th>Avatar</th>
                            <th>Role <span><i style={{ cursor: "pointer" }} onClick={handleSortRole} class="fa-solid fa-sort"></i></span></th>
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
                                    <tr hidden={item.role == 1} key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                                            {item.username}
                                        </td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <td>
                                            {item.first_name}
                                        </td>
                                        <td>
                                            {item.last_name}
                                        </td>
                                        <td>
                                            <img src={item.avatar} alt="Ảnh của bạn" />
                                        </td>
                                        <td>
                                            {item.role}
                                        </td>
                                        <td>
                                            {item.created_at}
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
                    totalItems={searchTerm == '' ? listUser.length : searchItems.length}
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
                                onChange={(e) => setUserName(e.target.value)}
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