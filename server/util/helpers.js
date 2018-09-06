import moment from 'moment';

const checkTimeToModifyOrder = (menuDate) => {
  const timeCheck = moment(menuDate).add(5, "minutes") > moment();
  return timeCheck;
};

const checkTimeToOrder = () => {
  const currentTime = moment();
  const beforeTime = moment('06:59:00');
  const afterTime = moment('18:00:00');
  if (currentTime.clone().isBetween(beforeTime, afterTime)) {
    return true;
  }
  return false;
};

const generatePagination = (limit, offset, items) => {
  const paginate = {
    page: Math.ceil(items.count / limit),
    itemCount: items.count,
    currentPage: Math.ceil(offset / limit) + 1,
    limit,
    offset
  };
  return paginate;
};

export {
  checkTimeToModifyOrder,
  checkTimeToOrder,
  generatePagination
};
