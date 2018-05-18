import moment from 'moment';

const checkTimeToOrder = (menuDate) => {
  const now = new Date();
  const menuDay = moment.utc(menuDate).format('YYYY-MM-DD');
  const expiredTime = new Date(`${menuDay} 22:00:00`);

  return expiredTime.getTime() >= now.getTime();
};

export default checkTimeToOrder;
