import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTitleTemplate = (uniqueDestinationsNameArray) => {
  let textDestinotions;
  if (uniqueDestinationsNameArray.length <= 3) {
    textDestinotions = uniqueDestinationsNameArray.join(' &mdash; ');
  } else {
    textDestinotions = `${uniqueDestinationsNameArray[0]} &mdash;...&mdash; ${uniqueDestinationsNameArray.at(-1)}`;
  }
  return `<h1 class="trip-info__title">${textDestinotions}</h1>`;
};

const createTripInfoTemplate = ({ tripTotalPrice, uniqueDestinationsNameArray, dateFrom, dateTo }) =>
  `<section class="trip-main__trip-info  trip-info">
     <div class="trip-info__main">
     ${createTripInfoTitleTemplate(uniqueDestinationsNameArray)}
       <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
     </div>
     <p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotalPrice}</span>
     </p>
   </section>`;

export default class TripInfoView extends AbstractView {
  #tripTotalPrice = null;
  #uniqueDestinationsNameArray = null;
  #dateFrom = null;
  #dateTo = null;

  constructor({ tripTotalPrice, uniqueDestinationsNameArray, dateFrom, dateTo }) {
    super();
    this.#tripTotalPrice = tripTotalPrice;
    this.#uniqueDestinationsNameArray = uniqueDestinationsNameArray;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
  }

  get template() {
    return createTripInfoTemplate({ tripTotalPrice: this.#tripTotalPrice, uniqueDestinationsNameArray: this.#uniqueDestinationsNameArray, dateFrom: this.#dateFrom, dateTo: this.#dateTo });
  }
}
