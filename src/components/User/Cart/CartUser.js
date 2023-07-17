import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header"
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import { deleteProduct, resetCart } from "../../../actions/cartActions";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

function CartUser() {
    let cartList = useSelector(state => state.cart.listProducts)
    const [quantity, setQuantity] = useState(1)
    const [userName, setUserName] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userAddress, setUserAddress] = useState()
    const dispatch = useDispatch()
    const [listOrder, setListOrder] = useState([])
    const navigate = useNavigate()
    const [isValid, setIsValid] = useState(false)
    let productCodeListCart = []
    let productNameListCart = []
    let productPriceListCart = []
    let productImgListCart = []
    let totalPrice = 0
    cartList.map(item => {
        productPriceListCart.push(Number(item.quantity * item.price))
        productCodeListCart.push(item.productCode)
        productNameListCart.push({ name: item.productName, quantity: item.quantity })
        productImgListCart.push({ imgUrl: item.imgUrl, quantity: item.quantity })
    })

    productPriceListCart.forEach(item => {
        totalPrice += item
    })

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        toast.success("Xoá thành công!!")
    }

    useEffect(() => {
        axios.get("http://localhost:4000/order")
            .then(function (response) {
                //Xử lí khi thành công
                setListOrder(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [])

    const handleOrder = () => {
        if (!userName && !userPhone && !userAddress) {
            toast.error("Vui lòng điền đầy đủ thông tin!")
            setIsValid(true)
        } else {
            axios.post("http://localhost:4000/order", {
                sku: productCodeListCart,
                name: userName,
                phone: userPhone,
                address: userAddress,
                imgUrl: productImgListCart,
                productName: productNameListCart,
                createAt: new Date().toLocaleDateString(),
                status: "Chờ xác nhận",
                totalPrice: totalPrice
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })

            toast.success("Đặt hàng thành công. Cảm ơn Quý khách!")
            dispatch(resetCart())
            navigate("/")
            setIsValid(false)
        }

    }

    const handleRedirect = () => {
        navigate("/")
    }
    return (
        <>
            <Header />
            <h1 className="text-center text-primary mt-3">Giỏ hàng của bạn</h1>
            <div style={{ padding: "0 200px" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList.map(item => {
                            return (
                                <>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.productName}</td>
                                        <td>
                                            <img src={item.imgUrl} height={150} width={200} />
                                        </td>
                                        <td>{Number(item.price).toLocaleString()} đ</td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>{Number(item.quantity * item.price).toLocaleString()} đ</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xoá</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
                <h2 className="text-center mb-3" style={{ fontWeight: "bold", color: "brown" }}>Tổng tiền phải thanh toán: {(totalPrice).toLocaleString()} đ</h2>
                <div className="text-center mb-3">
                    <button className="btn btn-secondary me-3" onClick={handleRedirect}>Về trang chủ</button>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Đặt hàng</button>
                </div>
            </div>
            <div className="footer">
                <div style={{ display: "flex", flexDirection: "row", marginLeft: "40%", gap: "30px", fontSize: "50px" }}>
                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-youtube"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                </div>

                <div className="row">
                    <ul >
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>

                <div style={{ color: "white" }} >
                    Copyright © 2023 Laptop Shop - All rights reserved || Designed By: Tran Do Quoc Viet
                </div>
            </div >


            {/* Modal  */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Thông tin đặt hàng</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label className="form-label mt-2">Họ và tên</label>
                            <input type="text" className="form-control"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <label className="form-label mt-2">Số điện thoại</label>
                            <input type="text" className="form-control"
                                onChange={(e) => setUserPhone(e.target.value)}
                            />
                            <label className="form-label mt-2">Địa chỉ</label>
                            <input type="text" className="form-control"
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                            <h2>Tổng tiền phải thanh toán là {(totalPrice).toLocaleString()} đ</h2>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss={isValid ? "modal" : ""}
                                onClick={handleOrder}
                            >Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartUser