import { useState, useEffect } from "react"
import Header from "./Header/Header"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { addProductToCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

function UserDetail() {
    const { id } = useParams()
    const [listProduct, setListProduct] = useState([])
    const [productName, setProductName] = useState()
    const [productCode, setProductCode] = useState()
    const [category, setCategory] = useState()
    const [price, setPrice] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [description, setDescription] = useState()
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get("http://localhost:4000/product")
            .then(function (response) {
                //Xử lí khi thành công
                setListProduct(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })

    }, [])

    useEffect(() => {
        listProduct.map(item => {
            if (item.id === Number(id)) {
                setProductName(item.productName)
                setProductCode(item.productCode)
                setCategory(item.category)
                setPrice(item.price)
                setImgUrl(item.imgUrl)
                setDescription(item.description)
                setProduct(item)
            }
        })
    })
    const handleRedirect = () => {

        navigate("/")
    }

    const handleRedirectOrder = () => {
        dispatch(addProductToCart({ ...product, quantity: 1 }))
        toast.success("Sản phẩm đã được thêm vào giỏ hàng của bạn")
        if (window.confirm("Bạn muốn đặt hàng tiếp không?")) {
            navigate("/")
        } else {
            navigate("/cart")
        }
    }


    return (
        <>
            <Header />
            <h1 className="text-center pt-2 pb-2" style={{ background: "linear-gradient(#e66465, #9198e5)", margin: 0 }}>Thông tin chi tiết sản phẩm</h1>
            <div style={{ display: "flex", paddingTop: "0px", padding: "0 200px", background: "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)" }}>
                <img style={{ padding: "50px 0", marginTop: "30px" }} src={imgUrl} height={400} />
                <div className="text-center" style={{ padding: "0 200px", paddingTop: "20px", color: "yellow" }}>
                    <h2>{productName}</h2>
                    <h3>Mã sản phẩm: {productCode}</h3>
                    <h3>Thương hiệu: {category}</h3>
                    <h3>Giá tiền: {price} đ</h3>
                    <h3>Mô tả sản phẩm: {description}</h3>
                </div>
            </div>
            <div style={{ textAlign: "center" }} className="mt-3 mb-3">
                <button className="btn btn-success me-2" onClick={handleRedirect}>Về trang chủ</button>
                <button className="btn btn-primary" onClick={handleRedirectOrder}>Đặt hàng</button>
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
export default UserDetail