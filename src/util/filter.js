import { FilterType } from '../const.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => [...events].filter((event) => dayjs().isBefore(dayjs(event.dateFrom))),
  [FilterType.PRESENT]: (events) => [...events].filter((event) => dayjs().isBetween(event.dateFrom, event.dateTo, null, '[)')),
  [FilterType.PAST]: (events) => [...events].filter((event) => dayjs().isAfter(dayjs(event.dateTo))),
};

const generateFilter = (event) =>
  Object.entries(filter).map(([type, filterEvents]) => ({
    type: type,
    count: filterEvents(event).length
  }));

export { generateFilter };
