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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText('Ура вы победили!', 200, 30);
  ctx.fillText('Список результатов:', 200, 50);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    var timesRound = Math.round(times[i]);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(timesRound, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random(0, 0.7) + ')';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (HISTOGRAM_HEIGHT * times[i]) / maxTime);
  }
};
