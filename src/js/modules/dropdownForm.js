import $ from "jquery";

export default class Dropdown {
    constructor(thisDrop) {
        this.drop = $(thisDrop);
        this.dropdownToggle = this.drop.find('.custom-by__dropdown-btn');
        this.dropdownMenu = this.drop.find('.custom-by__dropdown-list');
        this.li = this.drop.find('.custom-by__dropdown-li');
        this.height = this.dropdownMenu.height();
        this.dropdown();
      }
      dropdown(){
        const options = {
          rootMargin: `0px 0px -${this.height + 70}px 0px`,
          threshold: 0
        };
        const observer = new IntersectionObserver(callback, options);
        const self = this;
  
        function callback(entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    self.dropdownMenu.css('top', '64px');
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
            classDrop.toggleClass("custom-by__dropdown-active");
        });
  
        $(document).on('click', function (event) {
            if (!thisBtn.is(event.target) && thisBtn.has(event.target).length === 0) {
                classDrop.removeClass("custom-by__dropdown-active");
            }
        });
  
        this.li.click(function () {
            thisBtn.text($(this).html());
        });
    }
  }
  