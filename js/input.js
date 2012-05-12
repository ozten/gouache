//             storing events          painting        capturing events                    painting
// /...............................//=============//....................................//======================//.............

define(['gestures'], function (gestures) {
  function d(msg) {
    $('#debug').text(msg + '\n' + $('#debug').text());
  }
  var once=true;
  var canvas = $('canvas').get(0);
  return {

    init: function (state) {
      if (Modernizr.touch) {

        $(document).bind("touchstart", function (e) {
          if (e.target === canvas) {
            state.capture = true;
            gestures.start();
          }
        });
        $(document).bind("touchend touchcancel touchleave", function (e) {
          if (e.target === canvas) {
            state.capture = false;
            gestures.end();
            if (e.type === 'touchcancel') {
              //d('touchcancel');
            }
            if (e.type === 'touchleave') {
              //d('touchleave');
            }
          }
        });

        $(document).bind("touchmove", function (e) {
          if (e.target === canvas) {
            e.preventDefault();
            if ( e.type === 'touchmove') {
              once = false;
              //d('type: ' + e.type);
              if (e.changedTouches) d((typeof e.changedTouches) + ' e.changedTouches');
             // d(Object.keys(e).sort().join('\n'));
              //d('=========================');
              //d(Object.keys(e.originalEvent).sort().join('\n'));
              var o = e.originalEvent;
              var msg = "";
              try {
                for (var i=0; o.changedTouches && i < o.changedTouches.length; i++) {
                  var ct = o.changedTouches[i];
                  var keys = Object.keys(ct).sort();
                  msg += "changedTouches[" + i + "]=" + ct.identifier + '\n';
                  for (var k=0; keys && k < keys.length; k++) {
                    msg += keys[k] + '=' + ct[keys[k]] + '\n';
                  }
                }

                msg += "layerX=" + JSON.stringify(o.layerX) + '\n';
                //msg += "layerY=" + JSON.stringify(o.layerY) + '\n';
                msg += "pageX=" + JSON.stringify(o.pageX) + '\n';
                //msg += "pageY=" + JSON.stringify(o.pageY) + '\n';
                msg += "rotation=" + JSON.stringify(o.rotation) + '\n';
                msg += "scale=" + JSON.stringify(o.scale) + '\n';
                msg += "targetTouches=" + o.targetTouches.length + '\n';
                msg += "targetTouches[0].layerX=" + o.targetTouches[0].layerX + '\n';
                msg += "touches[0].layerX=" + o.touches[0].layerX + '\n';

                d(msg);
              } catch (e) {
                d(e.toString());
              }



              if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length > 0)
                gestures.add_point(e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY);

              for (var i=0; e.changedTouches && i < e.changedTouches.length; i++) {

              }
            }
          }
        });
      } else {
        // Non-touch environments

        $(document).bind("mousedown", function (e) {
          if (e.target === canvas) {
            state.capture = true;
            gestures.start();
          }
          //d('mousedown');
        });
        $(document).bind("mouseup", function (e) {
          state.capture = false;
          gestures.end();
          //d('mouseup');
        });
        $('#gouache').bind("mousedown mouseup mousemove", function (e) {
          e.preventDefault();
          //d('mousemove');
          if (state.capture) {
            //gestures.add_point(e.clientX, e.clientY);
            //d(', [' + e.clientX + ', ' + e.clientY + ']');
            gestures.add_point(e.originalEvent.layerX , e.originalEvent.layerY);
            d(', [' + (e.originalEvent.layerX) + ', ' + e.originalEvent.layerY + ']');
            //gestures.add_point(e.pageX, e.pageY);
            //d(', [' + e.pageX + ', ' + e.pageY + ']');

          }
        });
      }
    }
  };
});
