import TripInfoView from '../view//trip-info-view.js';
import { replace, render, remove, RenderPosition } from '../framework/render.js';
import { sortingByDay, formatsDate } from '../util/task.js';
import { DateFormat } from '../const.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #eventsModel = null;
  #points = [];
  #offersById = [];
  #destinations = [];
  #tripInfoElement = null;

  constructor({ tripInfoContainer, eventsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#points = structuredClone(this.#eventsModel.points).sort(sortingByDay);
    this.#offersById = structuredClone(this.#eventsModel.offersById);
    this.#destinations = structuredClone(this.#eventsModel.destinationsById);
    if (!this.#points.length) {
      return;
    }

    const prevTripInfoElement = this.#tripInfoElement;

    this.#tripInfoElement = new TripInfoView({
      tripTotalPrice: this.#getTripTotalPrice({ points: this.#points, offers: this.#offersById }),
      uniqueDestinationsNameArray: this.#getUniqueDestinationsNameArray({ points: this.#points, destinations: this.#destinations }),
      dateFrom: this.#getDateFrom({ points: this.#points }),
      dateTo: this.#getDateTo({ points: this.#points }),
    });

    if (prevTripInfoElement === null) {
      return render(this.#tripInfoElement, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    }

    replace(this.#tripInfoElement, prevTripInfoElement);
    remove(prevTripInfoElement);
  }

  #getTripTotalPrice({ points, offers }) {
    const pointsTotalPrice = points.reduce((totalPricePoints, point) => totalPricePoints + point.basePrice, 0);
    const offetsTotalPrice = points.reduce((totalOffersPrice, point) => totalOffersPrice + point.offers.reduce((offersPrice, offerId) => offersPrice + offers[offerId].price, 0), 0);
    const totalPrice = pointsTotalPrice + offetsTotalPrice;
    return totalPrice;
  }

  #getUniqueDestinationsNameArray({ points, destinations }) {
    const DestinationsName = points.map((point) => `${destinations[point.destination].name}`);
    const uniqueDestinationsName = new Set(DestinationsName);
    const uniqueDestinationsNameArray = Array.from(uniqueDestinationsName);
    return uniqueDestinationsNameArray;
  }

  #getDateFrom({ points }) {
    const dateFrom = formatsDate(points[0].dateFrom, DateFormat.SHORT_DATE);
    return dateFrom;
  }

  #getDateTo({ points }) {
    const dateTo = formatsDate(points.at(-1).dateTo, DateFormat.SHORT_DATE);
    return dateTo;
  }

  #handleModelEvent = () => {
    this.init();
  };
}
