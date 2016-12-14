define(["flake"], function (Flake)
{
  return function Snow(container, count, image)
  {

    var flake = [];
    var animation = null;
    container = typeof container == "object" ? container : document.querySelector(container);

    var fps = 0; //frames per second
    var lastExecution = new Date().getTime();

    for (var i = 0; i < count; i++)
    {
      flake.push(new Flake(container, image));
    }

    var animate = function ()
    {

      if (fps)
      {
        var now = new Date().getTime();

        if ((now - lastExecution) > (1000 / fps))
        {

          for (var i = 0; i < flake.length; i++)
          {
            flake[i].animate();
          }

          lastExecution = new Date().getTime();
        }
      }
      else
      {
        for (var j = 0; j < flake.length; j++)
        {
          flake[j].animate();
        }
      }


      animation = requestAnimationFrame(animate);
    };

    this.stop = function ()
    {
      cancelAnimationFrame(animation);
      for (var i = 0; i < flake.length; i++)
      {
        flake[i].hide();
      }
    };

    this.start = function ()
    {
      for (var i = 0; i < flake.length; i++)
      {
        flake[i].show();
      }
      animation = requestAnimationFrame(animate);
    };


  }
});

