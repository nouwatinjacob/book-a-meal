import moment from 'moment';

const checkTimeToModifyOrder = (menuDate) => {
  const timeCheck = moment(menuDate).add(1, 'hour') > moment();
  return timeCheck;
};

const checkTimeToOrder = () => {
  const currentTime = moment();
  const beforeTime = moment('06:59:00');
  const afterTime = moment('18:00:00');
  if (currentTime.isBetween(beforeTime, afterTime)) {
    return true;
  }
  return false;
};

export {
  checkTimeToModifyOrder,
  checkTimeToOrder
};
