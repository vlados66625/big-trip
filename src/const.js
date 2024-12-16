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

const EVENT_COUNT = 7;

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
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
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

export { DateFormat, EVENT_COUNT, FilterType, Mode, SortType, TypeEvent, UserAction, UpdateType, NoEventsTexts, defaultPoint };
