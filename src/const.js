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

export { DateFormat, EVENT_COUNT, FilterType, Mode, SortType, TypeEvent };
