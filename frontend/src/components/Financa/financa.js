import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import api from '../../service/api.js';

import BotaoEditar from './BotaoEditar/botaoEditar.js';
import BotaoDeletar from './BotaoDeletar/botaoDeletar.js';

function Financa() {
    const localStorageItens = JSON.parse(localStorage.getItem('usuarioInfo'));

    const [usuario, setUsuario] = useState([]);

    const [state, setState] = useState([]);
    const [show, setShow] = useState(false)
    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    const totalDespesas = calcularTotal("DESPESA").toFixed(2)
    const totalReceitas = calcularTotal("RECEITA").toFixed(2)

    // Sugestão para tratamento de erros (bem simplificado)
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

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const enviarModal = (e) => {
        const financaParaSalvar = {
            descricao: formData.descricao,
            valor: formData.valor,
            tipo: formData.tipo,
            categoria: formData.categoria,
            idUsuario: localStorageItens.idUsuario
        };

        api.post('/financa/salvar', financaParaSalvar, {
            headers: {
                'x-access-token': localStorageItens.token
            }
        })
            .then(resposta => console.log("Posting data: ", resposta))
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
                    console.log(`Erro! Requisição com código ${resposta.status}`);
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
                    console.log(`Erro! Requisição com código ${resposta.status}`);
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
                    <Modal.Title>Nova Finança</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{ padding: '10px', margin: '20px' }}>
                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px' }}
                                type="text"
                                placeholder="Descrição"
                                onChange={handleChange}
                                name="descricao" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px' }}
                                type="text"
                                placeholder="Categoria"
                                onChange={handleChange}
                                name="categoria" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px' }}
                                type="text"
                                placeholder="Tipo"
                                onChange={handleChange}
                                name="tipo" />

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
                    <Button variant="success" onClick={enviarModal}>
                        Salvar finança
                    </Button>
                </Modal.Footer>

            </Modal>

            <section id="homeSection">
                <h2>Bem vindo {usuario.nome}!</h2>
                <p>Sua última atualização foi em {usuario.updatedAt}</p>
                <Button variant="light" onClick={abrirModal}>Adicionar finança</Button>
            </section>

            <section id="totalFinancas">
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
                    <Card bg="warning" style={{ padding: '10px', margin: '20px' }}>
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
                        <th>Descrição</th>
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