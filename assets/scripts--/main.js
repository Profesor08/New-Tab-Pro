var LIBRARY_PATH = "lib/";

require.config({
  baseUrl: "assets/scripts",
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: LIBRARY_PATH + "jquery/jquery-1.11.2.min",
    "jquery-ui": LIBRARY_PATH + "jquery/jquery-ui.min",
    transform2d: LIBRARY_PATH + "jquery/jquery.transform2d",
    colorpicker: LIBRARY_PATH + "jquery/colorpicker/colorpicker",
    clouds: LIBRARY_PATH + "clouds/clouds",
    cloud: LIBRARY_PATH + "clouds/cloud",
    snow: LIBRARY_PATH + "snow/snow",
    flake: LIBRARY_PATH + "snow/flake",
    newyear: LIBRARY_PATH + "newyear/newyear",
    music: LIBRARY_PATH + "music/music",
    aimp_api: LIBRARY_PATH + "music/aimp_api",
    space: LIBRARY_PATH + "space/space",
    star: LIBRARY_PATH + "space/star",
    site: LIBRARY_PATH + "site/site",
    element: LIBRARY_PATH + "html_element/element",
    button: LIBRARY_PATH + "controls/button",
    ajax: LIBRARY_PATH + "ajax/ajax",
    marquee: LIBRARY_PATH + "marquee/marquee",
    queue: LIBRARY_PATH + "video/queue",
    "progress-bar": LIBRARY_PATH + "video/ProgressBar"
  },
  shim: {
    "jquery-ui": {
      exports: "$",
      deps: ["jquery"]
    },
    transform2d: {
      exports: "$",
      deps: ["jquery-ui"]
    },
    colorpicker: {
      exports: "$",
      deps: ["jquery-ui"]
    }
  }
});


require(["app/VideoBackground"], function(VideoBackground)
{
  VideoBackground();
});

require(["app/Aimp"], function (Aimp)
{
  Aimp();
});

require(["app/Snow"], function (Snow)
{
  Snow();
});

require(["app/Space"], function (Space)
{
  Space();
});

require(["app/Clouds"], function (Clouds)
{
  Clouds();
});

require(["app/NewYear"], function (NewYear)
{
  NewYear();
});

require(["app/Colorpicker"], function (Colorpicker)
{
  Colorpicker();

  // require(["app/Music"], function (Music)
  // {
  //   Music();
  // });

});

require(["app/Garland"], function (Garland)
{
  Garland();
});

require(["app/Weather"], function (Weather)
{
  Weather();
});

require(["app/VoiceSearch"], function (VoiceSearch)
{
  VoiceSearch();
});

require(["app/Sites"], function (Sites)
{
  Sites();
});

require(["app/Resize"], function (Resize)
{
  Resize();
});

require(["app/LoadReady"], function (LoadReady)
{
  LoadReady();
});

require(["app/Currency"], function(Currency)
{
  Currency();
});

