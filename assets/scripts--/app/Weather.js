/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["element", "button", "ajax"], function (Element, Control, Ajax)
{

  return function ()
  {
    var weather = null, city, div, descr, FeelsLikeC;
    var button = new Control("Weather", "weather_show");

    button.checkedAction(function ()
    {

        Ajax({
          url: "http://api.sypexgeo.net/json/",
          format: "json",
          success: function (sypexgeo)
          {

            var lang = window.navigator.userLanguage || window.navigator.language;

            Ajax({
              url: "http://api.worldweatheronline.com/free/v2/weather.ashx?",
              data: {
                key: "e4ecf6c6f71586644ce2516ae3f58",
                q: sypexgeo.country.capital_en,
                num_of_days: "1",
                format: "json",
                lang: "ru"
              },
              format: "json",
              success: function (wwo)
              {

                weather = new Element("div").setId("weather");
                city = new Element("div").addClass("city");
                div = new Element("div");
                descr = new Element("span").addClass("descr");
                FeelsLikeC = new Element("span").addClass("FeelsLikeC");

                document.querySelector("body").appendChild(weather.get());
                city.setText(sypexgeo.country["name_" + lang] + ", " + sypexgeo.country["capital_" + lang]);
                descr.setText(wwo.data.current_condition[0].lang_ru[0].value);
                FeelsLikeC.setText(wwo.data.current_condition[0].temp_C);
                weather.appendChild(city).appendChild(div.appendChild(descr).appendChild(FeelsLikeC).appendText("&deg;C"));
                weather.addClass("active");
              }
            });

          }
        });

    });

    button.uncheckedAction(function ()
    {
      if (weather != null)
      {
        weather.selfDelete();
      }
    });

    button.checkState();
  }

});