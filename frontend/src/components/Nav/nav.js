import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function Nav() {
    const deslogar = (e) => {
        localStorage.clear();
    }

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
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={deslogar}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;