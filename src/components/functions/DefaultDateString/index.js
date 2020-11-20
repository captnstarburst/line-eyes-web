const DefaultDateString = (dateObj) => {
  return (
    dateObj.getFullYear() +
    "-" +
    formattedMonth(dateObj) +
    "-" +
    formattedDay(dateObj)
  );
};

const formattedMonth = (dateObj) => {
  if (Number(dateObj.getMonth()) + 1 < 10) {
    return "0" + Number(dateObj.getMonth() + 1);
  }
  return Number(dateObj.getMonth() + 1);
};

const formattedDay = (dateObj) => {
  if (dateObj.getDate() < 10) {
    return "0" + dateObj.getDate();
  }

  return dateObj.getDate();
};

export default DefaultDateString;
