import { useNavigate, useParams } from "react-router"
import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { deleteOrder, getDetailOrders, getDetailOrdersById, updateOrder } from "../../../Service/orderAPI"
import Pagination from "../../../common/pagination/Pagination"
import { toast } from "react-toastify"


function ManageOrderDetail() {
    const [listOrder, setListOrder] = useState([])
    const idUser = useParams()
    const [isChanged, setIsChanged] = useState(false)
    const [id, setId] = useState()
    const [searchTerm, setSearchTerm] = useState('');
    const [currentOrder, setCurrentOrder] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [serialNumber, setSerialNumber] = useState()
    const [orderUpdate, setOrderUpdate] = useState({})
    const [userId, setUserId] = useState()
    const [orderAt, setOrderAt] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [status, setStatus] = useState()
    const [note, setNote] = useState()
    const [createAt, setCreateAt] = useState()
    const [createById, setCreatedById] = useState()
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate()
    let selectedProduct = []
    const localStorageUser = JSON.parse(localStorage.getItem('admin'))

    if (!localStorageUser) {
        navigate("/login")
    }

    useEffect(() => {
        getListOrderDetail(idUser.id)
    }, [isChanged])

    useEffect(() => {
        const dataPaging = listOrder.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentOrder(dataPaging);
    }, [currentPage, listOrder])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listOrder.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentOrder(dataPaging)
        } else {
            const dataPaging = listOrder.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentOrder(dataPaging);
        }
    }, [searchTerm, listOrder, currentPage]);

    const getListOrderDetail = async (id) => {
        try {
            const order = await getDetailOrders(id)
            setListOrder(order)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (id) => {
        setIsChanged(!isChanged)
        if (window.confirm("Bạn có chắc chắn xóa đơn hàng này không?")) {
            try {
                await deleteOrder(id)
                toast.success(`Xoá thành công`)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleChooseIdToDelete = (event) => {
        let userId = Number(event.target.value);
        if (event.target.checked) {
            selectedProduct.push(userId);
        } else {
            let index = selectedProduct.indexOf(userId)
            selectedProduct.splice(index, 1);
        }
    }

    const handleEdit = async (id) => {
        try {
            const order = await getDetailOrdersById(id)
            console.log(order)
            setOrderUpdate(order)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả đơn hàng này không?")) {
            selectedProduct.forEach(async (productId) => {
                try {
                    await deleteOrder(productId)
                } catch (error) {
                    console.log(error)
                }
            })
            setIsChanged(!isChanged)
            toast.success("Delete all orders chosen successfully")
            selectedProduct = []
        }
    }

    const handleSaveEdit = async () => {
        const orderUpdated = {
            id: id ? id : orderUpdate.id,
            serial_number: serialNumber ? serialNumber : orderUpdate.serial_number,
            user_id: userId ? userId : orderUpdate.user_id,
            order_at: orderAt ? orderAt : orderUpdate.order_at,
            total_price: totalPrice ? totalPrice : orderUpdate.total_price,
            status: status ? status : orderUpdate.status,
            note: note ? note : orderUpdate.note,
            created_at: createAt ? createAt : orderUpdate.created_at,
            created_by_id: createById ? createById : orderUpdate.created_by_id,
            updated_at: new Date(),
            updated_by_id: localStorageUser.id
        }
        try {
            await updateOrder(orderUpdated)
            toast.success(`Cập nhật sản phẩm có id là ${orderUpdate.id} thành công`)
            setIsChanged(!isChanged)
            setOrderUpdate({})
        } catch (error) {
            console.log(error)
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
            <h1 className="text-center mt-5 mb-5">User Order Detail</h1>

            <div>
                <table id="customers">
                    <tr>
                        <th>ID</th>
                        <th>Serial Number</th>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Full Name Customer</th>
                        <th>Order At</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Note</th>
                        <th>Created At</th>
                        <th>Created By ID</th>
                        <th>Actions</th>
                        <th>
                            <button className="btn btn-primary"
                                onClick={handleDeleteAll}
                            >Delete All</button>
                        </th>
                    </tr>
                    <tbody>
                        {currentOrder ?
                            currentOrder.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.serial_number}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name + " " + item.last_name}</td>
                                            <td>{item.order_at}</td>
                                            <td>{(item.total_price).toLocaleString()}đ</td>
                                            <td>
                                                <select value={item.status} disabled type="text" className="form-control">
                                                    <option value={"Từ chối"}>Từ chối</option>
                                                    <option value={"Chờ xác nhận"}>Chờ xác nhận</option>
                                                    <option value={"Đã xác nhận"}>Đã xác nhận</option>
                                                    <option value={"Đã hoàn thành"}>Đã hoàn thành</option>
                                                </select>
                                            </td>
                                            <td>{item.note}</td>
                                            <td>{item.created_at}</td>
                                            <td>{item.created_by_id}</td>
                                            <td><button className="btn btn-warning me-2 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                Detail
                                            </button>
                                                <button className="btn btn-danger"
                                                    onClick={() => handleDeleteProduct(item.id)}
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
                            })
                            : ""}
                    </tbody>
                </table>
                {/* Hiển thị các nút phân trang */}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={searchTerm == '' ? listOrder.length : searchItems.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
                <div className="text-center">
                    <button
                        onClick={() => navigate("/order")}
                        className="btn btn-primary mt-5">Trở về</button>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Order</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="serial_number" className="col-form-label">Mã đơn:</label>
                                    <input type="text" className="form-control" id="serial_number" defaultValue={orderUpdate.serial_number}
                                        onChange={(e) => setSerialNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="user_id" className="col-form-label">Đơn hàng của user có ID:</label>
                                    <input type="text" className="form-control" id="user_id" defaultValue={orderUpdate.user_id}
                                        disabled onChange={(e) => setUserId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="order_at" className="col-form-label">Đặt hàng lúc:</label>
                                    <input type="text" className="form-control" id="order_at" defaultValue={orderUpdate.order_at}

                                        onChange={(e) => setOrderAt(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label for="total_price" className="col-form-label">Tổng tiền đơn hàng:</label>
                                    <input type="text" className="form-control" id="total_price" defaultValue={orderUpdate.total_price}

                                        onChange={(e) => setTotalPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label for="status" className="col-form-label">Trạng thái đơn hàng:</label>
                                    <select type="text" className="form-control" id="status" defaultValue={orderUpdate.status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value={"Từ chối"}>Từ chối</option>
                                        <option selected value={"Chờ xác nhận"}>Chờ xác nhận</option>
                                        <option value={"Đã xác nhận"}>Đã xác nhận</option>
                                        <option value={"Đã hoàn thành"}>Đã hoàn thành</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="note" className="col-form-label">Ghi chú</label>
                                    <textarea type="text" className="form-control" id="note" defaultValue={orderUpdate.note}
                                        onChange={(e) => setNote(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label for="created_at" className="col-form-label">Thời gian đơn hàng được tạo:</label>
                                    <input type="text" className="form-control" id="created_at" defaultValue={orderUpdate.created_at}
                                        disabled
                                        onChange={(e) => setCreateAt(e.target.value)} />
                                </div>
                                <div>
                                    <label for="created_by_id" className="col-form-label">Đặt hàng bởi id:</label>
                                    <input type="text" className="form-control" id="created_by_id" defaultValue={orderUpdate.created_by_id}
                                        disabled
                                        onChange={(e) => setCreatedById(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={handleSaveEdit}
                            >Edit Order</button>


                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOrderDetail