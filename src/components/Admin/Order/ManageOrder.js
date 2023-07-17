import Header from "../Header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { getListOrderAPI } from "../../../actions/cartActions";
import Pagination from "../../../common/pagination/Pagination";

function ManageOrder() {
    const listOrderAPI = useSelector(state => state.cart.listOrder)
    console.log(listOrderAPI)
    const dispatch = useDispatch()
    const [listOrders, setListOrders] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    let selectedProduct = []
    const [id, setId] = useState()
    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [price, setPrice] = useState()
    const [status, setStatus] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [productName, setProductName] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentOrder, setCurrentOrder] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        axios.get("http://localhost:4000/order")
            .then(function (response) {
                //Xử lí khi thành công
                dispatch(getListOrderAPI(response.data))
                console.log(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [isChanged])

    useEffect(() => {
        const dataPaging = listOrderAPI.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentOrder(dataPaging);
    }, [currentPage, listOrderAPI])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listOrderAPI.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentOrder(dataPaging)
        } else {
            const dataPaging = listOrderAPI.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentOrder(dataPaging);
        }
    }, [searchTerm, listOrderAPI, currentPage]);

    const handleDeleteProduct = (id) => {
        setIsChanged(!isChanged)
        if (window.confirm("Bạn có chắc chắn xóa đơn hàng này không?")) {
            axios.delete(`http://localhost:4000/order/${id}`)
                .then((response) => { toast.success("Delete Order Successfully!") })
                .catch((error) => { toast.error("Something went wrong!") })
        }

    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả đơn hàng này không?")) {
            selectedProduct.forEach(productId => {
                axios.delete(`http://localhost:4000/order/${productId}`)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }
        toast.success("Delete all orders chosen successfully")
        selectedProduct = []
        console.log(selectedProduct)
        setIsChanged(!isChanged)
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

    const handleEdit = (id) => {
        listOrderAPI.map(item => {
            if (item.id === id) {
                setName(item.name)
                setCode(item.sku)
                setPrice(item.totalPrice)
                setImgUrl(item.imgUrl)
                setStatus(item.status)
                setAddress(item.address)
                setPhone(item.phone)
                setId(item.id)
                setProductName(item.productName)
            }

        })
    }


    const handleSaveEdit = () => {
        setIsChanged(!isChanged)
        axios.put(`http://localhost:4000/order/${id}`, {
            "id": id,
            "sku": code,
            "name": name,
            "totalPrice": price,
            "createAt": new Date().toLocaleDateString(),
            "status": status,
            "imgUrl": imgUrl,
            "phone": phone,
            "address": address,
            "productName": productName
        })
            .then((response) => {
                toast.success("Edit Order Successfully!")
            })
            .catch((error) => { toast.error("Something went wrong!") })

    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
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
            <h1 className="text-center mt-3">Manager Orders</h1>
            <div style={{ marginLeft: "44%" }} className="mt-3 mb-3" >
                <input className="input-group-text" value={searchTerm} onChange={handleSearch} placeholder="Search" type="text" />
            </div>
            <div style={{ padding: "0 200px" }}>
                <table id="customers" className="text-center" >
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Product Code</th>
                            <th>Customer Name</th>
                            <th>Customer Phone Number</th>
                            <th>Customer Address</th>
                            <th>Image</th>
                            <th>Total Price</th>
                            <th>Create At</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th>
                                <button className="btn btn-primary"
                                    onClick={handleDeleteAll}
                                >Delete All</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentOrder ?
                            currentOrder.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.sku[0]}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <img src={item.imgUrl[0].imgUrl} alt="Ảnh bị hư rồi" height={120} width={200} />
                                            </td>
                                            <td>{item.totalPrice ? (item.totalPrice).toLocaleString() : item.price} đ</td>
                                            <td>{item.createAt}</td>
                                            <td>{item.status}</td>
                                            <td><button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                Edit
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
                    totalItems={searchTerm == '' ? listOrderAPI.length : searchItems.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
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
                                    <label for="product-name" className="col-form-label">Tên sản phẩm:</label>
                                    {productName ? productName.map(item => {
                                        return (
                                            <>
                                                <input type="text" className="form-control mt-2" id="product-name" defaultValue={item.name}
                                                    disabled />
                                                <input type="text" className="form-control mt-2 mb-5" id="product-name" defaultValue={`So luong ${item.quantity}`}
                                                    disabled />
                                            </>
                                        )
                                    }) : ""}

                                </div>
                                <div className="mb-3">
                                    <label for="sku" className="col-form-label">Tên khách hàng:</label>
                                    <input type="text" className="form-control" id="sku" defaultValue={name}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Số điện thoại:</label>
                                    <input type="text" className="form-control" id="price" defaultValue={phone}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="col-form-label">Địa chỉ:</label>
                                    <input type="text" className="form-control" id="description" defaultValue={address}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3" >
                                    <label>Ảnh sản phẩm</label>
                                    <div style={{ display: "flex", gap: "10px" }} className="mt-2">
                                        {imgUrl ? imgUrl.map(item => {
                                            console.log(item)
                                            return (
                                                <>
                                                    <img src={item.imgUrl} alt="Ảnh lỗi rồi" height={100} width="130px" /> x {item.quantity}
                                                </>
                                            )
                                        }) : ""}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Giá:</label>
                                    <input type="text" className="form-control" id="price" defaultValue={price}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label>Trạng thái đơn hàng</label>
                                    <select className="form-select" value={status}
                                        onChange={(e) => handleChangeStatus(e)}>
                                        <option value="Chờ xác nhận" selected>Chờ xác nhận</option>
                                        <option value="Đã xác nhận">Đã xác nhận</option>
                                        <option value="Đang giao hàng">Đang giao hàng</option>
                                        <option value="Hoàn thành">Hoàn thành</option>
                                    </select>
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
export default ManageOrder