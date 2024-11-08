import { createElement } from '../render.js';

const createEventsListViewTemplate = () =>
  `<ul class="trip-events__list">
   </ul>`;

export default class EventsListView {
  getTemplate() {
    return createEventsListViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(createEventsListViewTemplate());
    }

    return this.element;
  }

  removeElemnt() {
    this.element = null;
  }
}

