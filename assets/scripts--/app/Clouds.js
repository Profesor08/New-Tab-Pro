/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["clouds", "element", "button"], function (Clouds, Element, Control)
{

  return function()
  {
    var body = document.querySelector("body");
    var world = new Element("div").setId("world");
    var viewport = new Element("div").setId("viewport").appendChild(world);
    var button = new Control("Clouds", "clouds_show");

    var obj = null;

    body.appendChild(viewport.get());

    button.checkedAction(function()
    {
      obj = new Clouds(world.get(), 10);
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