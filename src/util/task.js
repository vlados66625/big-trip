import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateFormat } from '../const.js';

dayjs.extend(duration);
dayjs.extend(customParseFormat);


const formatsDate = (date, format) => date ? dayjs(date).format(format) : '';

const calculatesDurationDate = (dateFrom, dateTo) => {
  const difference = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = difference.format(DateFormat.DAYS);
  const hours = difference.format(DateFormat.HOURS);
  const minutes = difference.format(DateFormat.MINUTES);
  return `${days !== '00' ? `${days}D` : ''} ${hours !== '00' ? `${hours}H` : ''} ${minutes}M`;
};

const sortingByDay = (pointsDataA, pointsDataB) => {
  if (dayjs(pointsDataA.dateFrom) === dayjs(pointsDataB.dateFrom)) {
    return 0;
  }
  if (dayjs(pointsDataA.dateFrom).isBefore(dayjs(pointsDataB.dateFrom))) {
    return -1;
  } else {
    return 1;
  }
};

const sortingByTime = (pointsDataA, pointsDataB) => {
  const differenceA = dayjs.duration(dayjs(pointsDataA.dateTo).diff(dayjs(pointsDataA.dateFrom))).asMilliseconds();
  const differenceB = dayjs.duration(dayjs(pointsDataB.dateTo).diff(dayjs(pointsDataB.dateFrom))).asMilliseconds();
  return differenceB - differenceA;
};

const sortingByPrice = (pointsDataA, pointsDataB) => pointsDataB.basePrice - pointsDataA.basePrice;

export { formatsDate, calculatesDurationDate, sortingByDay, sortingByTime, sortingByPrice };
