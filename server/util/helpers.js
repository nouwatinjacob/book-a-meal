import moment from 'moment';

const checkTimeToOrder = (menuDate) => {
  const now = new Date();
  const menuDay = moment.utc(menuDate).format('YYYY-MM-DD');
  const expiredTime = new Date(`${menuDay} 18:00:00`);

  console.log(expiredTime, '.......')

  return expiredTime.getTime() >= now.getTime();
};

export default checkTimeToOrder;
