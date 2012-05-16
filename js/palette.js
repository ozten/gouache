define(function () {
  var input,
      color = [255, 255, 255],
      scale = function (f) { return Math.round(f*255); }

  $(document).ready(function () {
    if (! input) {
        input = $('input[class=color]')
        input.bind('change', function () {
          console.log('change');
          color = input.get(0).color.rgb;
          console.log('change 2');
          color = [scale(color[0]), scale(color[1]), scale(color[2])];
console.log('change3');
          $('input[class=color]').trigger('color_choosen', [color[0], color[1], color[2]]);
console.log('change 4');
        });
      }
  });
  console.log(input);


  return {
    currentColor: function () {
      return color;
    }
  };
});