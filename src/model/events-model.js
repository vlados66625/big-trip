import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { adaptToClient } from '../util/task.js';

export default class EventsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #eventsApiService = null;

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#points = events.map(adaptToClient);
      this.#destinations = await this.#eventsApiService.destinations;
      this.#offers = await this.#eventsApiService.offers;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.ERROR);
      throw err;
    }
  }

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

  async updatePoint(updateType, update) {
    const updateIndex = this.points.findIndex((item) => item.id === update.id);

    if (updateIndex === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const responseUpdateEvent = await this.#eventsApiService.updateEvent(update);
      const updateEvent = adaptToClient(responseUpdateEvent);


      this.#points = [
        ...this.#points.slice(0, updateIndex),
        updateEvent,
        ...this.#points.slice(updateIndex + 1)
      ];

      this._notify(updateType, update);
    } catch {
      throw new Error('Can\'t update task');
    }
  }

  async addPoint(updateType, update) {
    try {
      const responseUpdateEvent = await this.#eventsApiService.addEvent(update);
      const updateEvent = adaptToClient(responseUpdateEvent);
      this.#points = [
        updateEvent,
        ...this.#points,
      ];

      this._notify(updateType, update);
    } catch {
      throw new Error('Can\'t add task');
    }

  }

  async deletePoint(updateType, update) {
    try {
      const updateIndex = this.points.findIndex((item) => item.id === update.id);
      if (updateIndex === -1) {
        throw new Error('Can\'t delete unexisting task');
      }
      await this.#eventsApiService.deleteEvent(update);

      this.#points = [
        ...this.#points.slice(0, updateIndex),
        ...this.#points.slice(updateIndex + 1)
      ];

      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete task');
    }
  }
}
