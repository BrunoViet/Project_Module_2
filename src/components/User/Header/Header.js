import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    let userNameLogin = userLogin ? userLogin.userName : ""
    const handleLogout = () => {

        localStorage.removeItem('user')
        navigate("/userlogin")
    }
    return (
        <>
            <Nav style={{ padding: "0 100px", backgroundColor: "silver" }}>
                <Nav.Item>
                    <Nav.Link style={{ width: "200px", backgroundColor: "blue", height: "100%" }}>
                        <Link to="/" className="nav-link" style={{ textDecoration: "none", fontSize: "20px", fontWeight: "bold", color: "white" }}>LapTop Shop</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{ width: "160px" }}><Link to="/cart" className="nav-link" style={{ textDecoration: "none", fontSize: "20px", color: "black" }}>Giỏ hàng</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{ width: "200px" }}><Link to="/" className="nav-link" style={{ textDecoration: "none", fontSize: "20px", color: "black" }}>Thanh toán</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{ width: "150px" }}>
                        <Link to="/" className="nav-link" style={{ textDecoration: "none", fontSize: "20px", color: "black" }}>Về Shop</Link>
                    </Nav.Link>
                </Nav.Item>
                <div class="input-group mb-3" style={{ width: "500px", marginTop: "10px", marginLeft: "100px" }}>
                    <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm" aria-label="Tìm kiếm sản phẩm" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2" style={{ height: "50px" }}>Tìm kiếm</span>
                    </div>
                </div>
                <div style={{ marginLeft: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h3 className="text-primary me-3" >{userLogin ? "Hello " + userNameLogin + "!" : "Hello"}</h3>
                    <button className="btn btn-success" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </Nav>
        </>
    )
}

export default Header