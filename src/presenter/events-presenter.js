import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import { SortType } from '../const.js';
import { updateItems } from '../util/common.js';
import { sortingByDay, sortingByTime, sortingByPrice } from '../util/task.js';

export default class EventsPresenter {
  #eventsListView = new EventsListView();
  #noEventView = new NoEventView();
  #sortView = null;
  #eventPresenter = null;
  #eventsContainer = null;
  #eventsModel = null;
  #pointsData = null;
  #offersByIdData = null;
  #getDestinationsById = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#pointsData = [...this.#eventsModel.points].sort(sortingByDay);
    this.#offersByIdData = structuredClone(this.#eventsModel.offersById);
    this.#getDestinationsById = structuredClone(this.#eventsModel.destinationsById);

    this.#renderPageEvents();
  }

  #resetViews = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.resetView());
  };

  #onEventItemChange = (updatePoint) => {
    this.#pointsData = updateItems(this.#pointsData, updatePoint);
    this.#eventPresenters.get(updatePoint.id).init({ point: updatePoint, offers: this.#offersByIdData, destinations: this.#getDestinationsById });
  };

  #renderSort() {
    this.#sortView = new SortView({ onSortItemChange: this.#onSortItemChange });
    render(this.#sortView, this.#eventsContainer);
  }

  #onSortItemChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#sortEvents(sortType);
      this.#clearEvents();
      this.#renderEventsList();
    }
  };

  #renderEvent(dataEvent) {
    this.#eventPresenter = new EventPresenter({ onEventItemChange: this.#onEventItemChange, eventsListElement: this.#eventsListView.element, resetViews: this.#resetViews });
    this.#eventPresenter.init(dataEvent);
    this.#eventPresenters.set(dataEvent.point.id, this.#eventPresenter);
  }

  #clearEvents() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#pointsData.sort(sortingByDay);
        break;
      case SortType.TIME:
        this.#pointsData.sort(sortingByTime);
        break;
      case SortType.PRICE:
        this.#pointsData.sort(sortingByPrice);
        break;
    }
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

