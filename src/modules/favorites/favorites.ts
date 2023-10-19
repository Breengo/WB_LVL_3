import { Component } from '../component';
import html from './favorites.tpl.html';

import { ProductList } from '../productList/productList';

class Favorites extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.productList.update(JSON.parse(favorites));
    }
  }
}

export const favoritesComp = new Favorites(html);
