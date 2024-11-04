if (!customElements.get('swiper-component')) {
  class SwiperComponent extends HTMLElement {

    constructor() {
      super();
      this.swiperWrapper = this.querySelector('.swiper-wrapper');
      this.swiperButtonNext = this.querySelector('.swiper-button-next');
      this.swiperButtonPrev = this.querySelector('.swiper-button-prev');
      this.swiperPagination = this.querySelector('.swiper-pagination');
      this.settings = {
        slidesPerView: parseInt(this.dataset.slidesPerView) || 1,
        freemode: this.dataset.freemode === 'true',
        watchSlidesProgress: this.dataset.watchSlidesProgress === 'true',
        spaceBetween: parseInt(this.dataset.spaceBetween) || 0,
        navigation: {
          nextEl: this.swiperButtonNext,
          prevEl: this.swiperButtonPrev,
        },
        pagination: {
          el: this.swiperPagination,
          type: "bullets",
        },
        thumbs: this.dataset.thumbs ? { swiper: null } : undefined,
      }
    }

    connectedCallback() {
      if (!this.dataset.thumbs) {
        this.swiper = new Swiper(this, this.settings);
        return;
      }

      this.initializeWithThumbs();
    }

    initializeWithThumbs() {
      const thumbsElement = document.querySelector(this.dataset.thumbs);

      const initializeMainSwiper = () => {
        if (thumbsElement && thumbsElement.swiper) {
          this.settings.thumbs.swiper = thumbsElement.swiper;
          this.swiper = new Swiper(this, this.settings);
        } else {
          requestAnimationFrame(initializeMainSwiper);
        }
      };

      initializeMainSwiper();
    }
  }

  customElements.define('swiper-component', SwiperComponent);
}

if (!customElements.get('product-accordion')) {
  class ProductAccordion extends HTMLElement {
    constructor() {
      super();
      this.headers = this.querySelectorAll('.accordion-header');

      this.headers.forEach(header => {
        header.addEventListener('click', () => this.toggleAccordion(header));
      });
    }

    toggleAccordion(header) {
      const content = header.nextElementSibling;

      header.classList.toggle('accordion__item--active');
      content.classList.toggle('accordion-content--open');
    }
  }

  customElements.define('product-accordion', ProductAccordion);
}
