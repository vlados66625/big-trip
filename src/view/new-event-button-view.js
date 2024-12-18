import AbstractView from '../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>';

export default class NewEventButtonView extends AbstractView {
  #handleNewEventButtonClick = null;

  constructor({ handleNewEventButtonClick }) {
    super();
    this.#handleNewEventButtonClick = handleNewEventButtonClick;
    this.element.addEventListener('click', this.#onNewEventButtonClick);
  }

  #onNewEventButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleNewEventButtonClick();
  };

  get template() {
    return createNewEventButtonTemplate();
  }
}
