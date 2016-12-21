class Cloud
{

  constructor(ctx, options)
  {
    this.ctx = ctx;

    this.options = options;

    window.cloudOptions = this.options;

    this.image = null;
    this.loaded = false;

    if (!this.image)
    {
      this.image = new Image();
      this.image.src = this.options.images[this.rand(0, this.options.images.length - 1)];
      this.image.addEventListener("load", () =>
      {
        this.loaded = true;
      });
    }

    this.size = this.rand(200, 800);
    this.rotate = 0;
    this.rotateDiretion = this.rand(0, 1) ? -1 : 1;
    this.rotate_speed = Math.random() * (2 - 1) / 10;
    this.translateLeft = this.rand(-400, 400);
    this.translateTop = this.rand(-200, 200);
  }

  rand (min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw()
  {
    if (this.loaded)
    {
      this.rotate += this.rotateDiretion * this.rotate_speed;

      if (this.rotate < 0)
      {
        this.rotate = 360;
      }
      else if (this.rotate > 360)
      {
        this.rotate = 0;
      }

      this.ctx.save();
      this.ctx.translate(this.options.halfHorizontal - this.size / 2, this.options.halfVertical - this.size / 2);
      this.ctx.translate(this.translateLeft + this.size / 2, this.translateTop + this.size / 2);
      this.ctx.rotate(this.rotate * Math.PI / 180);
      this.ctx.globalAlpha = 0.6;
      this.ctx.drawImage(this.image, -(this.size / 2), -(this.size / 2), this.size, this.size);
      this.ctx.restore();
    }
  }

}