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

  async removeProduct(product: ProductData) {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      const favoritesArr: ProductData[] = JSON.parse(storage);
      localStorage.setItem('favorites', JSON.stringify(favoritesArr.filter((favProd) => favProd.id !== product.id)));
    } else {
      localStorage.setItem('favorites', JSON.stringify([product]));
    }
    this._updCounters();
  }

  isInFav(product: ProductData) {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      const favoritesArr: ProductData[] = JSON.parse(storage);
      const searchRes = favoritesArr.find((favProduct) => favProduct.id === product.id);
      if (searchRes) return true;
    }
    return false;
  }

  private async _updCounters() {
    const storage = localStorage.getItem('favorites');
    const favoritesElem = document.querySelector<HTMLElement>('.favorites');
    if (storage) {
      const favorites = JSON.parse(storage);
      const count = favorites.length >= 10 ? '9+' : favorites.length;

      if (count > 0) {
        if (favoritesElem) favoritesElem.style.display = 'inline';
        document
          .querySelectorAll('.js__fav-counter')
          //@ts-ignore
          .forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
      } else if (favoritesElem) {
        favoritesElem.style.display = 'none';
      }
    } else {
      if (favoritesElem) favoritesElem.style.display = 'none';
    }
  }
}

export const favService = new FavService();
