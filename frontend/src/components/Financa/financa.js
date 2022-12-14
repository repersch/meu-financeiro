import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import api from '../../service/api.js';

import BotaoEditar from './BotaoEditar/botaoEditar.js';
import BotaoDeletar from './BotaoDeletar/botaoDeletar.js';
import BotaoAdicionarFinanca from '../../assets/img/botao-adicionar-financa.png'

function Financa() {
    const localStorageItens = JSON.parse(localStorage.getItem('usuarioInfo'));

    const [usuario, setUsuario] = useState([]);

    const [state, setState] = useState([]);
    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    const totalDespesas = calcularTotal("Despesa").toFixed(2)
    const totalReceitas = calcularTotal("Receita").toFixed(2)

    const [erro, setErro] = useState({
        hasErro: false,
        mensagemErro: ""
    });

    const formularioInicial = ({
        descricao: "",
        valor: 0.0,
        tipo: "",
        categoria: "",
        idUsuario: localStorageItens.idUsuario
    });

    const [formData, updateFormData] = useState(formularioInicial);
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        });
    };

    const [tipoFinanca, setTipoFinanca] = useState("");
    const tratarRadio = (e) => {
        setTipoFinanca(e.target.value)
    }

    const enviarModal = (e) => {
        
        const financaParaSalvar = {
            descricao: formData.descricao,
            valor: formData.valor,
            tipo: tipoFinanca,
            categoria: formData.categoria,
            idUsuario: localStorageItens.idUsuario
        };

        api.post('/financa/salvar', financaParaSalvar, {
            headers: {
                'x-access-token': localStorageItens.token
            }
        })
            .then((resposta) => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setState(resposta.data)
                }
                else {
                    console.log(`Erro! Requisi????o com c??digo ${resposta.status}`);
                }})
            .catch((erro) => {
                console.log("Erro ao realizar o fetch");
                setErro({
                    hasErro: true,
                    mensagemErro: "Erro ao realizar o fetch"
                });
            });
        setShow(false);
        window.location.reload();
    };

    useEffect(() => {
        api
            .get(`/financa/usuario/${localStorageItens.idUsuario}`, {
                headers: {
                    'x-access-token': localStorageItens.token
                }
            })
            .then((resposta) => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setState(resposta.data)
                }
                else {
                    console.log(`Erro! Requisi????o com c??digo ${resposta.status}`);
                }
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    useEffect(() => {
        api
            .get(`/usuario/${localStorageItens.idUsuario}`, {
                headers: {
                    'x-access-token': localStorageItens.token
                }
            })
            .then((resposta) => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setUsuario(resposta.data)
                }
                else {
                    console.log(`Erro! Requisi????o com c??digo ${resposta.status}`);
                }
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    function calcularTotal(tipoFinanca) {
        return state
            .filter(financa => financa.tipo === tipoFinanca)
            .reduce((totalReceitas, receita) => totalReceitas + receita.valor, 0)
    }

    return (
        <div id='principal'>
            <Modal show={show} onHide={fecharModal} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Nova Finan??a</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group required style={{ padding: '10px', margin: '20px' }}>
                            <Form.Control className='formControl'
                                required
                                style={{ padding: '10px', margin: '20px' }}
                                type="text"
                                placeholder="Descri????o"
                                onChange={handleChange}
                                name="descricao" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px' }}
                                type="text"
                                placeholder="Categoria"
                                onChange={handleChange}
                                name="categoria" />

                            <div style={{ padding: '10px', margin: '20px' }}>
                                <Form>
                                    <Form.Check className='formControl'
                                        inline
                                        label="Receita"
                                        name="tipo"
                                        type="radio"
                                        onChange={tratarRadio}
                                        value="Receita"
                                    />

                                    <Form.Check className='formControl'
                                        inline
                                        label="Despesa"
                                        name="tipo"
                                        type="radio"
                                        onChange={tratarRadio}
                                        value="Despesa"
                                    />
                                </Form>
                            </div>

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px' }}
                                type="number"
                                placeholder="Valor (R$)"
                                onChange={handleChange}
                                name="valor" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModal}>
                        Fechar
                    </Button>
                    <Button variant="success" type='submit' onClick={enviarModal}>
                        Salvar finan??a
                    </Button>
                </Modal.Footer>

            </Modal>

            <section id="home-section">
                <Container>
                    <Row>
                        <Col style={{ margin: '30px' }}>
                            <h2>Bem vindo(a), {usuario.nome}!</h2>
                            <p>Sua ??ltima atualiza????o foi em {usuario.updatedAt}</p>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                            <img id="botao-adicionar-financa" src={BotaoAdicionarFinanca} onClick={abrirModal} width="150" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id="total-financas">
                
                <CardGroup style={{ margin: '30px', color: '#ffffff' }}>
                    <Card bg='success' style={{ padding: '10px', margin: '20px' }}>
                        <Card.Body>
                            <Card.Subtitle>Total receitas</Card.Subtitle><br></br>
                            <Card.Title>R$ {totalReceitas}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card bg="danger" style={{ padding: '10px', margin: '20px' }}>
                        <Card.Body>
                            <Card.Subtitle>Total despesas</Card.Subtitle><br></br>
                            <Card.Title>R$ {totalDespesas}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card bg="info" style={{ padding: '10px', margin: '20px' }}>
                        <Card.Body>
                            <Card.Subtitle>Saldo</Card.Subtitle><br></br>
                            <Card.Title>R$ {(totalReceitas - totalDespesas).toFixed(2)}</Card.Title>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </section>

            <table className="financa-table">
                <thead>
                    <tr className="show-cell">
                        <th>Descri????o</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((financa) => (
                        <tr key={financa.id}>
                            <td>{financa.descricao}</td>
                            <td>{financa.categoria}</td>
                            <td>{financa.tipo}</td>
                            <td>R$ {(financa.valor).toFixed(2)}</td>
                            <td>
                                <div className="financa-red-btn-container">
                                    <BotaoEditar financaSelecionada={financa} />
                                </div>
                            </td>
                            <td>
                                <div className="financa-red-btn-container">
                                    <BotaoDeletar financaId={financa.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Financa;