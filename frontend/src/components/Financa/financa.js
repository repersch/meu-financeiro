import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


function Financa() {
    const [state, setState] = useState([]);
    const totalDespesas = calcularTotal("DESPESA").toFixed(2)
    const totalReceitas = calcularTotal("RECEITA").toFixed(2)

    // Sugestão para tratamento de erros (bem simplificado)
    const [erro, setErro] = useState({
        hasErro: false,
        mensagemErro: ""
    });

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

            <section id="home-section">
                <h2>Bem vindo $nomeUsuario !</h2>
                <p>Sua última atualização foi em $updatedAt</p>
            </section>

            <section>
                <CardGroup style={{ margin: '20px', color: '#ffffff' }}>
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