import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filter) =>
  `<form class="trip-filters" action="#" method="get">
${filter.map(({ type, count }, index) =>
    `<div class="trip-filters__filter">
       <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" ${count === 0 ? 'disabled' : ''} name="trip-filter" value="${type}" ${index === 0 ? 'checked' : ''}>
       <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
     </div>`
  ).join('')}
       <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`;

export default class FilterView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
