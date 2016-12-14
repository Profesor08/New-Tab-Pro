/**
 * Created by Profesor08 on 14.12.2016.
 */


var weatherData = {
  active: true,
  show: false,
  city: null,
  country: null,
  condition: null,
  temperature: null
};

Vue.component("weather-button", {
  template: '#weather-button',

  data: function ()
  {
    return weatherData;
  },

  methods: {
    showWeather: function (show)
    {
      this.active = show;

      if (show)
      {
        this.loadWeatherData();
      }
      else
      {
        this.show = false;
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

      this.$http.get('http://api.sypexgeo.net/json/').then((res) =>
      {
        let sypexgeo = res.data;
        let url = "http://api.worldweatheronline.com/free/v2/weather.ashx?" + this.encodeUrlQuery({
            key: "e4ecf6c6f71586644ce2516ae3f58",
            q: sypexgeo.country.capital_en,
            num_of_days: "1",
            format: "json",
            lang: "ru"
          });

        this.$http.get(url).then((res) =>
        {
          let lang = window.navigator.userLanguage || window.navigator.language;
          this.country = sypexgeo.country["name_" + lang];
          this.city = sypexgeo.country["capital_" + lang];
          this.condition = res.data.data.current_condition[0].lang_ru[0].value;
          this.temperature = res.data.data.current_condition[0].temp_C;
          this.show = true;
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
      this.showCurrency(true);
    }

    console.log("Weather button component loaded.");
  }
});

Vue.component("weather", {
  template: "#weather",

  data: function ()
  {
    return weatherData;
  },

  created: function ()
  {
    console.log("Weather component loaded.");
  }
});