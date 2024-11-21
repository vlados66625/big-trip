import AbstractView from '../framework/view/abstract-view.js';
import { formatsDate, calculatesDurationDate } from '../util/task.js';
import { DATE_FORMAT } from '../const.js';

const createEventsItemViewTemplate = ({ point, offers, destinations }) =>
  `<li class="trip-events__item">
       <div class="event">
         <time class="event__date" datetime="${formatsDate(point.dateFrom, DATE_FORMAT.DATA)}">${formatsDate(point.dateFrom, DATE_FORMAT.SHORT_DATE)}</time>
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
         </div>
         <h3 class="event__title">${point.type} ${destinations[point.destination].name}</h3>
         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="${formatsDate(point.dateFrom, DATE_FORMAT.FULL_DATETIME_Y_M_D)}">${formatsDate(point.dateFrom, DATE_FORMAT.TIME)}</time>
             &mdash;
             <time class="event__end-time" datetime="${formatsDate(point.dateTo, DATE_FORMAT.FULL_DATETIME_Y_M_D)}">${formatsDate(point.dateTo, DATE_FORMAT.TIME)}</time >
           </p >
    <p class="event__duration">${calculatesDurationDate(point.dateFrom, point.dateTo)}</p>
         </div >
         <p class="event__price">
           &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
         </p>
         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
    ${point.offers.map((offerId) =>
    `<li class="event__offer">
         <span class="event__offer-title">${offers[offerId].title}</span>
         &plus;&euro;&nbsp;
         <span class="event__offer-price">${offers[offerId].price}</span>
     </li>`).join('')}
         </ul>
         <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
           <span class="visually-hidden">Add to favorite</span>
           <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div >
  </li >`;

export default class EventItemView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #onRollupClick = null;
  #handleEventChange = null;

  constructor({ point, offers, destinations, onRollupClick, handleEventChange }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onRollupClick = onRollupClick;
    this.#handleEventChange = handleEventChange;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteBtnClick);
  }

  #onFavoriteBtnClick = () => this.#handleEventChange({ ...this.#point, isFavorite: !this.#point.isFavorite });

  get template() {
    return createEventsItemViewTemplate({ point: this.#point, offers: this.#offers, destinations: this.#destinations });
  }
}

