import AbstractView from '../framework/view/abstract-view.js';

const createDownloadErrorTemplate = () => '<p class="trip-events__msg">Data upload error</p>';

export default class DownloadErrorView extends AbstractView {
  get template() {
    return createDownloadErrorTemplate();
  }
}
