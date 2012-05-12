/* Author:

*/
require(['input', 'basic_brush'], function (input, basic_brush) {
  "use strict";
  var state = {
    capture: false
  };
  var show = true;
  var label = [$('#save-photo-menu').text(), 'Continue Drawing'];
  $('#save-photo-menu').click(function (e) {
    e.preventDefault();

    if (show) {
      var canvas = $('#gouache').get(0);
      var img = Canvas2Image.saveAsJPEG(canvas, true);
      $('[role=main]').append(img);
      var css = $.extend({position: 'absolute', ":hover": "border: solid 1px red"},
        $('#gouache').offset())
      $('img', $('[role=main]')).css(css);
      $(this).text(label[1]);
    } else {
      $('img', $('[role=main]')).remove();
      $(this).text(label[0]);
    }
    show = ! show;

  });
  input.init(state);
  // http://scaledinnovation.com/analytics/splines/aboutSplines.html

  setInterval(function () {
    basic_brush.draw(state);
  }, 100);

});



