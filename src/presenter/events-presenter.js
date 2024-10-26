import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import CreatingEventView from '../view/creating-event-view.js';

const NUMBER_EVENTS = 3;

export default class EventsPresenter {
  eventsListView = new EventsListView();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.eventsListView, this.eventsContainer);
    render(new CreatingEventView(), this.eventsListView.getElement());
    render(new EventEditView(), this.eventsListView.getElement());

    for (let i = 0; i < NUMBER_EVENTS; i++) {
      render(new EventsItemView(), this.eventsListView.getElement());
    }
  }
}
