import { ProductData } from 'types';

class FavService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      const favoritesArr: (string | ProductData)[] = JSON.parse(storage);
      localStorage.setItem('favorites', JSON.stringify([...favoritesArr, product]));
    } else {
      localStorage.setItem('favorites', JSON.stringify([product]));
    }
    this._updCounters();
  }

  private async _updCounters() {
    const storage = localStorage.getItem('favorites');
    const favoritesElem = document.querySelector<HTMLElement>('.favorites');
    if (storage) {
      if (favoritesElem) favoritesElem.style.display = 'inline';
      const favorites = JSON.parse(storage);
      const count = favorites.length >= 10 ? '9+' : favorites.length;

      if (count > 0) {
        document
          .querySelectorAll('.js__fav-counter')
          //@ts-ignore
          .forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
      }
    } else {
      if (favoritesElem) favoritesElem.style.display = 'none';
    }
  }
}

export const favService = new FavService();
