/**
 * Created by Profesor08 on 21.12.2016.
 */
class Star {

  constructor(ctx, options)
  {
    this.ctx = ctx;

    this.options = {
      experimental: false,
      speed: 1,
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

    if (this.options.experimental)
    {
      this.queue = [];
      this.opacity = [0.1, 0.2, 0.3, 0.5, 1];
    }

    this.reset();
  }

  rand(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  reset()
  {
    this.halfHorizontal = this.ctx.canvas.width / 2;
    this.halfVertical = this.ctx.canvas.height / 2;
    this.x = this.rand(-this.ctx.canvas.width * this.options.horizontalScale, this.ctx.canvas.width * this.options.horizontalScale);
    this.y = this.rand(-this.ctx.canvas.height * this.options.verticalScale, this.ctx.canvas.height * this.options.verticalScale);
    this.z = this.rand(1, this.options.distance);
    this.color = this.getColor();
    this.ctx.strokeStyle = this.color;

    if (this.options.experimental)
    {
      this.queue = [];

      for (let i = 0; i < 5; i++)
      {
        this.z -= this.options.speed;

        this.queue.push({
          x: this.x / this.z,
          y: this.y / this.z,
          x2: this.x / (this.z + this.options.speed * 0.50),
          y2: this.y / (this.z + this.options.speed * 0.50)
        });
      }
    }
  }

  getColor()
  {
    return this.options.colors[this.rand(0, this.options.colors.length - 1)];
  }

  draw()
  {

    this.z -= this.options.speed;

    if (this.options.experimental)
    {
      this.queue.shift();

      this.queue.push({
        x: this.x / this.z,
        y: this.y / this.z,
        x2: this.x / (this.z + this.options.speed * 0.50),
        y2: this.y / (this.z + this.options.speed * 0.50)
      });

      this.queue.forEach((e, i) =>
      {
        this.ctx.globalAlpha = this.opacity[i];
        this.ctx.beginPath();
        this.ctx.moveTo(e.x, e.y);
        this.ctx.lineTo(e.x2, e.y2);
        this.ctx.stroke();
      });

      if (this.queue[0].x < -this.halfHorizontal || this.queue[0].x > this.halfHorizontal || this.queue[0].y < -this.halfVertical || this.queue[0].y > this.halfVertical)
      {
        this.reset();
      }
    }
    else
    {

      let x = this.x / this.z;
      let y = this.y / this.z;
      let x2 = this.x / (this.z + this.options.speed * 0.50);
      let y2 = this.y / (this.z + this.options.speed * 0.50);

      this.ctx.strokeStyle = this.color;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();

      if (x < -this.halfHorizontal || x > this.halfHorizontal || y < -this.halfVertical || y > this.halfVertical)
      {
        this.reset();
      }
    }
  };

}