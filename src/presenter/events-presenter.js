import { remove, render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortingByDay, sortingByTime, sortingByPrice } from '../util/task.js';
import { filter } from '../util/filter.js';

export default class EventsPresenter {
  #eventsListView = new EventsListView();
  #noEventView = null;
  #sortView = null;
  #eventPresenter = null;
  #eventsContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #handleNewEventClose = null;
  #offersByIdData = null;
  #getDestinationsById = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilter = FilterType.EVERTHING;
  #newEventPresenter = null;

  constructor({ eventsContainer, eventsModel, filterModel, handleNewEventClose }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#handleNewEventClose = handleNewEventClose;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#offersByIdData = structuredClone(this.#eventsModel.offersById);
    this.#getDestinationsById = structuredClone(this.#eventsModel.destinationsById);

    this.#newEventPresenter = new NewEventPresenter({
      eventsContainer: this.#eventsListView.element,
      handleNewEventClose: this.#handleNewEventClose,
      handleViewAction: this.#handleViewAction,
      offers: this.#offersByIdData,
      destinations: this.#getDestinationsById
    });
  }

  init() {
    this.#renderPageEvents({ rerenderSort: false });
  }

  get point() {
    this.#currentFilter = this.#filterModel.filter;
    const filteredPoints = filter[this.#currentFilter](this.#eventsModel.points);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortingByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortingByPrice);
    }
    return filteredPoints.sort(sortingByDay);
  }

  #resetViews = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.resetView());
  };

  #handleViewAction = (userAction, updateType, updatePoint) => {
    switch (userAction) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updatePoint(updateType, updatePoint);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addPoint(updateType, updatePoint);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deletePoint(updateType, updatePoint);
        break;
    }
  };

  #handleModelEvent = (updateType, updatePoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(updatePoint.id).init({ point: updatePoint, offers: this.#offersByIdData, destinations: this.#getDestinationsById });
        break;
      case UpdateType.MINOR:
        this.#clearEventsSection();
        this.#renderPageEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsSection();
        this.#renderPageEvents({ rerenderSort: true });
        break;
    }
  };

  #renderSort() {
    this.#sortView = new SortView({ onSortItemChange: this.#onSortItemChange });
    render(this.#sortView, this.#eventsContainer);
  }

  #onSortItemChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#clearEventsSection();
      this.#renderEventsList();
    }
  };

  #returnCurrentSortType = () => this.#currentSortType;

  #renderEvent(dataEvent) {
    this.#eventPresenter = new EventPresenter({ onEventItemChange: this.#handleViewAction, eventsListElement: this.#eventsListView.element, resetViews: this.#resetViews, returnCurrentSortType: this.#returnCurrentSortType });
    this.#eventPresenter.init(dataEvent);
    this.#eventPresenters.set(dataEvent.point.id, this.#eventPresenter);
  }

  #clearEventsSection() {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventView) {
      remove(this.#noEventView);
    }

  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainer);
    for (let i = 0; i < this.point.length; i++) {
      this.#renderEvent({ point: this.point[i], offers: this.#offersByIdData, destinations: this.#getDestinationsById });
    }
  }

  #renderNoEvent() {
    this.#noEventView = new NoEventView({ currentFilter: this.#currentFilter });
    render(this.#noEventView, this.#eventsContainer);
  }

  #renderPageEvents({ rerenderSort = false } = {}) {
    if (this.point.length !== 0) {
      if (rerenderSort) {
        remove(this.#sortView);
        this.#renderSort();
      }
      if (!this.#sortView) {
        this.#renderSort();
      }
      this.#renderEventsList();
    } else {
      this.#renderNoEvent();
    }
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERTHING);
    this.#newEventPresenter.init();
  }
}

