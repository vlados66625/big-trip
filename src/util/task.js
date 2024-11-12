import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DATE_FORMAT } from '../const.js';

dayjs.extend(duration);


const formatsDate = (date, format) => date ? dayjs(date).format(format) : '';

const calculatesDurationDate = (dateFrom, dateTo) => {
  const difference = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = difference.format(DATE_FORMAT.DAYS);
  const hours = difference.format(DATE_FORMAT.HOURS);
  const minutes = difference.format(DATE_FORMAT.MINUTES);
  return `${days !== '00' ? `${days}D` : ''} ${hours !== '00' ? `${hours}H` : ''} ${minutes}M`;
};

export { formatsDate, calculatesDurationDate };
