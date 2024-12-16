import { render, RenderPosition, remove } from '../framework/render.js';
import NewEventView from '../view/new-event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #eventsContainer = null;
  #handleNewEventClose = null;
  #handleViewAction = null;
  #offers = null;
  #destinations = null;
  #newEvent = null;


  constructor({ eventsContainer, handleNewEventClose, handleViewAction, offers, destinations }) {
    this.#eventsContainer = eventsContainer;
    this.#handleNewEventClose = handleNewEventClose;
    this.#handleViewAction = handleViewAction;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init() {
    if (this.#newEvent !== null) {
      return;
    }

    this.#newEvent = new NewEventView({ offers: this.#offers, destinations: this.#destinations, handleNewEventFormSubmit: this.#handleNewEventFormSubmit, handleDeleteNewEvent: this.destroy });
    render(this.#newEvent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    window.addEventListener('keydown', this.#handleNewEventEscape);
  }

  #handleNewEventFormSubmit = (event) => {
    this.#handleViewAction(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: crypto.randomUUID(), ...event }
    );

    this.destroy();
  };

  destroy = () => {
    if (this.#newEvent === null) {
      return;
    }

    remove(this.#newEvent);
    this.#newEvent = null;

    this.#handleNewEventClose();
    window.removeEventListener('keydown', this.#handleNewEventEscape);
  };

  #handleNewEventEscape = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
