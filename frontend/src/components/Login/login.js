import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import api from '../../service/api.js';

function Login() {
    const navigate = useNavigate();

    const [state, setState] = useState([]);
    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

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

    const logarUsuario = (e) => {
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
                    toast.success("Usuário logado com sucesso!");
                    localStorage.setItem('usuarioInfo', JSON.stringify({ ...usuarioAutenticado })
                    );

                    navigate(`/financa`);
                }
                else {
                    toast.error("Usuário e/ou senha incorreto(s)!");
                    console.log(`Erro! Requisição com código ${resposta.status}`);
                }
            })
            .catch((erro) => {
                // Tratamento de erro de execução
                console.log("Erro ao realizar o fetch");
                toast.error("Usuário e/ou senha incorreto(s)!");
                setErro({
                    hasErro: true,
                    mensagemErro: "Erro ao realizar o fetch"
                });
            })
    };

    const formularioCadastro = ({
        nome: "",
        senha: ""
    });


    const [formCadastro, setFormCadastro] = useState(formularioCadastro);

    const tratarFormCadastro = (e) => {
        setFormCadastro({
            ...formCadastro,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const cadastrarUsuario = (e) => {
        const usuarioParaCadastrar = {
            'nome': formCadastro.nome,
            'senha': formCadastro.senha
        };

        api.post('/usuario/salvar', usuarioParaCadastrar)
            .then(resposta => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setShow(false);
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
                
                <div id="login-container">
                    <Modal show={show} onHide={fecharModal} className="modal-container">
                        <Modal.Header closeButton>
                            <Modal.Title>Novo Usuário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group style={{ padding: '10px', margin: '20px' }}>
                                    <Form.Control className='formControl'
                                        style={{ padding: '10px', margin: '20px' }}
                                        type="text"
                                        placeholder="Nome"
                                        onChange={tratarFormCadastro}
                                        name="nome" />

                                    <Form.Control className='formControl'
                                        style={{ padding: '10px', margin: '20px' }}
                                        type="text"
                                        placeholder="Senha"
                                        onChange={tratarFormCadastro}
                                        name="senha" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={fecharModal}>
                                Fechar
                            </Button>
                            <Button variant="success" onClick={cadastrarUsuario}>
                                Cadastrar usuário
                            </Button>
                        </Modal.Footer>

                    </Modal>

                    <Form id="login-info-form">
                        <Form.Group>
                        <h2>Login</h2>
                            <Form.Control className='formControl'
                                style={{ padding: '10px', width: '235px', margin: '20px' }}
                                type="text"
                                placeholder="Login"
                                onChange={handleChange}
                                name="username"
                            />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', width: '235px', margin: '20px' }}
                                type="password"
                                placeholder="Senha"
                                onChange={handleChange}
                                name="password" />
                            <Button variant="primary" onClick={abrirModal} style={{ margin: '20px' }}>
                                Cadastre-se
                            </Button>
                            <Button variant="success" onClick={logarUsuario} style={{ margin: '20px' }}>
                                Logar
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </section>
        </div>
    );
}

export default Login;