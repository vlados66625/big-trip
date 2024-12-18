import { FilterType } from '../const.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const filter = {
  [FilterType.EVERTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => [...points].filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterType.PRESENT]: (points) => [...points].filter((point) => dayjs().isBetween(point.dateFrom, point.dateTo, null, '[)')),
  [FilterType.PAST]: (points) => [...points].filter((point) => dayjs().isAfter(dayjs(point.dateTo))),
};

export { filter };
