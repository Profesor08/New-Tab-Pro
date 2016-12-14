/**
 * Created by Profesor08 on 15.01.2016.
 */
define(["element"], function(Element)
{
  return function()
  {
    var container = new Element("div").addClass("progress_bar");
    var bar = new Element("div").addClass("bar");
    document.querySelector("body").appendChild(container.appendChild(bar).get());

    this.update = function(time, max)
    {
      bar.css("width", time / (max / 100) + "%");
    }


  }
});