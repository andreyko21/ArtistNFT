import $ from "jquery";
import firebase from './firebase';

export default class CustomBy {
  constructor() {
      this.li = $(".custom-by__dropdown-li");
  }
  dropdown() {
    const dropDownOne = new Dropdown('#dropOne');
    const dropDownTwo = new Dropdown('#dropTwo')
  }
}

class Dropdown {
    constructor(thisDrop) {
        this.drop = $(thisDrop);
        this.dropdownToggle = this.drop.find('.custom-by__dropdown-btn');
        this.dropdownMenu = this.drop.find('.custom-by__dropdown-list');
        this.li = this.drop.find('.custom-by__dropdown-li');
        console.log(this.dropdownToggle);

        const options = {
            rootMargin: "0px 0px -190px 0px", 
            threshold: 0 
        };
        
        const classDrop = this.drop
        const thisBtn = this.dropdownToggle

        const observer = new IntersectionObserver(callback, options);
        const self = this;
        function callback(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    classDrop.removeClass('custom-by__dropdown-top');
                } else {
                    classDrop.addClass('custom-by__dropdown-top');
                }
            });
        }
        
        $(document).ready(function() {
            const targetElement = self.dropdownToggle[0];
            observer.observe(targetElement);
        });

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



