import $ from 'jquery';
$(document).ready(function () {
   $('.wrapper').mousemove(function (e) {
      var containerWidth = $(this).width();
      var containerHeight = $(this).height();
      var mouseX = e.pageX - $(this).offset().left;
      var mouseY = e.pageY - $(this).offset().top;
      var offsetX = 0.5 - mouseX / containerWidth;
      var offsetY = 0.5 - mouseY / containerHeight;

      $('.designer__box-star_top').css({
         transform:
            'translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
            rotate:'160' + 'deg'
           
      });
      $('.designer__box-star_bottom').css({
         transform:
            'translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
            rotate:'190' + 'deg'
           
      });
   });
});



