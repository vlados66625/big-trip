import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TypeEvent, MIN_VALUE_PRICE, MAX_VALUE_PRICE } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createEventsEditOffersTemplate = ({ point, offers, typeEvent, pointOffers, isDisable }) => {
  const fiterOffers = Object.values(offers).filter((offer) => offer.type === typeEvent);
  if (fiterOffers.length !== 0) {

    const offersTemplate = fiterOffers.map((offerByType, indexOffer) =>
      `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="offer-${indexOffer}-${point.id}" type="checkbox" ${isDisable ? 'disabled' : ''} data-offer-id="${offerByType.id}" name="${offerByType.title}" ${pointOffers.find((pointOffer) => offerByType.id === pointOffer) ? 'checked' : ''}>
         <label class="event__offer-label" for="offer-${indexOffer}-${point.id}">
           <span class="event__offer-title">${he.encode(offerByType?.title)}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offerByType.price}</span>
         </label>
       </div>`).join('');

    return (
      `<section class="event__section  event__section--offers">
         <h3 class="event__section-title  event__section-title--offers">Offers</h3>
         <div class="event__available-offers">
           ${offersTemplate}
       </section>`
    );
  }

  return '';
};
const createEventsEditDestinationTemplate = ({ pointDestination }) => {
  if (pointDestination?.description) {
    return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${he.encode(pointDestination?.description || '')}</p>
  </section>
  `;
  }

  return '';
};

const createEventsEditDestinationPhotoTemplate = ({ pointDestination }) => {
  if (pointDestination?.pictures && pointDestination?.pictures?.length !== 0) {

    const picturesTemplate = pointDestination.pictures.map((picture) => `
     <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('');

    return `
 <div class="event__photos-container">
   <div class="event__photos-tape">
   ${picturesTemplate}
   </div>
 </div>
`;
  }
  return '';
};

const createEventsEditViewTemplate = ({ point, offers, destinations, typeEvent, pointDestination, pointOffers, isDisable, isSaiving, isDeleting }) =>
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
                 <label class="event__type-label  event__type-label--${typeEvt}" for="event-type-${typeEvt}-1">${he.encode(typeEvt)}</label>
               </div>
               `).join('')}
             </fieldset>
           </div>
         </div>

                  <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-${point.id}">
           ${he.encode(typeEvent)}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" ${isDisable ? 'disabled' : ''} name="event-destination" ${pointDestination?.name ? '' : 'placeholder="Выберите город из списка"'} value="${pointDestination?.name || ''}" list="destination-list-${point.id}">
           <datalist id="destination-list-${point.id}">
             ${Object.values(destinations).map((destination) => `<option value="${destination.name}"></option>`).join('')}
           </datalist>
         </div>

         <div class="event__field-group  event__field-group--time">
           <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
           <input class="event__input  event__input--time" id="event-start-time-${point.id}" ${isDisable ? 'disabled' : ''} type="text" name="event-start-time" value="${point.dateFrom}">
           &mdash;
           <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
           <input class="event__input  event__input--time" id="event-end-time-${point.id}" ${isDisable ? 'disabled' : ''} type="text" name="event-end-time" value="${point.dateTo}">
         </div>

         <div class="event__field-group  event__field-group--price">
           <label class="event__label" for="event-price-${point.id}">
             <span class="visually-hidden">Price</span>
             &euro;
           </label>
           <input class="event__input  event__input--price" id="event-price-${point.id}" ${isDisable ? 'disabled' : ''} type="text" name="event-price" value="${point.basePrice}">
         </div>

         <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisable ? 'disabled' : ''}>${isSaiving ? 'Saiving...' : 'Save'}</button>
         <button class="event__reset-btn" type="reset" ${isDisable ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </header>
       <section class="event__details">

       ${createEventsEditOffersTemplate({ point, offers, typeEvent, pointOffers, isDisable })}
       ${createEventsEditDestinationTemplate({ pointDestination })}
       ${createEventsEditDestinationPhotoTemplate({ pointDestination })}
       </section>
     </form>
   </li>`;

export default class EventEditView extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destinations = null;
  #onEventEditFormSubmit = null;
  #closeEditForm = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteEvent = null;
  #eventInputPriceElement = null;
  #eventInputDestinationElement = null;

  constructor({ point, offers, destinations, onEventEditFormSubmit, closeEditForm, handleDeleteEvent }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this._setState(this.#updateDataToState());
    this.#onEventEditFormSubmit = onEventEditFormSubmit;
    this.#closeEditForm = closeEditForm;
    this.#handleDeleteEvent = handleDeleteEvent;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.#eventInputPriceElement = this.element.querySelector('.event__input--price');
    this.#eventInputDestinationElement = this.element.querySelector('.event__input--destination');

    this.#eventInputPriceElement.addEventListener('change', this.#onEventInputPriceChange);
    this.#eventInputPriceElement.addEventListener('input', this.#onEventInputPriceInput);
    this.#eventInputDestinationElement.addEventListener('change', this.#onEventInputDestinationChange);
    this.element.querySelector('.event').addEventListener('submit', this.#onEventEditFormItemSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupBtnClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeGroupChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onEventDeleteBtnClick);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  resetEventEditView = () => {
    this.updateElement(this.#updateDataToState());
  };

  removeElement() {
    super.removeElement();
    this.#removeDatepicker(this.#datepickerFrom);
    this.#removeDatepicker(this.#datepickerTo);
  }

  #removeDatepicker(datepicker) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }
  }

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector(`#event-start-time-${this.#point.id}`),
      {
        ...this.#datepickerParameters,
        defaultDate: this._state.pointDateFrom,
        onChange: this.#handleDateStartChange,
        maxDate: this._state.pointDateTo,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector(`#event-end-time-${this.#point.id}`),
      {
        ...this.#datepickerParameters,
        defaultDate: this._state.pointDateTo,
        onChange: this.#handleDateEndChange,
        minDate: this._state.pointDateFrom,
      },
    );
  }

  #datepickerParameters = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    locale: {
      firstDayOfWeek: 1,
    },
    'time_24hr': true
  };

  #handleDateStartChange = ([userDate]) => {
    this.updateElement({ pointDateFrom: userDate.toISOString() });
  };

  #handleDateEndChange = ([userDate]) => {
    this.updateElement({ pointDateTo: userDate.toISOString() });
  };

  #onEventEditFormItemSubmit = (evt) => {
    evt.preventDefault();
    if (
      this.#eventInputDestinationElement.value === '' ||
      this.#eventInputPriceElement.value === '' ||
      Number(this.#eventInputPriceElement.value) < MIN_VALUE_PRICE ||
      Number(this.#eventInputPriceElement.value) > MAX_VALUE_PRICE
    ) {
      return;
    }
    this.#setStateOffersSelected();
    this.#onEventEditFormSubmit(this.#updateStateToData(this._state).point);
  };

  #setStateOffersSelected() {
    const offersSelected = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked')).map((offerSelected) => offerSelected.dataset.offerId);
    this._setState({ pointOffers: offersSelected });
  }

  #onRollupBtnClick = (evt) => {
    evt.preventDefault();
    this.#closeEditForm();
  };

  #onEventTypeGroupChange = (evt) => {
    evt.preventDefault();
    this._setState({ pointOffers: [] });
    this.updateElement({ typeEvent: evt.target.dataset.eventType });
  };

  #onEventInputDestinationChange = (evt) => {
    evt.preventDefault();
    let destinationEvent = Object.values(this.#destinations).find((destination) => destination.name === evt.target.value);
    if (!destinationEvent) {
      destinationEvent = {};
      destinationEvent.id = '';
      destinationEvent.name = '';
      destinationEvent.description = '';
      destinationEvent.pictures = [];
    }
    this.updateElement({ pointDestination: destinationEvent });
  };

  #onEventInputPriceChange = (evt) => {
    evt.preventDefault();
    this._setState({ pointBasePrice: Number((evt.target.value)) });
  };

  #onEventInputPriceInput = (evt) => {
    evt.target.value = evt.target.value.replace(/\D/g, '');
  };

  #onEventDeleteBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteEvent(this.#point);
  };

  get template() {
    return createEventsEditViewTemplate(this._state);
  }

  #initialState = {
    typeEvent: null,
    pointDestination: null,
    pointDateFrom: null,
    pointDateTo: null,
    pointBasePrice: null,
    pointOffers: null,
    isDisable: null,
    isSaiving: null,
    isDeleting: null,
  };

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
      isDisable: false,
      isSaiving: false,
      isDeleting: false,
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
    return { ...state, ...this.#initialState };
  }
}
