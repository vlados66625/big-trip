import { remove, render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventsLoadingView from '../view/events-loading-view.js';
import DownloadErrorView from '../view/download-error-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortingByDay, sortingByTime, sortingByPrice } from '../util/task.js';
import { filter } from '../util/filter.js';

export default class EventsPresenter {
  #eventsListView = new EventsListView();
  #newEventButtonView = null;
  #noEventView = null;
  #sortView = null;
  #eventPresenter = null;
  #eventsContainer = null;
  #tripMainContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #offersByIdData = null;
  #getDestinationsById = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilter = FilterType.EVERTHING;
  #newEventPresenter = null;
  #isEventsLoading = true;
  #eventsLoadingView = new EventsLoadingView();
  #downloadErrorView = new DownloadErrorView();

  constructor({ eventsContainer, eventsModel, filterModel, tripMainContainer }) {
    this.#eventsContainer = eventsContainer;
    this.#tripMainContainer = tripMainContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderPageEvents({ rerenderSort: false });
    this.#newEventButtonView = new NewEventButtonView({ handleNewEventButtonClick: this.#handleNewEventButtonClick });
    render(this.#newEventButtonView, this.#tripMainContainer);
  }

  get points() {
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
      case UpdateType.INIT:
        this.#isEventsLoading = false;
        remove(this.#eventsLoadingView);
        this.#offersByIdData = structuredClone(this.#eventsModel.offersById);
        this.#getDestinationsById = structuredClone(this.#eventsModel.destinationsById);
        this.#initNewEventPresenter();
        this.#renderPageEvents();
        break;
      case UpdateType.ERROR:
        this.#isEventsLoading = false;
        remove(this.#eventsLoadingView);
        this.#renderDownloadError();
        break;
    }
  };

  #initNewEventPresenter() {
    this.#newEventPresenter = new NewEventPresenter({
      eventsContainer: this.#eventsListView.element,
      handleNewEventClose: this.handleNewEventClose,
      handleViewAction: this.#handleViewAction,
      offers: this.#offersByIdData,
      destinations: this.#getDestinationsById
    });
  }

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

  #renderEventsLoading() {
    render(this.#eventsLoadingView, this.#eventsContainer);
  }

  #renderDownloadError() {
    render(this.#downloadErrorView, this.#eventsContainer);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainer);
    this.points.forEach((point) => {
      this.#renderEvent({ point, offers: this.#offersByIdData, destinations: this.#getDestinationsById });
    });
  }

  #renderNoEvent() {
    this.#noEventView = new NoEventView({ currentFilter: this.#currentFilter });
    render(this.#noEventView, this.#eventsContainer);
  }

  #renderPageEvents({ rerenderSort = false } = {}) {
    if (this.#isEventsLoading) {
      this.#renderEventsLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderNoEvent();
      return;
    }

    if (rerenderSort) {
      remove(this.#sortView);
      this.#renderSort();
    }

    if (!this.#sortView) {
      this.#renderSort();
    }

    this.#renderEventsList();
  }

  #createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERTHING);
    this.#newEventPresenter.init();
  }

  #handleNewEventButtonClick = () => {
    this.#newEventButtonView.element.disabled = true;
    this.#createEvent();
  };

  handleNewEventClose = () => {
    this.#newEventButtonView.element.disabled = false;
  };
}

