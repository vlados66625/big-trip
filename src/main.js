import { RenderPosition, render } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const eventsSection = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({ eventsContainer: eventsSection });

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsFilters);

eventsPresenter.init();
