define(function ()
{
  return function Flake(container, image)
  {

    var flake = null;
    var x = 0;
    var y = 0;
    var x_step = 0;
    var x_step_size = 0;
    var y_step = 2;
    var size = 0;
    var rotate = 0;
    var rotate_speed = 0;
    var direction = 0;
    var flip = 0;
    var flip_speed = 0;

    var container_height = null;
    var container_width = null;


    var rand = function (min, max)
    {
      return Math.round(min + Math.random() * (max - min));
    };

    var frand = function (min, max)
    {
      return (Math.random() * (min - max) + max);
    };

    var generateStyle = function ()
    {
      container_height = container.offsetHeight;
      container_width = container.offsetWidth;
      size = rand(10, 30);
      x = rand(size, container_width);
      y = -size;
      x_step = 0;
      x_step_size = rand(1, 10) / 100;
      y_step = frand(1, 5);
      rotate = rand(-1, 1);
      rotate_speed = 1 + Math.random() * (2 - 1);
      direction = frand(-1.5, 1.5);
      flip_speed = 0;
      flip = 0;
      if (rand(0, 100) < 30)
      {
        flip_speed = frand(30, 50) / 10;
      }
    };

    var animationStep = function ()
    {
      y += y_step;
      x_step += x_step_size;
      x += Math.cos(x_step);
      x += direction;
			if (rotate >= 0)
			{
				rotate += rotate_speed;
			}
			else
			{
				rotate -= rotate_speed;
			}
      flip += flip_speed;
			if (flip >= 360)
			{
				flip = 0;
			}
			if (flip >= 170 && flip <= 180)
			{
				flip = 190;
			}
			if (y >= container_height)
			{
				generateStyle();
			}
			if (x >= container_width)
			{
				generateStyle();
			}
    };

    this.run = function ()
    {
      generateStyle();
      this.generateElement();
      this.generateImage();
      this.display();
    };

    this.generateElement = function ()
    {
      y = rand(0, container_height - size);
      flake = document.createElement("img");
      flake.style.width = size + "px";
      flake.style.height = size + "px";
      flake.style.position = "absolute";
      flake.style.top = 0 + "px";
      flake.style.left = 0 + "px";
      flake.style.willChange = "all";
    };

    this.generateImage = function ()
    {
      flake.src = image + "/flake" + rand(1, 7) + ".png";
    };

    this.display = function ()
    {
      container.appendChild(flake);
    };

    this.animate = function ()
    {
      animationStep();

      flake.style.transform = "translate3d(" + x + "px, " + y + "px, 0px) rotate(" + rotate + "deg) rotateX(" + flip + "deg)";
    };

    this.hide = function ()
    {
      flake.style.display = "none";
    };

    this.show = function ()
    {
      flake.style.display = "block";
    };

    this.run();
  }
});