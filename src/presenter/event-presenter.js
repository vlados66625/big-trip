import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventPresenter {
  #eventEdit = null;
  #eventItem = null;
  #eventsListElement = null;
  #handleEventChange = null;

  constructor({ handleEventChange, eventsListElement }) {
    this.#eventsListElement = eventsListElement;
    this.#handleEventChange = handleEventChange;
  }

  init(dataEvent) {
    const prevEventEdit = this.#eventEdit;
    const prevEventItem = this.#eventItem;

    this.#eventEdit = new EventEditView({ ...dataEvent, onEventEditFormSubmit: this.#onEventEditFormSubmit });
    this.#eventItem = new EventItemView({ ...dataEvent, onRollupClick: this.#onRollupClick, handleEventChange: this.#handleEventChange });

    if (prevEventEdit === null && prevEventItem === null) {
      return render(this.#eventItem, this.#eventsListElement);
    }

    if (this.#eventsListElement.contains(prevEventEdit.element)) {
      replace(this.#eventEdit, prevEventEdit);
    }

    if (this.#eventsListElement.contains(prevEventItem.element)) {
      replace(this.#eventItem, prevEventItem);
    }

    remove(prevEventEdit);
    remove(prevEventItem);
  }

  destroy() {
    remove(this.#eventEdit);
    remove(this.#eventItem);
  }

  #onEventEditFormSubmit = () => {
    replace(this.#eventItem, this.#eventEdit);
    window.removeEventListener('keydown', this.#onEventEditEscape);
  };

  #onRollupClick = () => {
    replace(this.#eventEdit, this.#eventItem);
    window.addEventListener('keydown', this.#onEventEditEscape);
  };

  #onEventEditEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.#onEventEditFormSubmit();
    }
  };
}

