// by Profesor08

define(function ()
{
  return function (container)
  {

    var size = null;
    var image = null;
    var direction = null;
    var speed = null;
    var rotationZ = null;
    var x = null;
    var y = null;
    var z = null;
    var cloud = null;

    var interval = null;

    this.constructor = function ()
    {
      size = this.size(200, 800);
      image = this.image();
      direction = this.direction();
      speed = this.speed() + 0.00;
      rotationZ = this.rotation();
      x = container.offsetWidth / 2 - ( Math.random() * container.offsetWidth );
      y = container.offsetHeight / 2 - ( Math.random() * container.offsetHeight );
      z = 100 - ( Math.random() * 200 );
    };

    this.animate = function ()
    {
      if (!cloud)
      {
        return;
      }
      interval = setInterval(function ()
      {
        cloud.style.transform = "translateX(" + x + "px) translateY(" + y + "px ) rotateZ(" + (rotationZ += (speed * direction)) + "deg) translate3d(0, 0, 0)";
      }, 1000 / 60);
    };

    this.generate = function ()
    {
      cloud = document.createElement("div");
      cloud.style.position = "absolute";
      cloud.style.top = 0 + "px";
      cloud.style.left = 0 + "px";
      cloud.style.width = size + "px";
      cloud.style.height = size + "px";
      cloud.style.background = "url(assets/scripts/lib/clouds/" + image + ") no-repeat";
      cloud.style.backgroundSize = "contain";
      cloud.style.opacity = "0.6";
      cloud.style.transform = "translateX(" + x + "px) translateY(" + y + "px ) rotateZ(" + rotationZ + "deg)";
    };

    this.display = function ()
    {
      container.appendChild(cloud);
    };

    this.direction = function ()
    {
      var result = Math.floor(Math.random() * 2);
      if (result == 1)
      {
        return 1;
      }
      return -1;
    };

    this.speed = function ()
    {
      return 0.03 * Math.random();
    };

    this.size = function (min, max)
    {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    this.rotation = function ()
    {
      return Math.floor(Math.random() * 360 + 1);
    };

    this.image = function ()
    {
      var result = Math.floor(Math.random() * 100 + 1);
      if (result <= 20)
      {
        return "explosion2.png";
      }
      if (result <= 50)
      {
        return "explosion.png";
      }
      if (result <= 85)
      {
        return "darkCloud.png";
      }
      if (result <= 100)
      {
        return "darkCloud.png";
      }
      return "cloud.png";
    };

    this.stop = function ()
    {
      clearInterval(interval);
    };

    this.start = function ()
    {
      this.animate();
    };

    this.hide = function ()
    {
      cloud.style.display = "none";
    };

    this.show = function ()
    {
      cloud.style.display = "block";
    };

    this.constructor();

  }
});