class Clouds {

  constructor(canvas_id, options)
  {
    this.options = {
      count: 10,
      images: [
        "cloud.png",
        "dark_cloud.png",
        "explosion.png",
        "explosion2.png",
        "smoke.png"
      ],
      halfHorizontal: 0,
      halfVertical: 0
    };

    window.cloudsOptions = this.options;

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
    this.clouds = [];

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

  start()
  {
    if (this.stopped)
    {
      this.stopped = false;

      for (let i = 0; i < this.options.count; i++)
      {
        this.clouds.push(new Cloud(this.ctx, this.options));
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
    this.clouds = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.stopped = true;
    this.paused = false;
  }

  pause()
  {
    this.paused = true;
  }

  draw()
  {
    if (!this.stopped && !this.paused)
    {

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      for (let i = 0; i < this.clouds.length; i++)
      {
        this.clouds[i].draw();
      }

      window.requestAnimationFrame(() => this.draw());
    }
  }

}
