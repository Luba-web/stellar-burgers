const URL = "https://norma.nomoreparties.space/api";

const checkStatus = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка запроса: ${res.status}`);

export const getIngredientsDataServer = () => {
    return fetch(`${URL}/ingredients`).then((res) => checkStatus(res));
};

export const saveOrder = (ingredientsId) => {
    return fetch(`${URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ingredientsId,
        }),
    }).then((res) => checkStatus(res));
};
