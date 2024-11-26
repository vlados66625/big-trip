const DATE_FORMAT = {
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

export { DATE_FORMAT, EVENT_COUNT, FilterType, Mode };
