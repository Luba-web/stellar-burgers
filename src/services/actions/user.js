import { getUserInfoFetch, postUserFetch } from "../../utils/api";

/*Экшены для логина */
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
/*Экшаны для информации о пользователе*/
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

//получение данных пользователя
export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: USER_INFO_REQUEST,
    });
    return getUserInfoFetch()
      .then((res) => {
        dispatch({ type: USER_INFO_SUCCESS, data: res.user });
      })
      .catch((err) => {
        dispatch({
          type: USER_INFO_FAILED,
        });
        console.log(`Ошибка ${err}`);
      });
  };
};

// export function postUserInfo(data) {
//   return function (dispatch) {
//     dispatch({
//       type: LOGIN_REQUEST,
//     });
//     postUserFetch(data)
//       .then((res) => {
//         dispatch({ type: LOGIN_SUCCESS, data: res.user });
//       })
//       .catch((err) => {
//         dispatch({
//           type: LOGIN_FAILED,
//         });
//         console.log(`Ошибка ${err}`);
//       });
//   };
// }

//
