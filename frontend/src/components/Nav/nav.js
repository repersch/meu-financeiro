import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' >Início</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/usuario' >Usuário</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/financa' >Finanças</Link>
                </li>

{/*                 <li class="nav-item">
                    <a class="nav-link" href="#">Contato</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Logout</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                        aria-expanded="true">Finanças</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                </li> */}
            </ul>
        </nav>

    )
}

export default Nav;