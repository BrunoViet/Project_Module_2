import { useNavigate, useParams } from "react-router"
import Header from "../Header/Header"
import { useState, useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addProductToCart } from "../../../actions/cartActions";
import { useDispatch } from "react-redux";
import { resetProduct } from "../../../actions/userAction";
import { getProductByCategory } from "../../../Service/productAPI";


function Category() {
    const name = useParams()
    const [listProduct, setListProduct] = useState([])
    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        getProductByCategoryFromAPI()
    }, [])

    const getProductByCategoryFromAPI = async () => {
        try {
            const product = await getProductByCategory(name.category)
            setListProduct(product)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = (item) => {
        dispatch(addProductToCart({ ...item, quantity: Number(quantity) }))
        navigate('/cart')
    }

    const handleRedirect = () => {
        dispatch(resetProduct())
        navigate("/")
    }

    const handleShowDetails = (id) => {
        navigate(`/detail/${id}`)
    }
    return (
        <>
            <Header />
            <h1 className="text-center">Danh mục sản phẩm</h1>
            <h2 className="text-center">Thương hiệu {name.category}</h2>
            <div className="row" style={{ padding: "0 300px", background: "linear-gradient(to right, #fffbd5, #b20a2c)", maxHeight: "fit-content" }}>
                {listProduct.map(item => {
                    return (
                        <>
                            <Card className="col-4 mb-3 mt-3 me-3" style={{ padding: "0 20px" }}>
                                <Card.Img variant="top" src={item.image} height="300px" width="100px" />
                                <Card.Body>
                                    <div>
                                        <Card.Title style={{ fontSize: "40px", fontWeight: "bold", height: "400px" }}>{item.name}</Card.Title>
                                    </div>
                                    <Card.Text style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                                        {item.unit_price} đ
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
            <div className="text-center mt-3"><button className="btn btn-primary " onClick={handleRedirect}>Về trang chủ</button></div>
        </>
    )
}

export default Category