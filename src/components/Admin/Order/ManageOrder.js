import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../../../common/pagination/Pagination";
import { useNavigate } from "react-router";
import { getTotalPriceOrder } from "../../../Service/orderAPI";

function ManageOrder() {
    const [isChanged, setIsChanged] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentOrder, setCurrentOrder] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [listOrderAPI, setListOrderAPI] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate()
    const localStorageUser = JSON.parse(localStorage.getItem('admin'))

    if (!localStorageUser) {
        navigate("/login")
    }
    useEffect(() => {
        getListOrderAPI()
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

    const getListOrderAPI = async () => {
        try {
            const orders = await getTotalPriceOrder()
            setListOrderAPI(orders)
        } catch (error) {
            toast.error("Something went wrong!")
        }
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
                            <th>Serial Number</th>
                            <th>User Id</th>
                            <th>Order At</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Note</th>
                            <th>Created At</th>
                            <th>Created By ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentOrder ?
                            currentOrder.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.serial_number}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.order_at}</td>
                                            <td>{(item.total_price_user).toLocaleString()}đ</td>
                                            <td>
                                                <select value={item.status} disabled type="text" className="form-control">
                                                    <option value={"Từ chối"}>Từ chối</option>
                                                    <option value={"Chờ xác nhận"}>Chờ xác nhận</option>
                                                    <option value={"Đã xác nhận"}>Đã xác nhận</option>
                                                    <option value={"Đã hoàn thành"}>Đã hoàn thành</option>
                                                </select>
                                            </td>
                                            <td>{item.note}</td>
                                            <td>{item.created_at}</td>
                                            <td>{item.created_by_id}</td>
                                            <td><button className="btn btn-warning me-2"
                                                onClick={() => navigate(`/order_user/${item.user_id}`)}
                                            >
                                                Detail
                                            </button>
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
        </>
    )
}
export default ManageOrder