import { getRandomEvent, Destinations, Offers } from '../mock/event.js';
import Observable from '../framework/observable.js';
import { EVENT_COUNT } from '../const.js';


export default class EventsModel extends Observable {
  #points = Array.from(new Set(Array.from({ length: EVENT_COUNT }, getRandomEvent)));
  #destinations = Destinations;
  #offers = Offers;

  get destinationsById() {
    return this.#destinations.reduce((destinationsById, destination) => {
      destinationsById[destination.id] = {
        id: destination.id,
        description: destination.description,
        name: destination.name,
        pictures: destination.pictures
      };

      return destinationsById;
    }, {});
  }

  get offersById() {
    return this.#offers.reduce((offersById, offersByType) => {
      offersByType.offers.forEach((offer) => {
        offersById[offer.id] = {
          id: offer.id,
          title: offer.title,
          price: offer.price,
          type: offersByType.type,
        };
      });

      return offersById;
    }, {});
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const updateIndex = this.points.findIndex((item) => item.id === update.id);

    if (updateIndex === -1) {
      throw new Error('Не удалось обновить не найденное событие');
    }

    this.#points = [
      ...this.#points.slice(0, updateIndex),
      update,
      ...this.#points.slice(updateIndex + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const updateIndex = this.points.findIndex((item) => item.id === update.id);

    if (updateIndex === -1) {
      throw new Error('Не удалось удалить не найденное событие');
    }

    this.#points = [
      ...this.#points.slice(0, updateIndex),
      ...this.#points.slice(updateIndex + 1)
    ];

    this._notify(updateType);
  }
}
