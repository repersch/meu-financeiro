import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../service/api.js';

function Login() {
    const navigate = useNavigate();

    const formularioInicial = ({
        username: "",
        password: ""
    });

    const [formData, updateFormData] = useState(formularioInicial);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        const usuarioLogin = {
            'username': formData.username,
            'password': formData.password
        };

        api.post('/usuario/login', usuarioLogin, {
            headers: {
                'username': formData.username,
                'password': formData.password
            }
        })
            .then(resposta => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    const usuarioAutenticado = {
                        'token': resposta.data.token,
                        'idUsuario': resposta.data.idUsuario
                    }

                    localStorage.setItem('usuarioInfo', JSON.stringify({ ...usuarioAutenticado })
                    );

                    navigate(`/financa`);
                }
                else {
                    console.log(`Erro! Requisição com código ${resposta.status}`);
                }
            })
            .catch((erro) => {
                // Tratamento de erro de execução
                console.log("Erro ao realizar o fetch");
                setErro({
                    hasErro: true,
                    mensagemErro: "Erro ao realizar o fetch"
                });
            })
    };

    // Sugestão para tratamento de erros (bem simplificado)
    const [erro, setErro] = useState({
        hasErro: false,
        mensagemErro: ""
    });

    return (
        <div>
            <section id="login-section">
                <h2>Login</h2>
                <div id="login-container">
                    <Form id="login-info-form">
                        <Form.Group>
                            <Form.Control className='formControl'
                                style={{ padding: '10px', width: '235px', margin: '20px' }}
                                type="text"
                                placeholder="Usuário"
                                onChange={handleChange}
                                name="username"
                            />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', width: '235px', margin: '20px' }}
                                type="password"
                                placeholder="Senha"
                                onChange={handleChange}
                                name="password" />
                            <a href="#" style={{ margin: '20px' }}>Cadastre-se</a>
                            <Button variant="success" onClick={handleSubmit} style={{ margin: '20px' }}>
                                Entrar
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </section>
        </div>
    );
}

export default Login;