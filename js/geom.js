
define(function () {
  "use strict";
  return {
    getControlPoints: function (x0,y0,x1,y1,x2,y2,t){
      var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
      var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
      var fa=t*d01/(d01+d12);   // scaling factor for triangle Ta
      var fb=t*d12/(d01+d12);   // ditto for Tb, simplifies to fb=t-fa
      var p1x=x1-fa*(x2-x0);    // x2-x0 is the width of triangle T
      var p1y=y1-fa*(y2-y0);    // y2-y0 is the height of T
      var p2x=x1+fb*(x2-x0);
      var p2y=y1+fb*(y2-y0);
      return [p1x,p1y,p2x,p2y];
    }
  }
});
