import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import { Mode } from '../const.js';

export default class EventPresenter {
  #eventEdit = null;
  #eventItem = null;
  #eventsListElement = null;
  #onEventItemChange = null;
  #resetViews = null;
  #dataEvent = null;
  #eventMode = Mode.VIEW;

  constructor({ onEventItemChange, eventsListElement, resetViews }) {
    this.#eventsListElement = eventsListElement;
    this.#onEventItemChange = onEventItemChange;
    this.#resetViews = resetViews;
  }

  init(dataEvent) {
    this.#dataEvent = dataEvent;

    const prevEventEdit = this.#eventEdit;
    const prevEventItem = this.#eventItem;

    this.#eventEdit = new EventEditView({ ...this.#dataEvent, onEventEditFormSubmit: this.#onEventEditFormSubmit, closeEditForm: this.#closeEditForm });
    this.#eventItem = new EventItemView({ ...this.#dataEvent, onRollupClick: this.#onRollupClick, onEventFavoriteBtnClick: this.#onEventFavoriteBtnClick });

    if (prevEventEdit === null && prevEventItem === null) {
      return render(this.#eventItem, this.#eventsListElement);
    }

    if (this.#eventMode === Mode.EDIT) {
      replace(this.#eventEdit, prevEventEdit);
    }

    if (this.#eventMode === Mode.VIEW) {
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
    if (this.#eventMode !== Mode.VIEW) {
      this.#eventEdit.resetEventEditView();
      this.#changeFormToCard();
    }
  }

  #changeFormToCard() {
    replace(this.#eventItem, this.#eventEdit);
    this.#eventMode = Mode.VIEW;
    window.removeEventListener('keydown', this.#onEventEditEscape);
  }

  #onEventEditFormSubmit = (pointData) => {
    this.#changeFormToCard();
    this.#onEventItemChange(pointData);
  };

  #onRollupClick = () => {
    this.#resetViews();
    replace(this.#eventEdit, this.#eventItem);
    this.#eventMode = Mode.EDIT;
    window.addEventListener('keydown', this.#onEventEditEscape);
  };

  #onEventEditEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.#closeEditForm();
    }
  };

  #closeEditForm = () => {
    this.#eventEdit.resetEventEditView();
    this.#changeFormToCard();
  };

  #onEventFavoriteBtnClick = () => this.#onEventItemChange({ ...this.#dataEvent.point, isFavorite: !this.#dataEvent.point.isFavorite });
}
