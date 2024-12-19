import { render, RenderPosition, remove } from '../framework/render.js';
import NewEventView from '../view/new-event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #handleNewEventClose = null;
  #handleViewAction = null;
  #rerenderPageEvents = null;
  #isRerenderPageEvents = null;
  #offers = null;
  #destinations = null;
  #newEvent = null;


  constructor({ handleNewEventClose, handleViewAction, isRerenderPageEvents, rerenderPageEvents, offers, destinations }) {
    this.#handleNewEventClose = handleNewEventClose;
    this.#handleViewAction = handleViewAction;
    this.#rerenderPageEvents = rerenderPageEvents;
    this.#isRerenderPageEvents = isRerenderPageEvents;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init({ eventsListElement }) {
    if (this.#newEvent !== null) {
      return;
    }

    this.#newEvent = new NewEventView({
      offers: this.#offers, destinations: this.#destinations,
      handleNewEventFormSubmit: this.#handleNewEventFormSubmit,
      handleDeleteNewEvent: this.destroy
    });
    render(this.#newEvent, eventsListElement, RenderPosition.AFTERBEGIN);
    window.addEventListener('keydown', this.#handleNewEventEscape);
  }

  #handleNewEventFormSubmit = (event) => {
    this.#handleViewAction(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  destroy = () => {
    if (this.#newEvent === null) {
      return;
    }

    remove(this.#newEvent);
    this.#newEvent = null;

    this.#handleNewEventClose();
    window.removeEventListener('keydown', this.#handleNewEventEscape);

    if (this.#isRerenderPageEvents()) {
      this.#rerenderPageEvents();
    }
  };

  #handleNewEventEscape = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving() {
    this.#newEvent.updateElement({
      isDisable: true,
      isSaiving: true,
    });
  }

  setAborting() {
    const resetCardForm = () => {
      this.#newEvent.updateElement({
        isDisable: false,
        isSaiving: false,
        isDeleting: false,
      });
    };

    this.#newEvent.shake(resetCardForm);
  }
}
