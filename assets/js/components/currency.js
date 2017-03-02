/**
 * Created by Profesor08 on 14.12.2016.
 */

const currencyData = {
  active: true,
  currencyList: null
};

Vue.component("currency-button", {
  template: "#currency-button",

  data: function ()
  {
    return currencyData;
  },

  methods: {
    showCurrency: function (show)
    {
      this.active = show;
      localStorage["showCurrency"] = show;

      if (show)
      {
        this.loadCurrencyData();
      }
    },

    getData: function (xml)
    {
      let data = [];
      let volutes = ["USD", "EUR", "RUB", "UAH", "RON", "GBP", "CHF"];

      [].forEach.call(xml.documentElement.childNodes, function (volute)
      {
        if (volute.nodeType == Node.ELEMENT_NODE && volutes.indexOf(volute.querySelector("CharCode").innerHTML) != -1)
        {
          data.push(
            {
              numCode: volute.querySelector("NumCode").innerHTML,
              charCode: volute.querySelector("CharCode").innerHTML,
              name: volute.querySelector("Name").innerHTML,
              nominal: parseFloat(volute.querySelector("Nominal").innerHTML).toFixed(2),
              value: parseFloat(volute.querySelector("Value").innerHTML).toFixed(4),
              result: parseFloat(volute.querySelector("Value").innerHTML).toFixed(2)
            }
          );
        }
      });

      return data;
    },

    loadCurrencyData: function ()
    {
      this.$http.get("https://www.bnm.md/ru/official_exchange_rates?get_xml=1&date=" + new Date().toLocaleDateString()).then((res) =>
      {
        this.currencyList = this.getData((new DOMParser()).parseFromString(res.data, "text/xml"));
      }, (res) => console.log(res));
    }
  },

  created: function ()
  {
    if ("showCurrency" in localStorage)
    {
      this.showCurrency(localStorage["showCurrency"] == "true");
    }
    else
    {
      this.showCurrency(true);
    }

    console.log("Currency button component loaded.");
  }
});

Vue.component("currency", {
  template: "#currency",
  data: function ()
  {
    return currencyData;
  },

  methods: {
    nominalChange: function (currency)
    {
      currency.result = (currency.nominal * currency.value).toFixed(2);
    },

    resultChange: function (currency)
    {
      currency.nominal = (currency.result / currency.value).toFixed(2);
    },

    selectText: function (event)
    {
      event.target.select();
    }
  },

  created: function ()
  {
    console.log("Currency component loaded.");
  }
});