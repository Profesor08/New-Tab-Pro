/**
 * Created by Profesor08 on 14.12.2016.
 */


Vue.component("weather-button", {
  template: '#weather-button',

  data: function ()
  {
    return commonData;
  },

  watch: {
    lang: function (event)
    {
      if (this.weatherData.show)
      {
        this.loadWeatherData();
      }
    }
  },

  methods: {
    showWeather: function (show)
    {
      this.weatherData.active = show;

      if (show)
      {
        this.loadWeatherData();
      }
      else
      {
        this.weatherData.show = false;
      }

      localStorage["showWeather"] = show;
    },

    encodeUrlQuery: function (data)
    {
      return Object.keys(data).map(function (key)
      {
        return [key, data[key]].map(encodeURIComponent).join("=");
      }).join("&");
    },

    loadWeatherData: function ()
    {

      let lang = langData.language;

      this.$http.get('http://api.sypexgeo.net/json/').then((res) =>
      {
        let sypexgeo = res.data;
        let url = "http://api.worldweatheronline.com/free/v2/weather.ashx?" + this.encodeUrlQuery({
            key: "e4ecf6c6f71586644ce2516ae3f58",
            q: sypexgeo.country.capital_en,
            num_of_days: "1",
            format: "json",
            lang: lang
          });

        this.$http.get(url).then((res) =>
        {
          if (sypexgeo.country["name_" + lang])
          {
            this.weatherData.country = sypexgeo.country["name_" + lang];
          }
          else
          {
            this.weatherData.country = sypexgeo.country["name_en"];
          }

          if (sypexgeo.country["capital_" + lang])
          {
            this.weatherData.city = sypexgeo.country["capital_" + lang];
          }
          else
          {
            this.weatherData.city = sypexgeo.country["capital_en"];
          }

          if (res.data.data.current_condition[0].hasOwnProperty("lang_" + lang))
          {
            this.weatherData.condition = res.data.data.current_condition[0]["lang_" + lang][0].value;
          }
          else
          {
            this.weatherData.condition = res.data.data.current_condition[0].weatherDesc[0].value;
          }

          this.weatherData.temperature = res.data.data.current_condition[0].temp_C;
          this.weatherData.show = true;
        }, (res) => console.log(res));
      }, (res) => console.log(res));
    }
  },

  created: function ()
  {
    if ("showWeather" in localStorage)
    {
      this.showWeather(localStorage["showWeather"] == "true");
    }
    else
    {
      this.showWeather(true);
    }

    console.log("Weather button component loaded.");
  }
});

Vue.component("weather", {
  template: "#weather",

  data: function ()
  {
    return commonData;
  },

  created: function ()
  {
    console.log("Weather component loaded.");
  }
});