import { RenderPosition, render } from './render.js';
import CreateTripInfoView from './view/trip-info-view.js';
import CreateTFilterView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const eventsPresenter = new EventsPresenter();

render(new CreateTripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new CreateTFilterView(), tripControlsFilters);

eventsPresenter.init();
