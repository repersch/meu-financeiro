import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className="nav-link" to='/financa' >Principal</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/usuario' >Usuário</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/sobre' >Sobre</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;