import ApiService from './framework/api-service.js';
import { Method, Routes } from './const.js';
import { adaptToServer } from './util/task.js';

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: `${Routes.POINTS_ROUTE}` })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: `${Routes.DESTINATIONS_ROUTE}` })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: `${Routes.OFFERS_ROUTE}` })
      .then(ApiService.parseResponse);
  }

  updateEvent(event) {
    return this._load({
      url: `${Routes.POINTS_ROUTE}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(ApiService.parseResponse);
  }

  addEvent(event) {
    return this._load({
      url: `${Routes.POINTS_ROUTE}`,
      method: Method.POST,
      body: JSON.stringify(adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(ApiService.parseResponse);
  }

  deleteEvent(event) {
    return this._load({
      url: `${Routes.POINTS_ROUTE}/${event.id}`,
      method: Method.DELETE,
    });
  }
}
