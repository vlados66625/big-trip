import FilterView from '../view/filters-view.js';
import { filter } from '../util/filter.js';
import { remove, render, replace } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventsModel = null;
  #filter = null;

  constructor({ filterContainer, filterModel, eventsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#filterModel.addObserver(this.#handleFilterEvent);
    this.#eventsModel.addObserver(this.#handleFilterEvent);
  }

  get filters() {
    return Object.entries(filter).map(([type, filterEvents]) => ({
      type: type,
      count: filterEvents(this.#eventsModel.points).length
    }));
  }

  init() {
    const filterPrev = this.#filter;

    this.#filter = new FilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      handleFilterChange: this.#handleFilterChange,
    });

    if (filterPrev === null) {
      return render(this.#filter, this.#filterContainer);
    }

    replace(this.#filter, filterPrev);
    remove(filterPrev);
  }

  #handleFilterEvent = () => {
    this.init();
  };

  #handleFilterChange = (typeFilter) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, typeFilter);
  };

}

