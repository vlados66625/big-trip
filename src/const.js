import { nowDateTime, nowDateTimeAddMinute } from './util/task.js';

export const DateFormat = {
  TIME: 'HH:mm',
  DATA: 'YYYY-MM-DD',
  SHORT_DATE: 'MMM DD',
  FULL_DATETIME_Y_M_D: 'YYYY-MM-DDTHH:mm',
  MINUTES: 'mm',
  HOURS: 'HH',
  DAYS: 'DD',
  FULL_DATETIME_D_M_Y: 'DD/MM/YY HH:mm'
};

export const FilterType = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const Mode = {
  VIEW: 'view',
  EDIT: 'edit'
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const TypeEvent = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

export const NoEventsTexts = {
  [FilterType.EVERTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no future events now'
};

export const defaultPoint = {
  basePrice: '',
  dateFrom: nowDateTime,
  dateTo: nowDateTimeAddMinute,
  isFavorite: false,
  offers: [],
  type: 'taxi'
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const Routes = {
  POINTS_ROUTE: 'points',
  DESTINATIONS_ROUTE: 'destinations',
  OFFERS_ROUTE: 'offers'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

export const AUTHORIZATION = 'Basic kf92mxqpltzv';
