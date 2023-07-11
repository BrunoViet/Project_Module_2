import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header"
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import { deleteProduct } from "../../../actions/cartActions";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

function CartUser() {
    const cartList = useSelector(state => state.cart.listProducts)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const [listOrder, setListOrder] = useState([])
    const navigate = useNavigate()
    let productCodeListCart = []
    let productNameListCart = []
    let productPriceListCart = []
    let totalPrice = 0
    cartList.map(item => {
        productPriceListCart.push(Number(item.quantity * item.price))
        productCodeListCart.push(item.productCode)
        productNameListCart.push(item.productName)
    })

    productPriceListCart.forEach(item => {
        totalPrice += item
    })
    console.log(totalPrice)
    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
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

        cartList.map(item => {
            axios.post("http://localhost:4000/order", {

            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        })
        toast.success("Add new product successfully!");

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
                <h2 className="text-center mb-3" style={{ fontWeight: "bold" }}>Tổng tiền phải thanh toán: {totalPrice}</h2>
                <div className="text-center mb-3">
                    <button className="btn btn-secondary me-3" onClick={handleRedirect}>Về trang chủ</button>
                    <button className="btn btn-success" onClick={handleOrder}>Đặt hàng</button>
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
        </>
    )
}
export default CartUser