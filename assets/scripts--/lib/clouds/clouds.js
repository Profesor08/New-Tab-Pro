// by Profesor08

define(["cloud"], function (Cloud)
{
  return function (container, count)
  {
    container = typeof container == "object" ? container : document.querySelector(container);

    var cloud = [];

    for (var i = 0; i < count; i++)
    {
      cloud.push(new Cloud(container));
      cloud[i].generate();
      cloud[i].display();
      cloud[i].animate();
    }

    this.stop = function ()
    {
      for (var i = 0; i < count; i++)
      {
        cloud[i].stop();
        cloud[i].hide();
      }
    };

    this.start = function ()
    {
      for (var i = 0; i < count; i++)
      {
        cloud[i].start();
        cloud[i].show();
      }
    }

  }
});
