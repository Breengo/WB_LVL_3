import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers';
import html from './product.tpl.html';
import { ProductData } from 'types';
import sendEvent from '../../utils/sendEvent';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name, src, salePriceU } = this.product;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);

          const currentPath = window.location.pathname;

          if (currentPath.includes('catalog') || currentPath === '/') {
            fetch(`/api/getProductSecretKey?id=${id}`)
              .then((res) => res.json())
              .then((secretKey) => {
                const eventType = Object.keys(this.product.log).length > 0 ? 'viewCardPromo' : 'viewCard';
                sendEvent(eventType, { ...this.product, secretKey });
              });
          }
        }
      });
    });
    observer.observe(this.view.root);

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
  }
}
