import api from '../../../service/api';
import icon from '../../../assets/img/delete-button.svg';

function handleClick(financaId) {
    const localStorageItens = JSON.parse(localStorage.getItem('usuarioInfo'));

    api
        .delete(`/financa/excluir/${financaId}`, {
            headers: {
                'x-access-token': localStorageItens.token
            }
        })
        .then(resposta => console.log("Finança deletada com sucesso"));
    window.location.reload();
}

function BotaoDeletar({ financaId }) {
    return (
        <div className="product-red-btn" onClick={() => handleClick(financaId)}>
            <img src={icon} alt="Delete" style={{ width: '30px', height: '30px' }} />
        </div>
    )
}

export default BotaoDeletar;