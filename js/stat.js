'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    x: 100,
    y: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    mainColor: 'rgba(0, 0, 0, 1)'
  };

  var cloudShadow = {
    x: cloud.x + 10,
    y: cloud.y + 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  };

  var histogram = {
    height: 150,
    userName: 'Вы',
    column: {
      x: cloud.x + 60,
      y: cloud.y + 230,
      width: 40,
      padding: 50,
      userBackgroundColor: 'rgba(255, 0, 0, 1)',
      getBackgroundColor: function (name) {
        if (name === histogram.userName) {
          return this.userBackgroundColor;
        } else {
          return 'rgba(0, 0, 255, ' + Math.random(0.5, 1) + ')';
        }
      }
    }
  };

  var maxTime = getMaxTime(times);

  function createHorizontalSide(direction, object) {
    var width = 420;
    var xPixelsInStep = 15;
    var yPixelsInStep = -5;
    var shiftX = xPixelsInStep;
    var shiftY = yPixelsInStep;
    var x = object.x;
    var y = object.y;

    if (direction === 'left') {
      shiftX = -xPixelsInStep;
      shiftY = -yPixelsInStep;
    }

    for (var i = 0; i <= (width / xPixelsInStep); i++) {
      if (i !== 0 && i % 2 === 0) {
        x += shiftX;
        y += shiftY;
      } else if (i !== 0) {
        x += shiftX;
        y -= shiftY;
      }

      ctx.lineTo(x, y);
    }

    object.x = x;
    object.y = y;
  }

  function createVerticalSide(direction, object) {
    var height = 270;
    var xPixelsInStep = -5;
    var yPixelsInStep = 15;
    var shiftX = xPixelsInStep;
    var shiftY = yPixelsInStep;
    var x = object.x;
    var y = object.y;

    if (direction === 'top') {
      shiftY = -yPixelsInStep;
      shiftX = -xPixelsInStep;
    }

    for (var i = 0; i <= (height / yPixelsInStep); i++) {
      if (i !== 0 && i % 2 === 0) {
        x -= shiftX;
        y += shiftY;
      } else if (i !== 0) {
        x += shiftX;
        y += shiftY;
      }

      ctx.lineTo(x, y);
    }

    object.x = x;
    object.y = y;
  }

  function paintObject(object, color) {
    ctx.beginPath();
    ctx.moveTo(object.x, object.y);

    createHorizontalSide('right', object);
    createVerticalSide('bottom', object);
    createHorizontalSide('left', object);
    createVerticalSide('top', object);

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function getMaxTime(times) {
    var maxTime = times[0];
    for (var i = 0; i < times.length; i++) {
      times[i] = Math.round(times[i]);
      if (times[i] > maxTime) {
        maxTime = times[i];
      }
    }
    return maxTime;
  }

  (function () {
    paintObject(cloudShadow, cloudShadow.backgroundColor);
    paintObject(cloud, cloud.backgroundColor);

    ctx.fillStyle = cloud.mainColor;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', cloud.x + 60, cloud.y + 20);
    ctx.fillText('Список результатов:', cloud.x + 60, cloud.y + 40);
  })();

  (function () {
    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = histogram.column.getBackgroundColor(names[i]);
      var histogramUserHeight = histogram.height / maxTime * times[i];
      ctx.fillRect(histogram.column.x, histogram.column.y, histogram.column.width, -histogramUserHeight);

      ctx.fillStyle = cloud.mainColor;
      ctx.fillText(times[i], histogram.column.x, histogram.column.y - 160);
      ctx.fillText(names[i], histogram.column.x, histogram.column.y + 30);

      histogram.column.x += histogram.column.padding + histogram.column.width;
    }
  })();
};
