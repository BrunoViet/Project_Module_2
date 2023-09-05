import Header from "./Header/Header";
import "../User/css/UserOrder.css"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteOrder } from "../../Service/orderAPI";
import { deleteOrderDetail } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function UserOrder() {
    let listOrder = useSelector(state => state.order.listOrderDetail)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [order, setOrder] = useState({})
    const handleShowDetail = (id) => {
        listOrder.map((item, index) => {
            if (item.id == id) {
                setOrder(item)
            }
        })
    }

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id)
            dispatch(deleteOrderDetail(id))
            toast.success("Xóa thành công!")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Header />
            <h1 className="text-center mt-4">Các Đơn Hàng Của Bạn</h1>
            <div style={{ padding: "10px 100px" }}>
                <table id="customers" >
                    <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Số điện thoại liên lạc</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Tổng tiền đơn hàng</th>
                        <th>Actions</th>
                    </tr>
                    {listOrder.length ? listOrder.map((item, index) => {
                        return (
                            <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.status}</td>
                                    <td>{(item.totalPrice).toLocaleString()} đ</td>
                                    <td>
                                        <button onClick={() => handleShowDetail(item.id)} className="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Chi tiết</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Xóa</button>
                                    </td>
                                </tr>
                            </>
                        )
                    }) : ""}
                </table>
            </div>
            <div className="text-center"><button onClick={() => alert("Đang bảo trì tính năng này!")} className="btn btn-primary me-3">Liên hệ với shop</button>
                <button onClick={() => navigate("/")} className="btn btn-warning">Trang chủ</button>
            </div>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label className="form-label mt-2">Tên khách hàng</label>
                            <input type="text" className="form-control" defaultValue={order.name} readOnly
                            />
                            <label className="form-label mt-2">Địa chỉ giao hàng</label>
                            <input type="text" className="form-control" defaultValue={order.address} readOnly
                            />
                            <label className="form-label mt-2">Số điện thoại người nhận</label>
                            <input type="text" className="form-control" defaultValue={order.phone} readOnly
                            />
                            <label className="form-label mt-2">Sản phẩm đã đặt</label>
                            {order.productName ? order.productName.map(item => {
                                return (
                                    <>
                                        <label className="form-label mt-2">{`Tên sản phẩm: ${item.name}. Số lượng: ${item.quantity}`}</label>
                                    </>
                                )
                            }) : ""}
                            <label className="form-label mt-2">Ảnh sản phẩm</label><br />
                            {order.imgUrl ? order.imgUrl.map(item => {
                                return (
                                    <>
                                        <div className="mb-2">
                                            <img src={item.imgUrl} style={{ height: "100px", width: "100px" }} />
                                            <span> x {item.quantity}</span>
                                        </div>
                                    </>
                                )
                            }) : ""}
                            <br />
                            <label className="form-label mt-2">Ngày đặt đơn hàng</label>
                            <input type="text" className="form-control" value={order.createAt} readOnly
                            />
                            <label className="form-label mt-2">Trạng thái đơn hàng</label>
                            <input type="text" className="form-control" value={order.status} readOnly
                            />
                            <label className="form-label mt-2">Tổng tiền đơn hàng</label>
                            <input type="text" className="form-control" value={order.totalPrice} readOnly
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default UserOrder