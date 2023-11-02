import $ from 'jquery';

export default class Dropdown {
  constructor(thisDrop) {
    this.drop = $(thisDrop);
    this.dropdownToggle = this.drop.find('.dropdown__trigger');
    this.dropdownMenu = this.drop.find('.dropdown__content');
    this.li = this.drop.find('.dropdown__item');
    this.height = this.dropdownMenu.height();
    this.dropdown();
    $(window).on('resize', () => this.CheckScreenSize());
  }

  CheckScreenSize() {
    const windowWidth = $(window).width();
    if (windowWidth <= 400) {
      $('.menu__footer').append(this.drop);
    } else {
      this.drop.insertAfter('.menu');
    }
  }

  dropdown() {
    const options = {
      rootMargin: `0px 0px -${this.height + 34}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, options);
    const self = this;

    function callback(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          self.dropdownMenu.css('top', '34px');
        } else {
          self.dropdownMenu.css('top', -self.height);
        }
      });
    }

    $(document).ready(function () {
      const targetElement = self.dropdownToggle[0];
      observer.observe(targetElement);
    });

    const classDrop = this.drop;
    const thisBtn = this.dropdownToggle;

    this.dropdownToggle.on('click', function () {
      classDrop.toggleClass('dropdown-active');
    });

    $(document).on('click', function (event) {
      if (!thisBtn.is(event.target) && thisBtn.has(event.target).length === 0) {
        classDrop.removeClass('dropdown-active');
      }
    });

    this.li.click(function () {
      $('.dropdown__trigger .dropdown__item').html($(this).html());
    });
  }
}
