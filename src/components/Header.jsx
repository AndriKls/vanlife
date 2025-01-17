import { Link } from "react-router-dom"

export default function Header() {
    return (
       <header>
            <nav>
                    <Link className="header-title" to="/">#VANLIFE</Link>
                <div className="nav-links">
                    <Link to="/about">About</Link>
                    <Link to="/vans">Vans</Link>
                </div>
            </nav>
       </header> 
    )
}