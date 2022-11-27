import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import api from '../../service/api.js';

function Usuario() {
    const localStorageItens = JSON.parse(localStorage.getItem('usuarioInfo'));

    const [state, setState] = useState([]);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        api
            .get(`/usuario/${localStorageItens.idUsuario}`, {
                headers: {
                    'x-access-token': localStorageItens.token
                }
            })
            .then((resposta) => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setUsuario(resposta.data);
                }
                else {
                    console.log(`Erro! Requisição com código ${resposta.status}`);
                }
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    // Sugestão para tratamento de erros (bem simplificado)
    const [erro, setErro] = useState({
        hasErro: false,
        mensagemErro: ""
    });

    const formularioInicial = ({
        id: localStorageItens.idUsuario,
        nome: usuario.nome,
        senha: usuario.senha,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt
    });

    const [formData, updateFormData] = useState(formularioInicial);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const enviarDados = (e) => {
        const usuarioParaEditar = {
            id: localStorageItens.idUsuario,
            nome: formData.nome,
            senha: formData.senha,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
        };

        api
            .put(`/usuario/editar/${localStorageItens.idUsuario}`, usuarioParaEditar, {
                headers: {
                    'x-access-token': localStorageItens.token
                }
            })
            .then((resposta) => {
                if (resposta.status >= 200 && resposta.status <= 299) {
                    setUsuario(resposta.data);
                    toast.success("Dados do usuário alterados com sucesso!");
                }
                else {
                    console.log(`Erro! Requisição com código ${resposta.status}`);
                    toast.error("Ocorreu um erro");
                }
                console.log("Posting data: ", resposta)
            })
               
            .catch((erro) => {
                console.log("Erro ao realizar o fetch");
                setErro({
                    hasErro: true,
                    mensagemErro: "Erro ao realizar o fetch"
                });
            });
        // window.location.reload();
    };

    return (
        <div>
            <Form id="cadastro-usuario">
                <Form.Group>
                    Nome
                    <Form.Control className='formControl'
                        type="text"
                        placeholder={usuario.nome}
                        onChange={handleChange}
                        name="nome"
                        disabled
                        style={{ padding: '10px', width: '235px', margin: '20px' }}
                    />

                    Senha
                    <Form.Control className='formControl'
                        type="text"
                        onChange={handleChange}
                        name="senha"
                        placeholder={usuario.senha}
                        style={{ padding: '10px', width: '235px', margin: '20px' }} />

                    <Button variant="warning" style={{ margin: '20px' }} onClick={enviarDados}>
                        Alterar dados
                    </Button>
                </Form.Group>

               
            </Form>
        </div>
    );
}

export default Usuario;

