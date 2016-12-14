/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["colorpicker", "element"], function ($, Element)
{

  return function ()
  {
    var bg_div = new Element("div").setId("color_picker_body_background");
    var border_div = new Element("div").setId("color_picker_site_border");
    var background_div = new Element("div").setId("color_picker_site_background");
    var bg = $(bg_div.get());
    var border = $(border_div.get());
    var background = $(background_div.get());

    document.querySelector(".controls .advancedA").appendChild(bg_div.get());
    document.querySelector(".controls .advancedA").appendChild(border_div.get());
    document.querySelector(".controls .advancedA").appendChild(background_div.get());

    function hexToRgb(hex)
    {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b)
      {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    bg.ColorPicker({
      flat: false,
      onChange: function (hsb, hex)
      {
        $("#color_picker_body_background").css("backgroundColor", "#" + hex);
        $("body").css("backgroundColor", "#" + hex);
        localStorage["color_picker_body_background"] = "#" + hex;
      }
    });

    border.ColorPicker({
      flat: false,
      onChange: function (hsb, hex, rgb)
      {
        $("#color_picker_site_border").css("backgroundColor", "#" + hex);
        $(".site").css("border-color", "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.4)");
        localStorage["color_picker_site_border"] = "#" + hex;
      }
    });

    background.ColorPicker({
      flat: false,
      onChange: function (hsb, hex, rgb)
      {
        $("#color_picker_site_background").css("backgroundColor", "#" + hex);
        $(".site").css("backgroundColor", "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.4)");
        localStorage["color_picker_site_background"] = "#" + hex;
      }
    });


    if ("color_picker_body_background" in localStorage)
    {
      bg.ColorPickerSetColor(localStorage["color_picker_body_background"]);

      bg.css("backgroundColor", localStorage["color_picker_body_background"]);

      $("body").css("backgroundColor", localStorage["color_picker_body_background"]);
    }

    if ("color_picker_site_border" in localStorage)
    {
      var rgb = hexToRgb(localStorage["color_picker_site_border"]);
      border.ColorPickerSetColor(localStorage["color_picker_site_border"]);

      border.css("backgroundColor", localStorage["color_picker_site_border"]);

      $(".site").css("border-color", "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.4)");
    }

    if ("color_picker_site_background" in localStorage)
    {
      rgb = hexToRgb(localStorage["color_picker_site_background"]);
      border.ColorPickerSetColor(localStorage["color_picker_site_background"]);

      border.css("backgroundColor", localStorage["color_picker_site_background"]);

      $(".site").css("backgroundColor", "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.4)");
    }
  }

});