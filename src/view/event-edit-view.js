import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DateFormat, TypeEvent } from '../const.js';
import { formatsDate, convertsDateToIso } from '../util/task.js';

const createEventsEditViewTemplate = ({ point, offers, destinations, typeEvent, pointDestination, pointOffers }) =>
  `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png" alt="Event ${typeEvent} icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                      ${Object.values(TypeEvent).map((typeEvt) => `
                        <div class="event__type-item">
                          <input id="event-type-${typeEvt}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" data-event-type="${typeEvt}" value="${typeEvt}" ${typeEvent === typeEvt ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${typeEvt}" for="event-type-${typeEvt}-1">${typeEvt}</label>
                        </div>
                        `).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${point.id}">
                    ${typeEvent}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestination?.name}" list="destination-list-${point.id}">
                    <datalist id="destination-list-${point.id}">
                      ${Object.values(destinations).map((destination) => `<option value="${destination.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${formatsDate(point.dateFrom, DateFormat.FULL_DATETIME_D_M_Y)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${formatsDate(point.dateTo, DateFormat.FULL_DATETIME_D_M_Y)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${point.id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">

                      ${pointOffers.map((offerId, indexOffer) =>
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="offer-${indexOffer}-${point.id}" type="checkbox" name="${offers[offerId].title}">
          <label class="event__offer-label" for="offer-${indexOffer}-${point.id}">
            <span class="event__offer-title">${offers[offerId].title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offers[offerId].price}</span>
          </label>
     </div>`).join('')}
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination?.description}</p>
                  </section>
                </section>
              </form>
            </li>`;

export default class EventEditView extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destinations = null;
  #onEventEditFormSubmit = null;
  #closingWithoutSaving = null;

  constructor({ point, offers, destinations, onEventEditFormSubmit, closingWithoutSaving }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this._setState(this.#updateDataToState());
    this.#onEventEditFormSubmit = onEventEditFormSubmit;
    this.#closingWithoutSaving = closingWithoutSaving;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event').addEventListener('submit', this.#onEventEditFormItemSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupBtnClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeGroupChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onEventInputDestinationChange);
    this.element.querySelector(`#event-start-time-${this.#point.id}`).addEventListener('change', this.#onEventStartTimeChange);
    this.element.querySelector(`#event-end-time-${this.#point.id}`).addEventListener('change', this.#onEventEndTimeChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onEventInputPriceChange);
  }

  resetEventEditView = () => {
    this.updateElement(this.#updateDataToState());
  };

  #onEventEditFormItemSubmit = (evt) => {
    evt.preventDefault();
    this.#onEventEditFormSubmit(this.#updateStateToData(this._state).point);
  };

  #onRollupBtnClick = (evt) => {
    evt.preventDefault();
    this.#closingWithoutSaving();
  };

  #onEventTypeGroupChange = (evt) => {
    evt.preventDefault();
    const offers = Object.values(this.#offers).filter((offer) => offer.type === evt.target.dataset.eventType).map((offer) => offer.id);
    this.updateElement({ typeEvent: evt.target.dataset.eventType, pointOffers: offers });
  };

  #onEventInputDestinationChange = (evt) => {
    evt.preventDefault();
    let destinationEvent = Object.values(this.#destinations).find((destination) => destination.name === evt.target.value);
    if (destinationEvent === undefined) {
      destinationEvent = {};
      destinationEvent.description = 'Выберите город';
      destinationEvent.name = 'Выберите город';
    }
    this.updateElement({ pointDestination: destinationEvent });
  };

  #onEventStartTimeChange = (evt) => {
    evt.preventDefault();
    this._setState({ pointDateFrom: convertsDateToIso(evt.target.value) });
  };

  #onEventEndTimeChange = (evt) => {
    evt.preventDefault();
    this._setState({ pointDateTo: convertsDateToIso(evt.target.value) });
  };

  #onEventInputPriceChange = (evt) => {
    evt.preventDefault();
    this._setState({ pointBasePrice: Number((evt.target.value)) });
  };

  get template() {
    return createEventsEditViewTemplate(this._state);
  }

  #updateDataToState() {
    return {
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      typeEvent: this.#point.type,
      pointDestination: this.#destinations[this.#point.destination],
      pointDateFrom: this.#point.dateFrom,
      pointDateTo: this.#point.dateTo,
      pointBasePrice: this.#point.basePrice,
      pointOffers: this.#point.offers,
    };
  }


  #updateStateToData(state) {
    const { point, typeEvent, pointDestination, pointDateFrom, pointDateTo, pointBasePrice, pointOffers } = state;
    point.type = typeEvent;
    point.destination = pointDestination?.id;
    point.dateFrom = pointDateFrom;
    point.dateTo = pointDateTo;
    point.basePrice = pointBasePrice;
    point.offers = pointOffers;
    delete state.typeEvent;
    delete state.pointDestination;
    delete state.pointDateFrom;
    delete state.pointDateTo;
    delete state.pointBasePrice;
    delete state.pointOffers;
    return state;
  }
}
