/**
 * Created by Profesor08 on 21.12.2016.
 */
class Flake
{

  constructor(ctx, options, image)
  {
    this.ctx = ctx;
    this.options = options;
    this.image = image;

    this.init();
    this.y = this.rand(-this.size, this.ctx.canvas.height);
  }

  init()
  {
    this.size = this.rand(this.options.size.min, this.options.size.max);
    this.x = this.rand(this.size, this.ctx.canvas.width);
    this.y = -this.size;
    this.y_step = this.rand_float(1, 5);
    this.x_step = 0;
    this.x_step_size = this.rand(1, 10) / 100;
    this.direction = this.rand_float(-1.5, 1.5);
    this.rotate = 0;
    this.rotateDiretion = this.rand(0, 1) ? -1 : 1;
    this.rotate_speed = 1 + Math.random() * (2 - 1);
    this.flip = 1;

    if (this.rand(1, 100) <= 50)
    {
      this.flip_speed = -this.rand_float(0.01, 0.05);
    }
    else
    {
      this.flip_speed = 0;
    }
  }

  rand(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rand_float(min, max)
  {
    return (Math.random() * (min - max) + max);
  }

  draw()
  {
    if (this.image.loaded)
    {
      this.y += this.y_step;
      this.x_step += this.x_step_size;
      this.x += Math.cos(this.x_step);
      this.x += this.direction;

      this.rotate += this.rotateDiretion * this.rotate_speed;

      if (this.rotate < 0)
      {
        this.rotate = 360;
      }
      else if (this.rotate > 360)
      {
        this.rotate = 0;
      }

      this.flip += this.flip_speed;

      if (this.flip <= 0 || this.flip >= 1)
      {
        this.flip_speed *= -1;
      }

      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.translate(this.size / 2, this.size / 2);
      this.ctx.rotate(this.rotate * Math.PI / 180);
      this.ctx.scale(this.flip, 1);
      this.ctx.drawImage(this.image.image, -(this.size / 2), -(this.size / 2), this.size, this.size);
      this.ctx.restore();


      if (this.y >= this.ctx.canvas.height + this.size)
      {
        this.init();
      }
    }
  }

}