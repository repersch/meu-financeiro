import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from "react";

import api from '../../../service/api';
import icon from '../../../assets/img/edit-button.svg';

function BotaoEditar({ financaSelecionada }) {
    const localStorageItens = JSON.parse(localStorage.getItem('usuarioInfo'));

    const [show, setShow] = useState(false)
    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    // Sugestão para tratamento de erros (bem simplificado)
    const [erro, setErro] = useState({
        hasErro: false,
        mensagemErro: ""
    });

    const formularioInicial = ({
        descricao: financaSelecionada.descricao,
        valor: financaSelecionada.valor,
        tipo: financaSelecionada.tipo,
        categoria: financaSelecionada.categoria,
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
        const financaParaEditar = {
            descricao: formData.descricao,
            valor: formData.valor,
            tipo: formData.tipo,
            categoria: formData.categoria,
            idUsuario: localStorageItens.idUsuario
        };

        api
            .put(`/financa/editar/${financaSelecionada.id}`, financaParaEditar, {
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

    return (
        <div>
            <div className="product-red-btn" onClick={abrirModal}>
                <img src={icon} alt="Edit" style={{ width: '30px', height: '30px' }} />
            </div>

            <Modal show={show} onHide={fecharModal} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Finança</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            Descrição
                            <Form.Control className='formControl'
                                type="text"
                                placeholder={financaSelecionada.descricao}
                                onChange={handleChange}
                                name="descricao"
                            />

                            Categoria
                            <Form.Control className='formControl'
                                type="text"
                                onChange={handleChange}
                                name="categoria"
                                placeholder={financaSelecionada.categoria} />

                            Tipo
                            <Form.Control className='formControl'
                                type="text"
                                onChange={handleChange}
                                name="tipo"
                                placeholder={financaSelecionada.tipo} />

                            Valor (R$)
                            <Form.Control className='formControl'
                                type="number"
                                onChange={handleChange}
                                name="valor"
                                placeholder={financaSelecionada.valor} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModal}>
                        Fechar
                    </Button>
                    <Button variant="warning" onClick={enviarModal}>
                        Alterar Finança
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default BotaoEditar;