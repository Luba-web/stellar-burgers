const URL = 'https://norma.nomoreparties.space/api';

const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка запроса: ${res.status}`);

const getIngredientsDataServer = () => {
    return fetch(`${URL}/ingredients`)
        .then(res => checkStatus(res))
}

export default getIngredientsDataServer;