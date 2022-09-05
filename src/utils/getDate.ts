export const getCorrectDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const month = date.getMonth();
  const currentMonth = new Date().getMonth();
  let weekDay = "";

  if (month !== currentMonth) return "В этом году";

  const day = date.getDate();
  const currentDay = new Date().getDate();
  const difference = currentDay - day;

  if (difference === 0) weekDay = "Сегодня";
  else if (difference === 1) weekDay = "Вчера";
  else if (difference === 2) weekDay = "Позавчера";
  else if (difference >= 3 && difference < 7) weekDay = "На этой неделе";
  else return "В этом месяце";

  const hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  return `${weekDay}, ${hours}:${minutes} i-GMT+3`;
};
