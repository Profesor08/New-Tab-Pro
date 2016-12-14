var starField = (function () {

  var WIDTH = 1600,
  HEIGHT = 900,
  DEPTH_OF_FIELD = 100,
  DISTANCE = 500,
  MAX_STAR_SIZE = 3.5,
  STAR_SPEED = 0.05,
  canvas,
  ctx,
  starCount = 500,
  stars = [];


  this.bg = {
  	r: 0,
  	g: 0,
  	b: 0,
  	a: 0.33333333333
  };

  function Star() {
    this.calcPosition();
  }

  Star.prototype.calcPosition = function (reset) {
    this.x = this.randomise(-25, 50);
    this.y = this.randomise(-25, 50);
    this.z = reset ? DEPTH_OF_FIELD : this.randomise(1, DEPTH_OF_FIELD);
  };

  Star.prototype.randomise = function (min, max) {
    return Math.floor((Math.random() * max) + min);
  };

  Star.prototype.plot = function () 
  {        
    var x = this.x * (DISTANCE / this.z) + WIDTH / 2,
    y = this.y * (DISTANCE / this.z) + HEIGHT / 2;

    if ((x >= 0 && x <= WIDTH) && (y >= 0 && y <= HEIGHT)) {
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.lineWidth = this.calcSize(this.z);
      ctx.strokeStyle = this.calcColor(this.z);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y + 1);
      ctx.stroke();
    }

    this.z -= STAR_SPEED;

    if (this.z <= 0) {
      this.calcPosition(true);
    }
  };

  Star.prototype.calcColor = function (z) {
    var rgb = Math.abs((z * 5) - 255).toFixed(0),
    a = (1 - ((z / (DEPTH_OF_FIELD / 100)) / 100)).toFixed(1);

    return 'rgba(' + rgb + ', ' + rgb + ', ' + rgb + ', ' + a + ')';
  };

  Star.prototype.calcSize = function (z) {
    return Math.abs(((z / (DEPTH_OF_FIELD / 100)) * (MAX_STAR_SIZE / 100)) - MAX_STAR_SIZE);
  };

  function setUpCanvas() {
    canvas = document.querySelector('#stars');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
  }

  function buildStars() {
    for (var i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  function renderStarField() {
    ctx.fillStyle = 'rgba('+ bg.r +', '+ bg.g +', '+ bg.b +', '+ bg.a +')';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < stars.length; i++) {
      stars[i].plot();
    }
  }

  function initialise() {
    setUpCanvas();
    buildStars();
    setInterval(renderStarField, 20);
  }

  function hexToRgba(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 0.0
    } : null;
  }

  return {
    init: initialise
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  starField.init();
});







