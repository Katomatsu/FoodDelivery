function slider() {

    // My slider

    // const slides = document.querySelectorAll('.offer__slide'),
    // 	currElem = document.querySelector('#current'),
    // 	total = document.querySelector('#total'),
    // 	prev = document.querySelector('.offer__slider-prev'),
    // 	next = document.querySelector('.offer__slider-next');
    // let i = 1;

    // showSlides();

    // if (slides.length < 10) {
    // 	total.textContent = `0${slides.length}`;
    // } else {
    // 	total.textContent = slides.length;
    // }

    // function showSlides() {
    // 	slides.forEach(item => {
    // 		item.classList.add('hide');
    // 		item.classList.remove('show', 'fade');
    // 	});

    // 	slides[i - 1].classList.add('show', 'fade');
    // 	slides[i - 1].classList.remove('hide');

    // 	if (slides.length < 10) {
    // 		currElem.textContent = `0${i}`;
    // 	} else {
    // 		currElem.textContent = i;
    // 	}
    // }

    // next.addEventListener('click', () => {
    // 	i++;
    // 	if (i > slides.length) {
    // 		i = 1;
    // 	}
    // 	showSlides(i);
    // });

    // prev.addEventListener('click', () => {
    // 	i--;
    // 	if (i < 1) {
    // 		i = slides.length;
    // 	}
    // 	showSlides(i);
    // });



    // slider that I made according to the course

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        currElem = document.querySelector('#current'),
        total = document.querySelector('#total'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let i = 1;
    let offset = 0;


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        currElem.textContent = `0${i}`;
    } else {
        total.textContent = slides.length;
        currElem.textContent = i;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('dots');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function slicePx(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == slicePx(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += slicePx(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (i == slides.length) {
            i = 1;
        } else {
            i++;
        }

        if (slides.length < 10) {
            currElem.textContent = `0${i}`;
        } else {
            currElem.textContent = i;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });

        dots[i - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = slicePx(width) * (slides.length - 1);
        } else {
            offset -= slicePx(width);
        }

        if (i == 1) {
            i = slides.length;
        } else {
            i--;
        }

        if (slides.length < 10) {
            currElem.textContent = `0${i}`;
        } else {
            currElem.textContent = i;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });

        dots[i - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            i = slideTo;
            offset = slicePx(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currElem.textContent = `0${i}`;
            } else {
                currElem.textContent = i;
            }

            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[i - 1].style.opacity = '1';
        });
    });

}

module.exports = slider;