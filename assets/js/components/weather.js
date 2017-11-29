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
        // let url = "http://api.worldweatheronline.com/free/v2/weather.ashx?" + this.encodeUrlQuery({
        //     key: "6564657a438b48a2a1e104000170907",
        //     q: sypexgeo.country.capital_en,
        //     num_of_days: "1",
        //     format: "json",
        //     lang: lang
        //   });

        let url = "http://api.openweathermap.org/data/2.5/weather?"
          + this.encodeUrlQuery({
            id: sypexgeo.country.capital_id,
            appid: "6a3811c0c201a60032a60c243e832cf1",
            units: "Metric"
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

          this.weatherData.condition = res.data.weather[0].main;
          this.weatherData.temperature = res.data.main.temp;

          // if (res.data.data.current_condition[0].hasOwnProperty("lang_" + lang))
          // {
          //   this.weatherData.condition = res.data.data.current_condition[0]["lang_" + lang][0].value;
          // }
          // else
          // {
          //   this.weatherData.condition = res.data.data.current_condition[0].weatherDesc[0].value;
          // }
          //
          // this.weatherData.temperature = res.data.data.current_condition[0].temp_C;
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