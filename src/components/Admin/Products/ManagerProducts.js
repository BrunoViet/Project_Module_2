import { useSelector, useDispatch } from "react-redux"
import Header from "../../Header/Header"
import "./ManagerProducts.css"
import { useState, useEffect } from "react"
import { addProducttoList } from "../../../actions/productActions"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserLoginInfo } from "../../../actions/userAction"
import { useNavigate } from "react-router"

function ManagerProducts() {
    const productRedux = useSelector(state => state.products.listProducts)
    const [productName, setProductName] = useState()
    const [productCode, setProductCode] = useState()
    const [category, setCategory] = useState()
    const [createAt, setCreatedAt] = useState(new Date())
    const [price, setPrice] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [description, setDescription] = useState()
    const [listProducts, setListProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isChanged, setIsChanged] = useState(false)
    const [id, setId] = useState()
    let selectedProduct = []
    const [isEdit, setIsEdit] = useState(false)

    const localStorageUser = JSON.parse(localStorage.getItem('userLogin'))
    const userLoginInfo = useSelector(state => state.user.listUsers)
    useEffect(() => {
        dispatch(getUserLoginInfo(localStorageUser))
    }, [])

    if (!localStorageUser) {
        navigate("/login")
    }

    useEffect(() => {
        axios.get("http://localhost:4000/product")
            .then(function (response) {
                //Xử lí khi thành công
                setListProducts(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [isChanged])

    const handleAdd = () => {
        setIsChanged(!isChanged)
        axios.post("http://localhost:4000/product", {
            productName: productName,
            productCode: productCode,
            category: category,
            createAt: createAt,
            price: price,
            imgUrl: imgUrl,
            description: description,
        })
            .then(response => {
                toast.success("Add new product successfully!");

            })
            .catch(error => {
                toast.error("Something went wrong!")
            })

        // setProductName("")
        // setProductCode("")
        // setPrice("")
        // setImgUrl("")
        // setCategory("")
        // setCreatedAt("")
        // setDescription("")
        // setId("")
    }

    const handleEdit = (id) => {
        setIsEdit(!isEdit)
        listProducts.map(item => {
            if (item.id === id) {
                setProductName(item.productName)
                setProductCode(item.productCode)
                setPrice(item.price)
                setImgUrl(item.imgUrl)
                setCategory(item.category)
                setCreatedAt(item.createdAt)
                setDescription(item.description)
                setId(item.id)
            }
        })
    }

    const handleSaveEdit = () => {
        setIsEdit(!isEdit)
        setIsChanged(!isChanged)
        // setProductName("")
        // setProductCode("")
        // setPrice("")
        // setImgUrl("")
        // setCategory("")
        // setCreatedAt("")
        // setDescription("")
        // setId("")
        axios.put(`http://localhost:4000/product/${id}`, {
            "productName": productName,
            "productCode": productCode,
            "category": category,
            "createAt": createAt,
            "price": price,
            "imgUrl": imgUrl,
            "description": description,
            "id": id
        })
            .then((response) => {
                toast.success("Edit Product Successfully!")
            })
            .catch((error) => { toast.error("Something went wrong!") })


    }

    const handleDeleteProduct = (id) => {
        setIsChanged(!isChanged)
        if (window.confirm("Bạn có chắc chắn xóa sản phẩm này không?")) {
            axios.delete(`http://localhost:4000/product/${id}`)
                .then((response) => { toast.success("Delete Product Successfully!") })
                .catch((error) => { toast.error("Something went wrong!") })
        }

    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm này không?")) {
            selectedProduct.forEach(productId => {
                axios.delete(`http://localhost:4000/product/${productId}`)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }
        toast.success("Delete all product chosen successfully")
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
    return (
        <>
            <Header />

            <h1 className="text-center mt-3">Manager Products</h1>
            <div className="text-center mt-3">
                <button className="btn btn-primary me-2 mb-2"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                    Add Products
                </button>
            </div>
            <div style={{ padding: "0 200px" }}>
                <table id="customers" className="text-center" >
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Code</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Create At</th>
                            <th>Description</th>
                            <th>Actions</th>
                            <th>
                                <button className="btn btn-primary"
                                    onClick={handleDeleteAll}
                                >Delete All</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {listProducts ?
                            listProducts.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.productCode}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img src={item.imgUrl} alt="Ảnh bị hư rồi" height={120} width={200} />
                                            </td>
                                            <td>{item.createAt}</td>
                                            <td>{item.description}</td>
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
                            <h5 className="modal-title" id="exampleModalLabel">Add Products to List</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="product-name" className="col-form-label">Tên sản phẩm:</label>
                                    <input type="text" className="form-control" id="product-name" defaultValue={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="sku" className="col-form-label">Mã sản phẩm:</label>
                                    <input type="text" className="form-control" id="sku" defaultValue={productCode}
                                        onChange={(e) => setProductCode(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="category" className="col-form-label">Phân loại sản phẩm:</label>
                                    <select value={category} className="form-control" id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="DELL" selected>DELL</option>
                                        <option value="ASUS">ASUS</option>
                                        <option value="ACER">ACER</option>
                                        <option value="ThinkPad">ThinkPad</option>
                                        <option value="Macbook">Macbook</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Đơn giá:</label>
                                    <input type="number" min={100000} className="form-control" id="price" defaultValue={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="col-form-label">Mô tả:</label>
                                    <textarea type="text" className="form-control" id="description" defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="image" className="col-form-label">Url Image:</label>
                                    <input type="text" className="form-control" id="image" defaultValue={imgUrl}
                                        onChange={(e) => setImgUrl(e.target.value)}
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {isEdit ? <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={handleSaveEdit}
                            >Edit Products</button> : <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={handleAdd}
                            >Add Products</button>}


                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagerProducts