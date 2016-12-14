define(function ()
{
  return function Star(container)
  {

    this.container = container;
    this.radius = this.container.offsetHeight;
    this.speed = 0.111111;
    this.size = {
      min: 1,
      max: 3,
      increase: 0.01,
      current: 1
    };

    this.opacity = 0.1;

    this.generatePosition = function ()
    {
      this.speed = 0.111111;
      var angle = this.rand(0, 359);
      var corner = 2 * Math.PI - angle / 180 * Math.PI;
      var radius = this.rand(0, this.radius);
      var x = radius * Math.cos(corner) + this.container.offsetWidth / 2;
      var y = radius * Math.sin(corner) + this.container.offsetHeight / 2;
      this.data = {
        angle: angle,
        corner: corner,
        radius: radius,
        x: x,
        y: y,
        z: 0
      };
      this.size.current = this.size.min;
      this.radius = 300;
      this.opacity = 0.1;
    };

    this.rand = function (min, max)
    {
      return Math.round(min + Math.random() * (max - min));
    };

    this.show = function ()
    {
      this.element.style.display = "block";
    };

    this.hide = function ()
    {
      this.element.style.display = "none";
    };

    this.percent = function (value, max)
    {
      return value * 100 / max / 1000;
    };

    this.animate = function ()
    {
      this.speed += this.percent(this.radius, this.container.offsetWidth);
      this.data.radius += this.speed;
      this.data.x = this.data.radius * Math.cos(this.data.corner) + this.container.offsetWidth / 2;
      this.data.y = this.data.radius * Math.sin(this.data.corner) + this.container.offsetHeight / 2;

      var translate3d = "translate3d(" + this.data.x + "px, " + this.data.y + "px, " + this.data.z + "px) ";

      this.size.current += this.size.increase;
      var scale = "scale(" + this.size.current + ", " + this.size.current + ")";
      var rotate = "rotate(45deg) rotateX(0deg) ";

      this.opacity += this.percent(this.radius, this.container.offsetWidth) / 3;

      this.element.style.opacity = this.opacity;
      this.element.style.transform = translate3d + scale + rotate;
      if (this.data.x < 0 || this.data.x > this.container.offsetWidth || this.data.y < 0 || this.data.y > this.container.offsetHeight)
      {
        this.generatePosition();
      }
    };


    this.generatePosition();
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = "0px";
    this.element.style.top = "0px";
    this.element.style.width = this.size.min + "px";
    this.element.style.height = this.size.min + "px";
    this.element.style.backgroundColor = "#FFFFFF";
    this.element.style.transform = "translate3d(" + this.data.x + "px, " + this.data.y + "px, 0px)";
    this.element.style.willChange = "all";
    this.container.appendChild(this.element);

  }

});