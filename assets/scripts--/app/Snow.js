/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["snow", "element", "button"], function (Snow, Element, Control)
{

  return function()
  {
    var body = document.querySelector("body");
    var div = new Element("div").setId("snow");
    var button = new Control("Snow", "snow_show");
    body.appendChild(div.get());

    var obj = null;

    button.checkedAction(function()
    {
      if (obj == null)
      {
        obj = new Snow(div.get(), 100, "assets/scripts/lib/snow");
      }
      obj.start();
    });

    button.uncheckedAction(function()
    {
      if (obj != null)
      {
        obj.stop();
      }
    });

    button.checkState();
  }

});