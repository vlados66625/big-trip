import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateFormat } from '../const.js';

dayjs.extend(duration);
dayjs.extend(customParseFormat);


export const formatsDate = (date, format) => date ? dayjs(date).format(format) : '';

export const calculatesDurationDate = (dateFrom, dateTo) => {
  const difference = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = difference.format(DateFormat.DAYS);
  const hours = difference.format(DateFormat.HOURS);
  const minutes = difference.format(DateFormat.MINUTES);
  return `${days !== '00' ? `${days}D` : ''} ${hours !== '00' ? `${hours}H` : ''} ${minutes}M`;
};

export const sortingByDay = (pointsDataA, pointsDataB) => {
  if (dayjs(pointsDataA.dateFrom) === dayjs(pointsDataB.dateFrom)) {
    return 0;
  }
  if (dayjs(pointsDataA.dateFrom).isBefore(dayjs(pointsDataB.dateFrom))) {
    return -1;
  } else {
    return 1;
  }
};

export const sortingByTime = (pointsDataA, pointsDataB) => {
  const differenceA = dayjs.duration(dayjs(pointsDataA.dateTo).diff(dayjs(pointsDataA.dateFrom))).asMilliseconds();
  const differenceB = dayjs.duration(dayjs(pointsDataB.dateTo).diff(dayjs(pointsDataB.dateFrom))).asMilliseconds();
  return differenceB - differenceA;
};

export const sortingByPrice = (pointsDataA, pointsDataB) => pointsDataB.basePrice - pointsDataA.basePrice;

export const nowDateTime = dayjs().toISOString();
export const nowDateTimeAddMinute = dayjs().add(1, 'minute').toISOString();

export const adaptToClient = (event) => {
  const adapterEvent = {
    ...event,
    basePrice: event['base_price'],
    dateFrom: event['date_from'],
    dateTo: event['date_to'],
    isFavorite: event['is_favorite'],
  };

  delete adapterEvent['base_price'];
  delete adapterEvent['date_from'];
  delete adapterEvent['date_to'];
  delete adapterEvent['is_favorite'];

  return adapterEvent;
};

export const adaptToServer = (event) => {
  const adaptedEvent = {
    ...event,
    'base_price': event.basePrice,
    'date_from': event.dateFrom,
    'date_to': event.dateTo,
    'is_favorite': event.isFavorite,
  };

  delete adaptedEvent.basePrice;
  delete adaptedEvent.dateFrom;
  delete adaptedEvent.dateTo;
  delete adaptedEvent.isFavorite;

  return adaptedEvent;
};
