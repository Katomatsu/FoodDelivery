'use strict';

window.addEventListener('DOMContentLoaded', () => {
	// TABS
	const tabContent = document.querySelectorAll('.tabcontent'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabContent[i].classList.remove('hide');
		tabContent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//TIMER

	const deadline = '2023-06-15';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num <= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateCLock, 1000);
		updateCLock();

		function updateCLock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				days.innerHTML = `00`;
				hours.innerHTML = `00`;
				minutes.innerHTML = `00`;
				seconds.innerHTML = `00`;
			}
		}
	}

	setClock('.timer', deadline);

	// MODAL

	const triggers = document.querySelectorAll('[data-modal]'),
		closeBtn = document.querySelector('[data-close]'),
		modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show', 'fade');
		// modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModall() {
		modal.classList.remove('show', 'fade');
		// modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	triggers.forEach((item) => {
		item.addEventListener('click', openModal);
	});

	closeBtn.addEventListener('click', closeModall);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModall();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModall();
		}
	});

	const modalTimerId = setTimeout(openModal, 10000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// MENU WITH CLASSES

	class Tab {
		constructor(src, alt, title, text, price, selector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.text = text;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(selector);
			this.transfer = 61.58;
			this.changeToRub();
		}

		changeToRub() {
			this.price = Math.floor(this.price * this.transfer);
		}

		creatTabs() {
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
					<div class="menu__item-descr">${this.text}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
					</div>
			`;
			this.parent.append(elem);
		}
	}

	new Tab('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 10, '.menu .container', 'menu__item').creatTabs();

	new Tab('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'B меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 14, '.menu .container', 'menu__item').creatTabs();

	new Tab('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 21, '.menu .container', 'menu__item').creatTabs();

	// FORMS

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Скоро мы с вами свяжемя',
		failure: 'Что-то пошло не так...',
	};


	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statuMessage = document.createElement('div');
			statuMessage.classList.add('status');
			statuMessage.textContent = message.loading;
			form.append(statuMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json');

			const formData = new FormData(form);

			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statuMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statuMessage.remove();
					}, 2000);
				} else {
					statuMessage.textContent = message.failure;
				}
			});
		});
	}

	forms.forEach((item) => {
		postData(item);
	});
});
