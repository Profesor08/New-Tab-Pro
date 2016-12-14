var Clouds = function (canvas_id, options)
{

  var defaultOptions = {
    count: 10,
    images: [
      "cloud.png",
      "dark_cloud.png",
      "explosion.png",
      "explosion2.png",
      "smoke.png"
    ]
  };

  if (options !== null)
  {
    for (var prop in defaultOptions)
    {
      if (defaultOptions.hasOwnProperty(prop))
      {
        if (!options.hasOwnProperty(prop))
        {
          options[prop] = defaultOptions[prop];
        }
      }
    }
  }

  var canvas = document.querySelector(canvas_id);

  var ctx = canvas.getContext("2d");

  var stopped = true, paused = false;

  var halfHorizontal, halfVertical;

  var rand = function (min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var clouds = [];

  var Cloud = function ()
  {
    var image = new Image();
    var imageLoaded = false;
    var x, y, size, rotate, rotate_speed, rotateDiretion, translateLeft, translateTop;

    var reset = function ()
    {
      size = rand(200, 800);
      x = canvas.offsetWidth / 2 - (Math.random() * canvas.offsetWidth);
      y = canvas.offsetHeight / 2 - (Math.random() * canvas.offsetHeight);
      rotate = 0;
      rotateDiretion = rand(0, 1) ? -1 : 1;
      rotate_speed = Math.random() * (2 - 1) / 10;
      translateLeft = rand(-400, 400);
      translateTop = rand(-200, 200);
    };

    this.draw = function ()
    {
      if (imageLoaded)
      {
        rotate += rotateDiretion * rotate_speed;

        if (rotate < 0)
        {
          rotate = 360;
        }
        else if (rotate > 360)
        {
          rotate = 0;
        }

        ctx.save();
        ctx.translate(halfHorizontal - size / 2, halfVertical - size / 2);
        ctx.translate(translateLeft + size / 2, translateTop + size / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.globalAlpha = 0.6;
        ctx.drawImage(image, -(size / 2), -(size / 2), size, size);
        ctx.restore();
      }
    };

    image.addEventListener("load", function ()
    {
      imageLoaded = true;
      reset();
      y = rand(-size, canvas.height);
    });

    image.src = options.images[rand(0, options.images.length - 1)];
  };

  this.updateCanvasSize = function ()
  {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    halfHorizontal = canvas.width / 2;
    halfVertical = canvas.height / 2;
  };

  this.start = function ()
  {
    if (stopped)
    {
      stopped = false;

      for (let i = 0; i < options.count; i++)
      {
        clouds.push(new Cloud());
      }

      this.draw();
    }
    else if (paused)
    {
      paused = false;
      this.draw();
    }
  };

  this.stop = function ()
  {
    clouds = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stopped = true;
    paused = false;
  };

  this.pause = function ()
  {
    paused = true;
  };

  this.draw = function ()
  {
    if (!stopped && !paused)
    {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < clouds.length; i++)
      {
        clouds[i].draw();
      }

      window.requestAnimationFrame(() => this.draw());
    }
  };

  this.updateCanvasSize();

  window.addEventListener("resize", () => this.updateCanvasSize());
};

