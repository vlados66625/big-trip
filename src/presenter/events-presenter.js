import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import { updateItems } from '../util/common.js';

export default class EventsPresenter {
  #eventsListView = new EventsListView();
  #sortView = new SortView();
  #noEventView = new NoEventView();
  #eventPresenter = null;
  #eventsContainer = null;
  #eventsModel = null;
  #pointsData = null;
  #offersByIdData = null;
  #getDestinationsById = null;
  #eventPresenters = new Map();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#pointsData = [...this.#eventsModel.points];
    this.#offersByIdData = structuredClone(this.#eventsModel.offersById);
    this.#getDestinationsById = structuredClone(this.#eventsModel.destinationsById);

    this.#renderPageEvents();
  }

  #handleEventChange = (updatePoint) => {
    this.#pointsData = updateItems(this.#pointsData, updatePoint);
    this.#eventPresenters.get(updatePoint.id).init({ point: updatePoint, offers: this.#offersByIdData, destinations: this.#getDestinationsById });
  };

  #renderSort() {
    render(this.#sortView, this.#eventsContainer);
  }

  #renderEvent(dataEvent) {
    this.#eventPresenter = new EventPresenter({ handleEventChange: this.#handleEventChange, eventsListElement: this.#eventsListView.element });
    this.#eventPresenter.init(dataEvent);
    this.#eventPresenters.set(dataEvent.point.id, this.#eventPresenter);
  }

  #clearEvent(event) {
    this.#eventPresenters.get(event.point.id).destroy();
    this.#eventPresenters.delete(event.point.id);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainer);
    for (let i = 0; i < this.#pointsData.length; i++) {
      this.#renderEvent({ point: this.#pointsData[i], offers: this.#offersByIdData, destinations: this.#getDestinationsById });
    }
  }

  #renderNoEvent() {
    render(this.#noEventView, this.#eventsContainer);
  }

  #renderPageEvents() {
    if (this.#pointsData.length !== 0) {
      this.#renderSort();
      this.#renderEventsList();
    } else {
      this.#renderNoEvent();
    }
  }
}

