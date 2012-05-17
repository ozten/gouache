define(['geom', 'gestures', 'palette'], function (geom, gestures, palette) {
  "use strict";


  var canvas = document.getElementById("gouache"),
      pts;
  var c = canvas.getContext('2d');
  c.fillStyle = 'rgb(255, 255, 255)';
  c.fillRect(0, 0, $('#gouache').width(), $('#gouache').height());
  var offset = $('#gouache').offset();
  c.translate(0 - offset.left, 0 - offset.top);


  $('#choose-pensil-menu').click(function (e) {
    e.preventDefault();
    c.lineCap = 'round';
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(50, 50, 50, 1)';
  });

    $('#choose-wc-brush-menu').click(function (e) {
      e.preventDefault();
      c.lineCap = 'round';
    });
    $('input[class=color]').bind('color_choosen', function (e, r, g, b) {
      c.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ' , 0.8)';
    });
    $('input[type=range]').bind('change', function () {
      c.lineWidth = $(this).val();
      console.log(c.lineWidth);
    });


  /*
  c.shadowOffsetX = 10;
  c.shadowOffsetY = 10;
  c.shadowBlur = 3;
  c.shadowColor = 'rgb(0, 0, 0)';
  */

  return {
    draw: function (state) {
      if (canvas && canvas.getContext) {
        var offset = $(canvas).offset();
        var ctx = canvas.getContext("2d");
        window.ctx = ctx;
        if (! pts || pts.length === 0) {
          // If gestures is empty, we'll get undefined
          pts = gestures.points();
        }
        if (! pts || pts.length === 0) {
          return;
        }
        var len = pts.length;


        ctx.beginPath();

        for (var i=0; pts && i < len; i++) {
          ctx.fillStyle = "rgb(200,0,0)";
          // With three points, we can make a bezier curve
          // With two points...
          // With just one point, nothing.
          var p0 = pts.shift();
          var x = p0[0] - offset.left;
          var y = p0[1] - offset.top;
          if (i+2 < len) {
            var p1 = pts[0];
            var x2 = p1[0] - offset.left;
            var y2 = p1[1] - offset.top;

            var p2 = pts[1];
            var x3 = p2[0] - offset.left;
            var y3 = p2[1] - offset.top;

            //var cntl = geom.getControlPoints(x3, y3, x2, y2, x, y, 0.3);
            var cntl = geom.getControlPoints(x, y, x2, y2, x3, y3, 0);

            //ctx.moveTo(x2, y);
            //ctx.bezierCurveTo(x, y, x + (x2 - x), y + (y2 - y), x2, y2);
            //console.log('ctx.bezierCurveTo(' + x + ', ' + y + ', ' + (x2 + (x2 - x)) + ', ' + (y2 + (y2 - y)) + ', ' + x2 + ', ' + y2 + ');');
            ctx.bezierCurveTo(x, y, cntl[0], cntl[1], cntl[2], cntl[3]);
            //ctx.moveTo(0, 0);
          } else if (i + 1 < len) {
            var x2 = pts[0][0];
            var y2 = pts[0][1];
            ctx.lineTo(x, y, x2 - x, y2 - y);
          }
          //ctx.fillRect(x, y, 1, 1);
          //ctx.arc(x, y, 4, 0, Math.PI * 2, false);
        }
        ctx.stroke();
        pts = [];
      }
    }
  }
});