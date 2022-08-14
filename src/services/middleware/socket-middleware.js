export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      // Закрытие соединения
      if (type === onClose) {
        console.log("Закрытие соединения");
        socket.close();
      }

      if (socket) {
        // Открытие соединения
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
          console.log("Открытие соединения");
        };
        // Ошибка соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
          console.log("Ошибка соединения");
        };
        // Получение события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
          console.log("Получение события от сервера");
        };
        // Закрытие соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
          console.log("Закрытие соединения без если");
        };
      }

      next(action);
    };
  };
};
