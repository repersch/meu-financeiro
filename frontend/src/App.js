import Header from './components/Header/header.js';

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <p>Seção em desenvolvimento</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default App;

/* import { useState, useEffect } from 'react';

function App() {
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
      <h3>Listagem de Finanças</h3>
      <ul>
        {state.map((financa, indice) => {
          return <li key={financa.id}>{financa.descricao}</li>
        })}
      </ul>
    </div>
  );
}

export default App; */
