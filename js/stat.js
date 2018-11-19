'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 240;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var HISTOGRAM_HEIGHT = 150;
var TEXT_HEIGHT = 16;
var FONT_STYLE = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = FONT_STYLE;
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText('Ура вы победили!', 200, 30);
  ctx.fillText('Список результатов:', 200, 45);
  var maxTime = getMaxElement(times);
  var renderHistogram = function () {
    for (var i = 0; i < players.length; i++) {
      var timesRound = Math.round(times[i]);
      var coordinateX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
      var textY = CLOUD_Y + CLOUD_HEIGHT - GAP;
      var barHeight = HISTOGRAM_HEIGHT * times[i] / maxTime;
      var timesY = textY - GAP - TEXT_HEIGHT - barHeight;
      var barY = textY - TEXT_HEIGHT - barHeight;

      var renderBar = function () {
        ctx.fillRect(coordinateX, barY, BAR_WIDTH, barHeight);
      };

      var getRandomBlue = function (min, max) {
        var randomColorValue = Math.floor(Math.random() * (max - min)) + min;
        var randomBlue = 'rgba(' + randomColorValue + ', ' + randomColorValue + ', 255, 1)';
        return randomBlue;
      };

      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(players[i], coordinateX, textY);
      ctx.fillText(timesRound, coordinateX, timesY);

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = getRandomBlue(0, 150);
      }

      renderBar();
    }
  };

  renderHistogram();
};
