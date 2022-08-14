export const getOrders = (store) => store.ws.orders || undefined;
export const getTotal = (store) => store.ws.total || 0;
export const getTotalToday = (store) => store.ws.totalToday || 0;
export const getWsConnected = (store) => store.ws.wsConnection;
