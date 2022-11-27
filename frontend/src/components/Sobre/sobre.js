import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sobre() {

    return (
        <div id='sobre'>
            <p>O site Meu Financeiro foi criado com a intenção de facilitar o controle do usuário sobre o dinheiro recebido e gasto.</p>
            <p>Nele é possível incluir suas receitas e despesas, especificando uma descrição e categoria para o valor recebido ou gasto, esses valores são somados conforme o tipo (receita ou despesa) e mostrados na tela, além da diferença entre eles, sendo fácil visualizar o saldo total.</p>
            <p>Também é mostrada uma tabela com todos as finanças cadastradas pelo usuário logado, é possível editar ou excluir qualquer uma dessas finanças, ao fazer isso os valores totais são atualizados conforme as alterações feitas.</p>
            <p>Na tela inicial é possível cadastrar um novo usuário ou fazer o login de um usuário existente.</p>
            <p>Depois de logado, o usuário pode atualizar suas próprias informações (nome e senha). (Nesse caso a senha fica visível apenas para fins didáticos)</p>
        </div>
    )
}

export default Sobre;