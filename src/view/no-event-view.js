import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsTexts } from '..//const.js';

const createNoEventTemplate = ({ currentFilter }) => `<p class="trip-events__msg">${NoEventsTexts[currentFilter]}</p>`;

export default class NoEventView extends AbstractView {
  #currentFilter = null;

  constructor({ currentFilter }) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoEventTemplate({ currentFilter: this.#currentFilter });
  }
}
