import moment from 'moment';

const checkTimeToModifyOrder = (menuDate) => {
  const timeCheck = moment(menuDate).add(1, 'hour') > moment();
  return timeCheck;
};

const checkTimeToOrder = () => {
  const checkTime = moment().hour() >= 7 && moment().hour() <= 18;
  return checkTime;
};

export {
  checkTimeToModifyOrder,
  checkTimeToOrder
};
