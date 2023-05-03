import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();
flsFunctions.sliders();

const burger = document.querySelector('.burger-filled');
const menu = document.querySelector('.header__bottom');
const header = document.querySelector('.header');

if (burger && menu) {
    flsFunctions.burger(burger, menu, header);
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) &&
            event.target !== burger &&
            menu.classList.contains('active')
        ) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('lock');
        }
    });
}

const languages = document.querySelector('.header-languages');

if (languages) {
    const toggler = languages.querySelector('.header-languages__current');
    toggler.addEventListener('click', () => {
        languages.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!languages.contains(event.target)) {
            languages.classList.remove('open');
        }
    });
}

const parentMenuItems = document.querySelectorAll('.header-menu__item--childs');

if (parentMenuItems) {
    flsFunctions.headerMenu(parentMenuItems, '.header-menu__item--childs');
}

const cartButton = document.querySelector('.header-controls__cart .cart-toggler');
const cart = document.querySelector('.cart-popup');
const closeCartButton = cart.querySelector('.cart-popup__close');
if (cartButton && cart && closeCartButton) {
    const cartHeaderHeight = document.querySelector('.cart-popup__header').offsetHeight;
    const cartFooterHeight = document.querySelector('.cart-popup__footer').offsetHeight;
    const pageHeaderHeight = document.querySelector('.header').offsetHeight;
    const cartItemsList = document.querySelector('.cart-popup__body');

    cartButton.addEventListener('click', function() {
        cart.classList.toggle('open');
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 640) {
            document.body.classList.toggle('lock');
            cart.style.top = pageHeaderHeight - 1 + 'px';
            cartItemsList.style.maxHeight =
                window.innerHeight -
                cartHeaderHeight -
                cartFooterHeight -
                pageHeaderHeight -
                70 +
                'px';
            window.addEventListener('resize', function() {
                cartItemsList.style.maxHeight =
                    window.innerHeight -
                    cartHeaderHeight -
                    cartFooterHeight -
                    pageHeaderHeight -
                    70 +
                    'px';
            });
        }
    });

    closeCartButton.addEventListener('click', function() {
        cart.classList.remove('open');
        document.body.classList.remove('lock');
    });

    document.addEventListener('click', function(event) {
        if (!cart.contains(event.target) &&
            event.target !== cartButton &&
            event.target.parentNode !== cartButton &&
            cart.classList.contains('open')
        ) {
            cart.classList.remove('open');
            document.body.classList.remove('lock');
        }
    });
}

const calendarContainer = document.querySelector('.calendar');
if (calendarContainer) {
    const calendarHeader = calendarContainer.querySelector('.calendar-header');
    const prevButton = calendarHeader.querySelector('.prev');
    const nextButton = calendarHeader.querySelector('.next');
    const datesContainer = calendarContainer.querySelector('.dates');
    const currentDate = new Date();

    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    prevButton.addEventListener('click', () => {
        currentMonth--;

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        renderCalendar(currentMonth, currentYear);
    });

    function renderCalendar(month, year) {
        const monthNames = [
            'Ianuarie',
            'Februarie',
            'Martie',
            'Aprilie',
            'Mai',
            'Iunie',
            'Iulie',
            'August',
            'Septembrie',
            'Octombrie',
            'Noiembrie',
            'Decembrie',
        ];
        calendarHeader.querySelector('.calendar-header__current').textContent =
            monthNames[month] + ' ' + year;

        datesContainer.innerHTML = '';

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const firstDayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        let date = 1 - firstDayOfWeek;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (date < 1 || date > daysInMonth) {
                    cell.classList.add('calendar__cell--empty');
                } else {
                    if (
                        year > todayYear ||
                        (year === todayYear && month > todayMonth) ||
                        (year === todayYear && month === todayMonth && date >= todayDate)
                    ) {
                        cell.textContent = date;
                        if (
                            date === currentDate.getDate() &&
                            year === currentDate.getFullYear() &&
                            month === currentDate.getMonth()
                        ) {
                            cell.classList.add('calendar__cell--current');
                        }
                    } else {
                        cell.textContent = date;
                        cell.classList.add('calendar__cell--unavailable');
                    }
                }
                row.appendChild(cell);
                date++;
            }
            datesContainer.appendChild(row);
        }

        const dateInput = document.querySelector('.date-input input');

        datesContainer.addEventListener('click', (event) => {
            const cell = event.target;
            if (cell.classList.contains('calendar__cell--empty')) {
                return;
            }
            datesContainer.querySelectorAll('.selected').forEach((date) => {
                date.classList.remove('selected');
            });
            cell.classList.add('selected');
            const selectedDate = cell.textContent;
            const selectedMonth = currentMonth + 1;
            const selectedYear = currentYear;

            const formattedDate = `${selectedDate.padStart(2, '0')}.${selectedMonth
                .toString()
                .padStart(2, '0')}.${selectedYear}`;

            dateInput.value = formattedDate;
        });
    }

    renderCalendar(currentMonth, currentYear);
}

const orderHours = document.querySelectorAll('.checkout-hours__interval');
if (orderHours) {
    const hoursInput = document.querySelector('.hours-input input');
    orderHours.forEach((item) => {
        item.addEventListener('click', () => {
            orderHours.forEach((item) => {
                item.classList.remove('selected');
            });
            item.classList.add('selected');
            hoursInput.value = item.textContent;
        });
    });
}

const searchToggler = document.querySelector('.search-toggler');
const searchBar = document.querySelector('.searchbar');
const searchBarClose = searchBar.querySelector('.searchbar button');

if (searchBar && searchBarClose && searchToggler) {
    function openSidebar() {
        searchBar.classList.add('open');
        header.style.position = 'relative';
    }

    function closeSidebar() {
        searchBar.classList.remove('open');
        setTimeout(() => {
            header.style.position = 'initial';
        }, 300);
    }

    searchToggler.addEventListener('click', function() {
        if (searchBar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    document.addEventListener('click', function(event) {
        const targetElement = event.target;
        if (!searchBar.contains(targetElement) && !searchToggler.contains(targetElement)) {
            closeSidebar();
        }
    });

    searchBarClose.addEventListener('click', function() {
        closeSidebar();
    });
}

if (document.querySelector('.slider-hero__body')) {
    new Swiper('.slider-hero__body', {
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        touchRatio: 0,
        simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: '.slider-hero-controls__dots',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-hero-controls .slider-arrow__next',
            prevEl: '.slider-hero-controls .slider-arrow__prev',
        },
    });
}

if (document.querySelector('.slider-services__body')) {
    new Swiper('.slider-services__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        touchRatio: 0,
        simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: '.slider-services-controls__dots',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-services-controls .slider-arrow__next',
            prevEl: '.slider-services-controls .slider-arrow__prev',
        },
    });
}

if (document.querySelector('.slider-rest__body')) {
    new Swiper('.slider-rest__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        touchRatio: 0,
        simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: '.slider-rest-controls__dots',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-rest-controls .slider-arrow__next',
            prevEl: '.slider-rest-controls .slider-arrow__prev',
        },
    });
}


if (document.querySelector('.slider-structura__body')) {
    new Swiper('.slider-structura__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        touchRatio: 0,
        simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: '.slider-structura-controls__dots',
            clickable: true,
        },
        navigation: {
            nextEl: '.slider-structura-controls .slider-arrow__next',
            prevEl: '.slider-structura-controls .slider-arrow__prev',
        },
    });
}

if (document.querySelector('.slider-docs__body')) {
    const docsSwiper = new Swiper('.slider-docs__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        touchRatio: 0,
        simulateTouch: false,
        lazy: true,
        pagination: {
            el: '.slider-docs-pagination',
            type: 'fraction',
            renderFraction: function(currentClass, totalClass) {
                return (
                    `<span class="${currentClass}"></span>` +
                    '<span>din</span>' +
                    `<span class="${totalClass}"></span>`
                );
            },
        },
        navigation: {
            nextEl: '.slider-docs-controls .slider-arrow__next',
            prevEl: '.slider-docs-controls .slider-arrow__prev',
        },
    });
    const currentSlideImage = document.querySelector('.slider-docs__slide.swiper-slide.swiper-slide-active img').src
    let openUp = document.querySelector('.slider-docs-controls__crop.button.button__icon');
    openUp.href = currentSlideImage;
    docsSwiper.on('slideChange', function() {
        openUp.href = document.querySelectorAll('.slider-docs__slide.swiper-slide')[docsSwiper.activeIndex].querySelector('img').src;
    });
}

const historyImage = document.querySelector('.history-container');

if (historyImage) {
    document.querySelector('.history-slider').addEventListener('input', (e) => {
        historyImage.style.setProperty('--position', `${e.target.value}%`);
    });
}


const historyContainer = document.querySelector('.history-container__images');
if (historyContainer) {
    const historyContainerWidth = historyContainer.offsetWidth;
    const imageBefore = document.querySelector('.image-before .history-slider__image');
    imageBefore.style.width = `${historyContainerWidth}px`;
}


const tabsList = document.querySelectorAll('.tabs')

if (tabsList) {
    flsFunctions.tabs(tabsList)
}


const products = document.querySelectorAll('.product')
const overlay = document.querySelector('.overlay')

function closeModal() {
    const openModals = document.querySelectorAll('.open')
    if (openModals) {
        openModals.forEach(modal => {
            modal.classList.remove('open')
        })
    }
    overlay.classList.remove('active')
    document.body.classList.remove('lock')
}

if (products) {
    products.forEach(product => {
        const productsControls = product.querySelector('.product-meta__controls')
        var productModal = product.nextElementSibling
        product.addEventListener('click', (e) => {
            if (e.target.parentElement !== productsControls) {
                const productID = product.getAttribute('data-id')
                if (productModal.getAttribute('data-id') === productID) {
                    productModal.classList.add('open')
                    overlay.classList.add('active')
                    document.body.classList.add('lock')
                }
            }
        })
        const closeBtn = productModal.querySelector('.product-modal__close')
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal()
            })
        }
        document.onclick = function(event) {
            if (event.target === overlay) {
                closeModal()
            }
        }
    })
}

const structuraItem = document.querySelectorAll('.structure-grid__item')

if (structuraItem) {
    structuraItem.forEach(item => {
        const structuraId = item.getAttribute('data-structure-item-id')
        const structuraModal = item.nextElementSibling
        item.addEventListener('click', () => {
            if (structuraModal.getAttribute('data-structura-modal-id') === structuraId) {
                structuraModal.classList.add('open')
                overlay.classList.add('active')
                document.body.classList.add('lock')
            }
        })
        const closeBtn = document.querySelector('.structura-modal__close')
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal()
            })
        }
        document.onclick = function(event) {
            if (event.target === overlay) {
                closeModal()
            }
        }
    })
}

const productModalClose = document.querySelector('.product-modal.open .product-modal__close')
const structureModalClose = document.querySelector('.structura-modal.open .structura-modal__close')


// let sliderTemplate = new Swiper('.slider', {
//     effect: 'fade',
//     autoplay:{
//         delay: 3000,
//         disableOnInteraction: false,
//     },
//     observer: true,
//     observeParents: true,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     autoHeight: true,
//     speed: 800,
//     touchRatio: 0,
//     simulateTouch: false,
//     loop: true,
//     preloadImages: false,
//     lazy: true,
//     pagination: {
//         el: '.slider-pagging',
//         clickable: true,
//     },
//     navigation:{
//         nextEl: '.swiper-next',
//         prevEl: '.swiper-prev',
//     },
//     breakpoints: {
//         320: {
//             slidesPerView: 1,
//             spaceBetween: 0,
//             autoHeight: true,
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//         },
//         992: {
//             slidesPerView: 3,
//             spaceBetween: 20,
//         },
//         1268: {
//             slidesPerView: 4,
//             spaceBetween: 30,
//         },
//     },
//     on: {
//         lazyImageReady: function () {
//             ibg();
//         },
//     },
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     }
// })