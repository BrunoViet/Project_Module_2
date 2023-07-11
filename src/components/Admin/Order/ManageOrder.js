import Header from "../../Header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageOrder() {
    const [listOrders, setListOrders] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    let selectedProduct = []
    const [id, setId] = useState()
    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [status, setStatus] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [createdAt, setCreatedAt] = useState()
    
    useEffect(() => {
        axios.get("http://localhost:4000/order")
            .then(function (response) {
                //Xử lí khi thành công
                setListOrders(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [isChanged])

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
        listOrders.map(item => {
            if (item.id === id) {
                setName(item.name)
                setCode(item.sku)
                setPrice(item.price)
                setImgUrl(item.imgUrl)
                setQuantity(item.quantity)
                setCreatedAt(item.createdAt)
                setStatus(item.status)
                setAddress(item.address)
                setPhone(item.phone)
                setId(item.id)
                setCreatedAt(item.createAt)
            }
        })
    }


    const handleSaveEdit = () => {
        setIsChanged(!isChanged)
        axios.put(`http://localhost:4000/order/${id}`, {
            "id": id,
            "sku": code,
            "name": name,
            "price": price,
            "quantity": quantity,
            "total": Number(price) * Number(quantity),
            "createAt": createdAt,
            "status": status,
            "imgUrl": imgUrl,
            "phone": phone,
            "address": address
        })
            .then((response) => {
                toast.success("Edit Order Successfully!")
            })
            .catch((error) => { toast.error("Something went wrong!") })

    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    return (
        <>
            <Header />
            <h1 className="text-center mt-3">Manager Orders</h1>
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
                            <th>Price</th>
                            <th>Quantity</th>
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
                        {listOrders ?
                            listOrders.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.sku}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <img src={item.imgUrl} alt="Ảnh bị hư rồi" height={120} width={200} />
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
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
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Order</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="product-name" className="col-form-label">Mã sản phẩm:</label>
                                    <input type="text" className="form-control" id="product-name" defaultValue={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="sku" className="col-form-label">Tên khách hàng:</label>
                                    <input type="text" className="form-control" id="sku" defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Số điện thoại:</label>
                                    <input type="text" className="form-control" id="price" defaultValue={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="col-form-label">Địa chỉ:</label>
                                    <input type="text" className="form-control" id="description" defaultValue={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="image" className="col-form-label">Url Image:</label>
                                    <input type="text" className="form-control" id="image" defaultValue={imgUrl}
                                        onChange={(e) => setImgUrl(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Giá:</label>
                                    <input type="text" className="form-control" id="price" defaultValue={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="quantity" className="col-form-label">Số lượng:</label>
                                    <input type="number" className="form-control" id="quantity" defaultValue={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
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