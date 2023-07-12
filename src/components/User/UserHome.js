import Header from "./Header/Header"
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UserHome.css"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";

function UserHome() {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const [listProduct, setListProduct] = useState([])
    const [listCategory, setListCategory] = useState([])
    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if (!userLogin) {
        navigate("/userlogin")
    }

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
        axios.get("http://localhost:4000/category")
            .then(function (response) {
                //Xử lí khi thành công
                setListCategory(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [])

    const handleAddToCart = (item) => {
        dispatch(addProductToCart({ ...item, quantity: Number(quantity) }))
        navigate('/cart')
    }

    const handleShowDetails = (id) => {
        navigate(`/detail/${id}`)
    }

    const handleCategory=(name)=>{
        navigate(`/category/${name}`)
    }
    return (
        <>
            <Header />
            <Carousel data-bs-theme="dark" style={{
                height: "700px",
                background: "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)"
            }}>
                <Carousel.Item style={{ padding: "0 500px" }}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.fptshop.com.vn/Uploads/Originals/2023/2/2/638109316755419553_asus-vivobook-m513ua-ej704w-r7-5700u-bac-dd.jpg"
                        alt="First slide"
                        height="700px"
                    />
                    <Carousel.Caption style={{ color: "green", paddingBottom: "250px" }}>
                        <p style={{ fontSize: "50px" }}>Laptop Shop</p>
                        <p style={{ fontSize: "40px" }}>Sản phẩm chất lượng số 1 Việt Nam</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ padding: "0 500px" }}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.tgdd.vn/Products/Images/44/303562/lenovo-ideapad-1-15amn7-r5-82vg0061vn-thumb-laptop-1-600x600.jpg"
                        alt="Second slide"
                        height="700px"
                    />

                    <Carousel.Caption style={{ color: "red", paddingBottom: "250px" }}>
                        <h3 style={{ fontSize: "50px" }}>Chất lượng tạo nên thương hiệu</h3>
                        <p style={{ fontSize: "40px" }}>Bảo hành, ưu đãi lên đến 50% đón chào mùa hè</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ padding: "0 500px" }}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.tgdd.vn/Products/Images/44/296847/dell-inspiron-15-3520-i5-n5i5122w1-191222-091429-600x600.jpg"
                        alt="Third slide"
                        height="700px"

                    />

                    <Carousel.Caption style={{ color: "pink", paddingBottom: "250px" }}>
                        <h3 style={{ fontSize: "50px" }}>Giờ vàng giảm giá</h3>
                        <p style={{ fontSize: "40px" }}>
                            Hãy nắm bắt và săn đón các sự kiện
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="text-center pb-3 pt-3 text-warning" style={{ background: "linear-gradient(#e66465, #9198e5)" }}>
                <h1>Sản phẩm</h1>
            </div>
            <div className="row" style={{ padding: "0 300px", background: "linear-gradient(to right, #fffbd5, #b20a2c)" }}>
                {listProduct.map(item => {
                    return (
                        <>
                            <Card className="col-4 mb-3 mt-3" style={{ padding: "0 20px" }}>
                                <Card.Img variant="top" src={item.imgUrl} height="300px" width="100px" />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "40px", fontWeight: "bold" }}>{item.productName}</Card.Title>
                                    <Card.Text style={{ fontSize: "20px" }}>
                                        {item.description}
                                    </Card.Text>
                                    <div className="mb-2">
                                        Số lượng <span><input
                                            onChange={(e) => setQuantity(e.target.value)}
                                            type="number" min={1} className="input-group-text" /> </span>
                                    </div>
                                    <Button variant="warning" className="me-4" style={{ marginLeft: "90px" }}
                                        onClick={() => handleShowDetails(item.id)}
                                    >Chi tiết</Button>
                                    <Button variant="primary" onClick={() => handleAddToCart(item)} disabled={quantity ? false : true}>Đặt hàng</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </div>
            <div className="text-center pb-3 pt-3 text-danger" style={{ background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" }}>
                <h1>Thương hiệu nổi bật</h1>
            </div>
            <div className="row" style={{ padding: "0 300px", background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)" }}>
                {listCategory.map(item => {
                    return (
                        <>
                            <Card className="col-4 mb-3 mt-3" style={{ padding: "0 20px" }}>
                                <Card.Img variant="top" src={item.imgUrl} height="300px" width="100px" />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "40px", fontWeight: "bold", color: "red" }}>{item.name}</Card.Title>
                                    <Card.Text style={{ fontSize: "20px", color: "blue", fontWeight: "bold" }}>
                                        Xuất xứ: {item.original}
                                    </Card.Text>
                                    <Button variant="primary" style={{ marginLeft: "130px" }} onClick={()=>handleCategory(item.name)}>Sản phẩm</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </div>
            <div className="text-center pb-3 pt-3 text-danger" style={{ background: "linear-gradient(to right, #DECBA4, #3E5151)" }}>
                <h1>Vị trí cửa hàng</h1>
            </div>
            <div className="pt-3 pb-3" style={{ padding: "0 200px", background: "linear-gradient(to right, #8360c3, #2ebf91)" }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.6393796719207!2d108.2095385696243!3d16.036533387956734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142199388f2bd49%3A0xd9a4963781c02c50!2zMzYzIE5ndXnhu4VuIEjhu691IFRo4buNLCBLaHXDqiBUcnVuZywgQ-G6qW0gTOG7hywgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1689062963447!5m2!1svi!2s" width="100%" height="1000" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default UserHome