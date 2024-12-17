import ApiService from './framework/api-service.js';
import { Method, Routes } from './const.js';

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
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(ApiService.parseResponse);
  }

  #adaptToServer(event) {
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
  }
}
