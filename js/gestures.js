/* A gesture is a single complete mark */
define(function () {
    var pts = [],
        gestures = [],
        gesturing = false;
    window.g = gestures;
    window.p = pts;

    return {
      start: function () {
        gesturing = true;
      },
      // May be called more often than start
      end: function () {
        gesturing = false;
        if (pts.length > 0) {
          gestures.push(pts.slice());
          pts = [];
        }
      },
      add_point: function (x, y) {
        pts.push([x, y]);

      },
      points: function () {
        return gestures.shift();
      }

      // push add element
      // shift get and remove oldest element
      // While making a mark
      // Only give up completed gestures
      // Keep track of the currently being drawn gesture

    };
});