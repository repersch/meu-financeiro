import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';


function Financa() {

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
        idUsuario: 7
    });

    const [formData, updateFormData] = useState(formularioInicial);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.nome]: e.target.value.trim()
        });
    };


    const enviarModal = (e) => {
        const financaParaSalvar = {
            descricao: formData.descricao,
            valor: formData.valor,
            tipo: formData.tipo,
            categoria: formData.categoria,
            idUsuario: 7
        };
        console.log(financaParaSalvar);
       

    
        const requisicao = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json', 'x-access-token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY2OTUwMDAzNSwiZXhwIjoxNjY5NTAwMzM1fQ.Vl06MVgO3BEeFJWvdUj0_nsRqoG81uXZeohMf1y4ERwIo7kDoc60L2MDW8V6bUTBTkHvKnwMPvITfU6h6I6p-xQnjUu_FHc75mT9pYZ0CE2FiRLb6u1RmkkvTMAA3clJaraqxaHlk-grxCniT0QQvnArClQbmHpcxVHAESNIOZ8' },
            body: JSON.stringify({ financaParaSalvar })
        };

        console.log(`Requisição enviada: ${requisicao}`)

        async function salvarFinanca() {
            const resposta = fetch('http://localhost:8081/financa/salvar', requisicao);
            const respostaJson = await resposta.json();
            setState(respostaJson);
            console.log(respostaJson);    
        }
               
    
        salvarFinanca();
        setShow(false);
        window.location.reload();
    };

    useEffect(
        () => {
            // Executar fetch para pegar informações
            // Necessário criar uma async function pois o fetch é assíncrono (await)
            async function buscaDados() {
                const resposta =
                    await fetch('http://localhost:8081/financa').catch((erro) => {
                        // Tratamento de erro de execução
                        console.log("Erro ao realizar o fetch");
                        setErro({
                            hasErro: true,
                            mensagemErro: "Erro ao realizar o fetch"
                        });
                    })
                // Tratamento de erro de aplicação
                //console.table(resposta);
                if (resposta.status >= 200 && resposta.status <= 299) {
                    // Caso der tudo certo é executado esse bloco de código
                    const respostaJson = await resposta.json();
                    setState(respostaJson);
                    console.table(respostaJson);
                }
                else {
                    console.log(`Erro! Requisição com código ${resposta.status}`);
                }
            }

            buscaDados();
            

            // Atualizar o state a partir das informações coletadas
        }, []

    );

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
                        <Form.Group style={{ padding: '10px', margin: '20px'}}>
                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px'}}
                                type="text"
                                placeholder="Descrição"
                                onChange={handleChange}
                                name="descricao" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px'}}
                                type="text"
                                placeholder="Categoria"
                                onChange={handleChange}
                                name="categoria" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px'}}
                                type="text"
                                placeholder="Tipo"
                                onChange={handleChange}
                                name="tipo" />

                            <Form.Control className='formControl'
                                style={{ padding: '10px', margin: '20px'}}
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
                <h2>Bem vindo $nomeUsuario !</h2>
                <p>Sua última atualização foi em $updatedAt</p>
                <Button variant="light" onClick={abrirModal}>Adicionar finança</Button>
            </section>

            <section id="totalFinancas">
                <CardGroup style={{ margin: '30px', color: '#ffffff' }}>
                    <Card bg='success' style={{ padding: '10px', margin: '20px'}}>
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
                            <td>Editar</td>
                            <td>Apagar</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Financa;