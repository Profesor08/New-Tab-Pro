define(["star"], function (Star)
{
  return function Space(container, starsCount)
  {

    this.stars = [];
    this.animation = null;

    this.container = typeof container == "object" ? container : document.querySelector(container);

    while (starsCount--)
    {
      this.stars.push(new Star(this.container));
    }

    var self = this;

    this.animate = function ()
    {
      for (var i = 0; i < self.stars.length; i++)
      {
        self.stars[i].animate();
      }
      self.animation = requestAnimationFrame(self.animate);
    };

    this.stop = function ()
    {
      cancelAnimationFrame(self.animation);
      for (var i = 0; i < this.stars.length; i++)
      {
        this.stars[i].hide();
      }
    };

    this.start = function ()
    {
      for (var i = 0; i < this.stars.length; i++)
      {
        this.stars[i].show();
      }
      requestAnimationFrame(self.animate);
    };

  }
});