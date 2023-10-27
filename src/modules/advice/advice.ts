import { Component } from '../component';

import html from './advice.tpl.html';

import { ProductData } from 'types';

class Advice extends Component {
  products!: ProductData[];

  async render() {
    this.bindToElem(this.view.adviceInput);
    this.setAdvices(['коляска', 'утюг']);
  }

  setAdvices(advices: string[]) {
    const adviceItems = this.view.root.querySelectorAll('.advice__item');
    adviceItems.forEach((item, index) => {
      const span = item.querySelector('span');
      if (advices[index] && span) span.innerText = advices[index];
    });
  }

  bindToElem(elem: HTMLInputElement) {
    const adviceItems = this.view.root.querySelectorAll('.advice__item');
    if (adviceItems) {
      adviceItems.forEach((item) => {
        item.addEventListener('click', () => {
          if (item.textContent) elem.value = item.textContent;
        });
      });
    }
  }
}

export const adviceComp = new Advice(html);
