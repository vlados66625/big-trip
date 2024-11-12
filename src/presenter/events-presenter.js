import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventView from '../view/no-event-view.js';
export default class EventsPresenter {
  #eventsListView = new EventsListView();
  #eventsContainer = null;
  #eventsModel = null;
  #pointsData = null;
  #offersByIdData = null;
  #getDestinationsById = null;

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

  #renderEvent(dataEvent) {
    const eventEdit = new EventEditView(dataEvent, onEventEditFormSubmit);
    const eventItem = new EventItemView(dataEvent, onRollupClick);

    const onEventEditEscape = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onEventEditFormSubmit();
      }
    };

    function onEventEditFormSubmit() {
      replace(eventItem, eventEdit);
      window.removeEventListener('keydown', onEventEditEscape);
    }

    function onRollupClick() {
      replace(eventEdit, eventItem);
      window.addEventListener('keydown', onEventEditEscape);
    }

    render(eventItem, this.#eventsListView.element);
  }

  #renderPageEvents() {
    if (this.#pointsData.length !== 0) {
      render(new SortView(), this.#eventsContainer);
      render(this.#eventsListView, this.#eventsContainer);

      for (let i = 0; i < this.#pointsData.length; i++) {
        this.#renderEvent({ point: this.#pointsData[i], offers: this.#offersByIdData, destinations: this.#getDestinationsById });
      }
    } else {
      render(new NoEventView(), this.#eventsContainer);
    }

  }
}
