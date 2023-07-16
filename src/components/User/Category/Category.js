import { useNavigate, useParams } from "react-router"
import Header from "../Header/Header"
import { useState, useEffect } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addProductToCart } from "../../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryProduct, resetProduct } from "../../../actions/userAction";


function Category() {
    const name = useParams()

    const [listProduct, setListProduct] = useState([])

    const [category, setCategory] = useState()

    const [quantity, setQuantity] = useState()

    const [isShow, setIsShow] = useState(false)

    let newList = useSelector(state => state.user.listUsers)


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
        setCategory(name.category)
    }, [])

    const handleShow = () => {
        setIsShow(!isShow)
        let newProduct = listProduct.filter(item => item.category == category)
        dispatch(getCategoryProduct(newProduct))
    }

    const handleAddToCart = (item) => {
        dispatch(addProductToCart({ ...item, quantity: Number(quantity) }))
        navigate('/cart')
    }

    const handleRedirect = () => {
        dispatch(resetProduct())
        navigate("/")
    }
    return (
        <>
            <Header />
            <h1 className="text-center">Danh mục sản phẩm</h1>
            <h2 className="text-center">Thương hiệu {category}</h2>
            <div className=" text-center mt-3 mb-2"><button className="btn btn-success"
                onClick={handleShow}
            >{isShow ? "Ẩn danh sách sản phẩm" : "Hiển thị sản phẩm"}</button></div>
            {isShow ? <div className="row" style={{ padding: "0 100px", background: "linear-gradient(to right, #fffbd5, #b20a2c)" }}>
                {newList.map(item => {
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
                                    <Button variant="primary" onClick={() => handleAddToCart(item)} disabled={quantity ? false : true}>Đặt hàng</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </div> : ""}

            <div className="text-center mt-3"><button className="btn btn-primary " onClick={handleRedirect}>Về trang chủ</button></div>
        </>
    )
}

export default Category