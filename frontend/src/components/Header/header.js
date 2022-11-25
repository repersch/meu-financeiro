import logo from '../../assets/img/logo.png';

function Header() {
    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="logo" width="400" height="250" />
                <div>
                    <p>Desenvolvido por João Mateus | Renata Camacho</p>
                </div>
            </div>
        </header>
    )
}

export default Header;