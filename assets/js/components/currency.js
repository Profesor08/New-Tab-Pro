/**
 * Created by Profesor08 on 14.12.2016.
 */

Vue.component("currency-button", {
  template: "#currency-button",

  data: function () {
    return commonData;
  },

  watch: {
    "currencyData.volutes": function () {
      if (this.currencyData.active)
      {
        this.loadCurrencyData();
      }

      localStorage["currencyVolutes"] = JSON.stringify(this.currencyData.volutes);
    },


    "currencyData.baseVolute": function () {
      if (this.currencyData.active)
      {
        this.loadCurrencyData();
      }

      localStorage["currencyBaseVolute"] = this.currencyData.baseVolute;
    }
  },

  methods: {

    showCurrency: function (show) {
      this.currencyData.active = show;
      localStorage["showCurrency"] = show;
    },

    loadCurrencyData: function () {
      /*
      let url = "https://query.yahooapis.com/v1/public/yql?q=";
      let urlParams = "&format=json&env=store://datatables.org/alltableswithkeys";

      this.$http.get(url + this.buildQuery(this.currencyData.volutes, this.currencyData.baseVolute) + urlParams).then((res) =>
      {
        if (res.data.query.results.rate.length)
        {
          this.currencyData.currencyList = [];

          res.data.query.results.rate.forEach((rate) =>
          {
            this.currencyData.currencyList.push({
              name: rate.Name.split("/")[0],
              nominal: parseFloat(1).toFixed(2),
              result: parseFloat(rate.Rate).toFixed(2),
              value: parseFloat(rate.Rate).toFixed(4),
            });
          });
        }
      });
      */

      let url = "http://www.apilayer.net/api/live?access_key=2d33699c560793a723e61cd5f53a1351&format=1";
      url += "&currencies=" + this.currencyData.baseVolute + "," + this.currencyData.volutes.join(",");

      let parseResponse = response => {
        if (response.success === true)
        {
          let currencies = response.quotes;
          let source = response.source;
          let base = this.currencyData.baseVolute;
          let main = currencies[source + base];
          this.currencyData.currencyList = [];
          this.currencyData.volutes.forEach(volute => {
            this.currencyData.currencyList.push({
              name: volute,
              nominal: parseFloat(1).toFixed(2),
              result: parseFloat(main / currencies[source + volute]).toFixed(2),
              value: parseFloat(main / currencies[source + volute]).toFixed(4)
            });
          });
        }
      };

      if (this.cacheExpired())
      {
        this.$http.get(url).then(response => {
          parseResponse(response.data);
          this.saveCache(response.data);
        });
      }
      else
      {
        parseResponse(this.loadCahce());
      }
    },

    saveCache: function (data) {
      localStorage.setItem("currencyCache", JSON.stringify(data));
      localStorage.setItem("currencyCacheTime", Date.now());
    },

    loadCahce: function () {
      return JSON.parse(localStorage.getItem("currencyCache"));
    },

    cacheExpired: function () {
      let cacheTime = localStorage.getItem("currencyCacheTime");

      if (cacheTime === null)
      {
        return true;
      }

      return Date.now() - parseInt(cacheTime) > 3600000;
    },

    buildQuery: function (volutes, base) {
      let pairs = volutes.map((v) => v + base);

      return "select * from yahoo.finance.xchange where pair in (\"" + pairs.join("\",\"") + "\")";
    }
  },

  created: function () {

    if ("currencyBaseVolute" in localStorage)
    {
      this.currencyData.baseVolute = localStorage["currencyBaseVolute"];
    }

    if ("currencyVolutes" in localStorage)
    {
      this.currencyData.volutes = JSON.parse(localStorage["currencyVolutes"]);
    }

    if ("showCurrency" in localStorage)
    {
      this.showCurrency(localStorage["showCurrency"] === "true");

      if (this.currencyData.active)
      {
        this.loadCurrencyData();
      }
    }
    else
    {
      this.showCurrency(true);
      this.loadCurrencyData();
    }

    console.log("Currency button component loaded.");
  }
});

Vue.component("currency", {
  template: "#currency",
  data: function () {
    return commonData;
  },

  methods: {
    nominalChange: function (currency) {
      currency.result = (currency.nominal * currency.value).toFixed(2);
    },

    resultChange: function (currency) {
      currency.nominal = (currency.result / currency.value).toFixed(2);
    },

    selectText: function (event) {
      event.target.select();
    },

    setFocus: function (event) {
      event.target.select();
    }
  },

  created: function () {
    console.log("Currency component loaded.");
  }
});

Vue.component("currency-options", {
  template: "#currency-options",

  data: function () {
    return commonData;
  },

  methods: {
    addVolute: function () {
      if (this.currencyData.addVolute.length && this.currencyData.volutes.indexOf(this.currencyData.addVolute) <= -1)
      {
        this.currencyData.volutes.push(this.currencyData.addVolute);
      }
    },

    deleteVolute: function (volute) {
      if (this.currencyData.volutes.length > 1)
      {
        let id = this.currencyData.volutes.indexOf(volute);

        if (id >= 0)
        {
          this.currencyData.volutes.splice(id, 1);
        }
      }
    }
  },

  created: function () {
    console.log("Currency options dialog component loaded.");
  }
});