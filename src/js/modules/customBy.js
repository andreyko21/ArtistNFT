import $ from "jquery";
import firebase from './firebase';

export default class CustomBy {
    constructor(){
        this.li = $(".custom-by__dropdown-li");
    }
    dropdown(){
      $('.custom-by__dropdown-btn').on('click', function() {
        $('.custom-by__type').toggleClass("custom-by__dropdown-active");
      });
      $(document).on('click', function(event) {
        var element = $('.custom-by__dropdown-btn');
        if (!element.is(event.target) && element.has(event.target).length === 0) {
          $('.custom-by__type').removeClass("custom-by__dropdown-active");
        }
      });
      this.li.click(function() {
        $('.custom-by__dropdown-btn').text($(this).html())
      });
    }
}


