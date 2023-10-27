import $ from 'jquery';

export default function Parallax() {
  $(document).ready(function () {
    $('.wrapper').mousemove(function (e) {
      var containerWidth = $(this).width();
      var containerHeight = $(this).height();
      var mouseX = e.pageX - $(this).offset().left;
      var mouseY = e.pageY - $(this).offset().top;
      var offsetX = 0.5 + mouseX / containerWidth;
      var offsetY = 0.5 + mouseY / containerHeight;

      $('.parallax').each(function (index) {
        var offsetX = 0.5 + mouseX / containerWidth;
        var offsetY = 0.5 + mouseY / containerHeight;
        var rotationAngle = Math.floor(Math.random());

        if (index % 2 === 0) {
          $(this).css({
            transform:
              'translate(-50%,-50%) translate(' +
              offsetX * 40 +
              'px,' +
              offsetY * 40 +
              'px) rotate(' +
              rotationAngle +
              'deg)',
          });
        } else {
          $(this).css({
            transform:
              'translate(-50%,-50%) translate(' +
              offsetX * -40 +
              'px,' +
              offsetY * -40 +
              'px) rotate(' +
              rotationAngle +
              'deg)',
          });
        }
      });
    });
  });
}
