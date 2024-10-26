import { render } from '../render.js';
import CreateSortView from '../view/sort-view.js';
import CreateEventsListView from '../view/events-list-view.js';
import CreateEventsItemView from '../view/events-item-view.js';
import CreateEventsEditView from '../view/events-edit-view.js';
import CreateCreatingEventsView from '../view/creating-event-view.js';

const tripEventsSection = document.querySelector('.trip-events');

export default class EventsPresenter {
  eventsListView = new CreateEventsListView;

  init() {
    render(new CreateSortView, tripEventsSection);
    render(this.eventsListView, tripEventsSection);
    render(new CreateCreatingEventsView, this.eventsListView.getElement());
    render(new CreateEventsEditView, this.eventsListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new CreateEventsItemView, this.eventsListView.getElement());
    }
  }
}
