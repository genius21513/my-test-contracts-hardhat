import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">                        
                        <li className="nav-item active">
                            <Link to="/CT" className="nav-link">CustomizeToken</Link>                            
                        </li>
                        <li className="nav-item">
                            <Link to="/NFT_MP" className="nav-link">NFT Market Place</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="mt-3">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default Layout;