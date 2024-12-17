import { RenderPosition, render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './events-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const eventsSection = document.querySelector('.trip-events');

const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel({ eventsApiService });
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({ filterContainer: tripControlsFilters, filterModel, eventsModel });
const eventsPresenter = new EventsPresenter({ eventsContainer: eventsSection, eventsModel, filterModel, handleNewEventClose });

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);


const newEventButtonComponent = new NewEventButtonView({ handleNewEventButtonClick });

function handleNewEventButtonClick() {
  newEventButtonComponent.element.disabled = true;
  eventsPresenter.createEvent();
}

function handleNewEventClose() {
  newEventButtonComponent.element.disabled = false;
}

render(newEventButtonComponent, tripMain);

eventsModel.init()
  .finally(() => {
    handleNewEventClose();
  });

filterPresenter.init();
eventsPresenter.init();
