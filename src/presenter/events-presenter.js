import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import CreatingEventView from '../view/creating-event-view.js';

export default class EventsPresenter {
  eventsListView = new EventsListView();

  constructor({ eventsContainer, eventsModel }) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.pointsData = [...this.eventsModel.getPoints()];
    this.offersByIdData = structuredClone(this.eventsModel.getOffersById());
    this.getDestinationsById = structuredClone(this.eventsModel.getDestinationsById());

    render(new SortView(), this.eventsContainer);
    render(this.eventsListView, this.eventsContainer);
    render(new CreatingEventView(), this.eventsListView.getElement());
    render(new EventEditView({ point: this.pointsData[0], offers: this.offersByIdData, destinations: this.getDestinationsById }), this.eventsListView.getElement());

    for (let i = 1; i < this.pointsData.length; i++) {
      render(new EventItemView({ points: this.pointsData[i], offers: this.offersByIdData, destinations: this.getDestinationsById }), this.eventsListView.getElement());
    }
  }
}
