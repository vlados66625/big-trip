import { getRandomEvent, Destinations, Offers } from '../mock/event.js';
import { EVENT_COUNT } from '../const.js';


export default class EventsModel {
  #points = Array.from({ length: EVENT_COUNT }, getRandomEvent);
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
        };
      });

      return offersById;
    }, {});
  }

  get points() {
    return this.#points;
  }
}
