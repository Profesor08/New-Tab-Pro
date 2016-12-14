/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["space", "element", "button"], function (Space, Element, Control)
{

  return function()
  {
    var container = new Element("div").setId("space");
    var button = new Control("Space", "space_show");

    document.querySelector("body").appendChild(container.get());

    var obj = null;

    button.checkedAction(function()
    {
      if (obj == null)
      {
        obj = new Space(container.get(), 100);
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