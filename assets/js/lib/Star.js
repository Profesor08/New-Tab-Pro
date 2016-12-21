/**
 * Created by Profesor08 on 21.12.2016.
 */
class Star {

  constructor(ctx, options)
  {
    this.ctx = ctx;

    this.options = {
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
      for (var prop in this.options)
      {
        if (this.options.hasOwnProperty(prop) && options.hasOwnProperty(prop))
        {
          this.options[prop] = options[prop];
        }
      }
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
  }

  getColor()
  {
    return this.options.colors[this.rand(0, this.options.colors.length - 1)];
  }

  draw()
  {

    this.z -= this.options.speed;

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
  };

}