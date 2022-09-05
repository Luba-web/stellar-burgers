import { TWSAction } from "../actions/ws-action";
import { MiddlewareAPI, Middleware } from "redux";


export const socketMiddleware = (wsUrl: string, wsActions: TWSAction): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
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
          console.log("Закрытие соединения");
        };
      }

      next(action);
    };
  };
};
