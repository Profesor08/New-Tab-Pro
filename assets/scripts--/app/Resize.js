/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["element", "button", "jquery-ui"], function (Element, Controls)
{

  return function()
  {
    var controls = new Element(document.querySelector(".controls"));
    var size = 175;
    var columns = 5;

    if ("resize_site_size" in localStorage)
    {
      size = parseInt(localStorage["resize_site_size"]);
    }

    if ("resize_site_columns" in localStorage)
    {
      columns = parseInt(localStorage["resize_site_columns"]);
    }

    var resize = new Element("div").setId("resize").addClass("slider");
    var resize_value = new Element("div").addClass("slider_value").setText(size);
    var resize_column = new Element("div").setId("resize_column").addClass("slider");
    var resize_column_value = new Element("div").addClass("slider_value").setText(columns);
    var resize_sites = function()
    {
      var content_width = (size + 14) * columns;
      if (content_width > 1500)
      {
        content_width = 1500;
      }
      $("#content").css({width: content_width});
      $(".site").css({
        width: size,
        height: size / 1.5
      });

      localStorage["resize_site_size"] = size;
      localStorage["resize_site_columns"] = columns;

    };

    controls.prependChild(resize_column.appendChild(resize_column_value));
    controls.prependChild(resize.appendChild(resize_value));

    resize_sites();

    $(resize.get()).slider({
      range: "min",
      min: 80,
      max: 200,
      value: size,
      slide: function (event, ui)
      {
        resize_value.setText(ui.value);
        size = ui.value;
        resize_sites();
      }
    });

    $(resize_column.get()).slider({
      range: "min",
      min: 2,
      max: 10,
      value: columns,
      slide: function (event, ui)
      {
        resize_column_value.setText(ui.value);
        columns = ui.value;
        resize_sites();
      }
    });
  }

});