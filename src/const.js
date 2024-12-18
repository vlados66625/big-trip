import { nowDateTime } from './util/task.js';

const DateFormat = {
  TIME: 'HH:mm',
  DATA: 'YYYY-MM-DD',
  SHORT_DATE: 'MMM DD',
  FULL_DATETIME_Y_M_D: 'YYYY-MM-DDTHH:mm',
  MINUTES: 'mm',
  HOURS: 'HH',
  DAYS: 'DD',
  FULL_DATETIME_D_M_Y: 'DD/MM/YY HH:mm'
};

const FilterType = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  VIEW: 'view',
  EDIT: 'edit'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const TypeEvent = {
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

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const NoEventsTexts = {
  [FilterType.EVERTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no future events now'
};

const defaultPoint = {
  basePrice: '',
  dateFrom: nowDateTime,
  dateTo: nowDateTime,
  isFavorite: false,
  offers: [],
  type: 'taxi'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const Routes = {
  POINTS_ROUTE: 'points',
  DESTINATIONS_ROUTE: 'destinations',
  OFFERS_ROUTE: 'offers'
};

const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

const AUTHORIZATION = 'Basic kf92mxqpltzv';

export {
  DateFormat, FilterType,
  Mode, SortType, TypeEvent, UserAction, UpdateType,
  NoEventsTexts, defaultPoint, Method, Routes,
  END_POINT, AUTHORIZATION
};
