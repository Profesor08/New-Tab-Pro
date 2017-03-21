
class FlyingThroughTheSpace {

  constructor(canvas_id, options)
  {
    this.options = {
      experimental: false,
      speed: 1,
      count: 10,
      background: 'rgba(0, 0, 0, 1)',
      verticalScale: 4,
      horizontalScale: 4,
      distance: 12,
      colors: [
        "#9BB0FF",
        "#AABFFF",
        "#C8D6FD",
        "#F8F7FD",
        //"#FCFFD4",
        //"#FEF4EA",
        //"#FFF3A1",
        //"#FED2A3",
        //"#FFA350",
        //"#FECB72",
        //"#FF5E53"
      ]
    };

    if (options !== null)
    {
      for (let prop in this.options)
      {
        if (this.options.hasOwnProperty(prop) && options.hasOwnProperty(prop))
        {
          this.options[prop] = options[prop];
        }
      }
    }

    this.ctx = document.querySelector(canvas_id).getContext("2d");

    this.run = true;

    this.stars = [];

    this.updateCanvasSize();

    for (let i = 0; i < this.options.count; i++)
    {
      this.stars.push(new Star(this.ctx, this.options));
    }

    window.addEventListener("resize", () => this.updateCanvasSize());
  }

  updateCanvasSize()
  {
    this.ctx.canvas.width = this.ctx.canvas.parentNode.offsetWidth;
    this.ctx.canvas.height = this.ctx.canvas.parentNode.offsetHeight;
    this.halfHorizontal = this.ctx.canvas.width / 2;
    this.halfVertical = this.ctx.canvas.height / 2;
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  start()
  {
    this.run = true;
    this.draw();
  }

  stop()
  {
    this.run = false;

    for (let i = 0; i < this.stars.length; i++)
    {
      this.stars[i].reset();
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  pause()
  {
    this.run = false;
  }

  draw()
  {
    if (this.run)
    {

      if (this.options.experimental)
      {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.save();
        this.ctx.fillStyle = this.options.background;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore();
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
      }
      else
      {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = this.options.background;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore();
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
      }

      for (let i = 0; i < this.stars.length; i++)
      {
        this.stars[i].draw();
      }

      window.requestAnimationFrame(() => this.draw());
    }
  }

}


