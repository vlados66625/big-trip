import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = ({ filters, currentFilter }) =>
  `<form class="trip-filters" action="#" method="get">
${filters.map(({ type, count }) =>
    `<div class="trip-filters__filter">
       <input
         id="filter-${type}"
         class="trip-filters__filter-input  visually-hidden"
         type="radio" ${count === 0 ? 'disabled' : ''}
         name="trip-filter"
         value="${type}"
         ${type === currentFilter ? 'checked' : ''}
         data-type-filter = "${type}">
       <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
     </div>`
  ).join('')}
       <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`;

export default class FilterView extends AbstractView {
  #filter = null;
  #currentFilter = null;
  #handleFilterChange = null;

  constructor({ filters, currentFilter, handleFilterChange }) {
    super();
    this.#filter = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = handleFilterChange;
    this.element.addEventListener('change', this.#onTripFiltersChange);
  }

  #onTripFiltersChange = (evt) => {
    evt.preventDefault();
    const typeFilter = evt.target.dataset.typeFilter;
    this.#handleFilterChange(typeFilter);
  };

  get template() {
    return createFilterTemplate({ filters: this.#filter, currentFilter: this.#currentFilter });
  }
}
