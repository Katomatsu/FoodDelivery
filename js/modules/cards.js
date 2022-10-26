import { getResource } from "../services/services";

function cards() {
    // Cards WITH CLASSES

    class Card {
        constructor(src, alt, title, descr, price, selector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(selector);
            this.transfer = 61.58;
            this.changeToRub();
        }

        changeToRub() {
            this.price = Math.floor(this.price * this.transfer);
        }

        createCards() {
            const elem = document.createElement('div');
            if (this.classes.length === 0) {
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach((className) => elem.classList.add(className));
            }

            elem.innerHTML = `
					<img src=${this.src} alt=${this.alt} />
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
					</div>
			`;
            this.parent.append(elem);
        }
    }

    getResource('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Card(img, altimg, title, descr, price, '.menu .container').createCards();
            });
        });
}

export default cards;