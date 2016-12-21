class Snowfall
{

  constructor(canvas_id, options)
  {
    this.options = {
      count: 100,
      images: ["flake1.png", "flake2.png"],
      size: {
        min: 10,
        max: 30
      },
      halfHorizontal: 0,
      halfVertical: 0
    };

    if (options !== null)
    {
      for (var prop in this.options)
      {
        if (this.options.hasOwnProperty(prop) && options.hasOwnProperty(prop))
        {
          this.options[prop] = options[prop];
        }
      }
    }

    this.ctx = document.querySelector(canvas_id).getContext("2d");
    this.stopped = true;
    this.paused = false;
    this.images = [];
    this.flakes = [];

    this.options.images.forEach((src) =>
    {
      this.images.push(new (function() {
        this.loaded = false;
        this.image = new Image();
        this.image.addEventListener("load", () => this.loaded = true);
        this.image.src = src;
      }));
    });

    this.updateCanvasSize();
    window.addEventListener("resize", () => this.updateCanvasSize());
  }

  updateCanvasSize()
  {
    this.ctx.canvas.width = this.ctx.canvas.parentNode.offsetWidth;
    this.ctx.canvas.height = this.ctx.canvas.parentNode.offsetHeight;
    this.options.halfHorizontal = this.ctx.canvas.width / 2;
    this.options.halfVertical = this.ctx.canvas.height / 2;
  }

  rand(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw()
  {
    if (!this.stopped && !this.paused)
    {

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      for (let i = 0; i < this.flakes.length; i++)
      {
        this.flakes[i].draw();
      }

      window.requestAnimationFrame(() => this.draw());
    }
  }

  start()
  {
    if (this.stopped)
    {
      this.stopped = false;

      for (let i = 0; i < this.options.count; i++)
      {
        this.flakes.push(new Flake(this.ctx, this.options, this.images[this.rand(0, this.images.length - 1)]));
      }

      this.draw();
    }
    else if (this.paused)
    {
      this.paused = false;
      this.draw();
    }
  }

  stop()
  {
    this.flakes = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.stopped = true;
    this.paused = false;
  }

  pause()
  {
    this.paused = true;
  }

}