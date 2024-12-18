import AbstractView from '../framework/view/abstract-view.js';

const createEventsLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class EventsLoadingView extends AbstractView {
  get template() {
    return createEventsLoadingTemplate();
  }
}
