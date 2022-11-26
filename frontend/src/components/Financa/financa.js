import { useState, useEffect } from 'react';

function Financa() {
    const [state, setState] = useState([]);

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

    return (
        <div>
            <table className="financa-table" border="1">
                <thead>
                    <tr className="show-cell">
                        <th>ID</th>
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
                            <td>{financa.id}</td>
                            <td>{financa.descricao}</td>
                            <td>{financa.categoria}</td>
                            <td>{financa.tipo}</td>
                            <td>{financa.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Financa;