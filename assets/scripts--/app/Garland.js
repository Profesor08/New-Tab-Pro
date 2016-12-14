/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["element", "button"], function (Element, Control)
{

  return function()
  {
    var container = new Element("div").addClass("light_balls");
    var width = 40;
    var totalCount = 0;
    var colors = {
      colors: ["Crimson", "LawnGreen", "Blue", "Gold", "Cyan", "DeepPink", "DarkViolet"],
      current: -1,
      next: function ()
      {
        if (this.current + 1 < this.colors.length)
        {
          return this.colors[++this.current];
        }
        else
        {
          this.current = 0;
          return this.colors[0];
        }
      }
    };

    var button = new Control("Garland", "garland_show");

    button.checkedAction(function ()
    {
      if (totalCount == 0)
      {
        for (var i = 0; i < window.innerWidth / width + 1; i++)
        {
          totalCount++;
          container.appendChild(new Element("div").addClass("ball").addClass(colors.next()));
        }

        document.querySelector("body").appendChild(container.get());

        window.addEventListener("resize", function ()
        {
          var max = parseInt(window.innerWidth / width) + 1;
          if (max > totalCount)
          {
            var add = max - totalCount;
            for (var i = 0; i < add; i++)
            {
              totalCount++;
              container.appendChild(new Element("div").addClass("ball").addClass(colors.next()));
            }
          }
        });

      }
      container.css("display", "block");
    });

    button.uncheckedAction(function ()
    {
      container.css("display", "none");
    });

    button.checkState();
  }

});