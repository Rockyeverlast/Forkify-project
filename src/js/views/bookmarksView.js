import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = '';

  _generateMarkup() {
    return this._data.map(this.__generateMarkupPreview).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  __generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" crossOrigin = "anonymous " alt="${
      result.title
    }" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>

                <div class= "preview__user-generated ${
                  result.key ? '' : 'hidden'
                }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
                </div>
                  
                </div>
              </a>
          </li>
    `;
  }
}

export default new BookmarksView();

{
  /*  */
}
