import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import { Mode } from '../const.js';

export default class EventPresenter {
  #eventEdit = null;
  #eventItem = null;
  #eventsListElement = null;
  #handleEventChange = null;
  #resetViews = null;
  #dataEvent = null;
  #eventMode = Mode.DEFAULT;

  constructor({ handleEventChange, eventsListElement, resetViews }) {
    this.#eventsListElement = eventsListElement;
    this.#handleEventChange = handleEventChange;
    this.#resetViews = resetViews;
  }

  init(dataEvent) {
    this.#dataEvent = dataEvent;

    const prevEventEdit = this.#eventEdit;
    const prevEventItem = this.#eventItem;

    this.#eventEdit = new EventEditView({ ...this.#dataEvent, onEventEditFormSubmit: this.#onEventEditFormSubmit });
    this.#eventItem = new EventItemView({ ...this.#dataEvent, onRollupClick: this.#onRollupClick, handleEventChange: this.#onEventChange });

    if (prevEventEdit === null && prevEventItem === null) {
      return render(this.#eventItem, this.#eventsListElement);
    }

    if (this.#eventMode === Mode.EDITABLE) {
      replace(this.#eventEdit, prevEventEdit);
    }

    if (this.#eventMode === Mode.DEFAULT) {
      replace(this.#eventItem, prevEventItem);
    }

    remove(prevEventEdit);
    remove(prevEventItem);
  }

  destroy() {
    remove(this.#eventEdit);
    remove(this.#eventItem);
  }

  resetView() {
    if (this.#eventMode !== Mode.DEFAULT) {
      this.#changeFormToCard();
    }
  }

  #changeFormToCard() {
    replace(this.#eventItem, this.#eventEdit);
    this.#eventMode = Mode.DEFAULT;
    window.removeEventListener('keydown', this.#onEventEditEscape);
  }

  #onEventEditFormSubmit = (pointData) => {
    this.#changeFormToCard();
    this.#handleEventChange(pointData);
  };

  #onRollupClick = () => {
    this.#resetViews();
    replace(this.#eventEdit, this.#eventItem);
    this.#eventMode = Mode.EDITABLE;
    window.addEventListener('keydown', this.#onEventEditEscape);
  };

  #onEventEditEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.#changeFormToCard();
    }
  };

  #onEventChange = () => this.#handleEventChange({ ...this.#dataEvent.point, isFavorite: !this.#dataEvent.point.isFavorite });
}
