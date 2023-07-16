import { useNavigate } from "react-router";
import "./Header.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const localStorageUser = JSON.parse(localStorage.getItem('userLogin'))
    const navigate = useNavigate()

    if (!localStorageUser) {
        navigate("/login")
    }



    const handleLogout = () => {
        localStorage.removeItem('userLogin');

        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active text-center">
                                <Link to="/home" className="nav-link">Manager User</Link>
                            </li>
                            <li className="nav-item text-center">
                                <Link to="/products" className="nav-link">Manager Products</Link>
                            </li>
                            <li className="nav-item text-center">
                                <Link to="/order" className="nav-link">Manager Order</Link>
                            </li>
                        </ul>
                        <h3 className="text-primary me-3">{localStorageUser ? `Hello ${localStorageUser.userName}!` : navigate("/login")}</h3>
                        <button className="btn btn-success me-5" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header