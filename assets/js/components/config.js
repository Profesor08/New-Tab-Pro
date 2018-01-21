class ConfigDefault
{
  constructor()
  {
    this.data = {
      "currencyBaseVolute": "MDL",
      "currencyVolutes": [
        "USD",
        "EUR",
        "RUB",
        "UAH",
        "RON",
        "GBP"
      ],
      "lang": "ru",
      "pageBackgroundColor": "rgb(3, 3, 26)",
      "pageBackgroundColorTransparent": "rgba(3, 3, 26, 0.2)",
      "showClouds": false,
      "showCurrency": true,
      "showMicrophone": true,
      "showSites": true,
      "showSnow": false,
      "showSpace": true,
      "showWeather": true,
      "siteBackgroundColor": "rgba(11, 16, 45, 0.4)",
      "siteBorderColor": "rgba(119, 14, 168, 0.37)",
      "siteSize": 190,
      "webSites": [
        {
          "name": "Google",
          "url": "https://www.google.ru",
          "image": "assets/images/sites/google.png"
        },
        {
          "name": "Torrentsmd",
          "url": "https://torrentsmd.com/",
          "image": "assets/images/sites/torrentsmd.png"
        },
        {
          "name": "Youtube",
          "url": "https://youtube.com/",
          "image": "assets/images/sites/youtube.png"
        },
        {
          "name": "X-MU Forum",
          "url": "http://forum.x-mu.net/",
          "image": "assets/images/sites/forum.x-mu.png"
        },
        {
          "name": "Facebook",
          "url": "https://facebook.com/",
          "image": "assets/images/sites/facebook.png"
        },
        {
          "name": "Moldindconbank",
          "url": "https://wb.micb.md/",
          "image": "assets/images/sites/moldindconbank.png"
        },
        {
          "name": "Habrahabr",
          "url": "http://habrahabr.ru/",
          "image": "assets/images/sites/habrahabr.png"
        },
        {
          "name": "Geektimes",
          "url": "http://geektimes.ru/",
          "image": "assets/images/sites/geektimes.png"
        },
        {
          "name": "Vkontakte",
          "url": "http://vk.com",
          "image": "assets/images/sites/vk.com.png"
        },
        {
          "name": "Lostfilm",
          "url": "http://lostfilm.tv/",
          "image": "assets/images/sites/lostfilm.png"
        },
        {
          "name": "The Pirate Bay",
          "url": "http://thepiratebay.se/",
          "image": "assets/images/sites/thepiratebay.png"
        },
        {
          "name": "Ebay",
          "url": "http://ebay.com/",
          "image": "assets/images/sites/ebay.png"
        },
        {
          "name": "GearBest",
          "url": "http://www.gearbest.com/",
          "image": "assets/images/sites/gearbest.png"
        },
        {
          "name": "Paypal",
          "url": "http://paypal.com/",
          "image": "assets/images/sites/paypal.png"
        },
        {
          "name": "SoundCloud",
          "url": "https://soundcloud.com/",
          "image": "assets/images/sites/Soundcloud-Icon.png"
        },
        {
          "name": "Coub",
          "url": "http://coub.com/",
          "image": "assets/images/sites/coub.png"
        },
        {
          "name": "Coriolis EDCD",
          "url": "https://coriolis.edcd.io",
          "image": "https://coriolis.io/192x192.png"
        },
        {
          "name": "Elite Dangerous Database",
          "url": "https://eddb.io/",
          "image": "https://eddb.io/android-chrome-192x192.png"
        },
        {
          "name": "League of Legends",
          "url": "http://ru.leagueoflegends.com/",
          "image": "http://i.imgur.com/3DeXQQW.png"
        },
        {
          "name": "GitHub",
          "url": "https://github.com/",
          "image": "assets/images/sites/github.png"
        },
        {
          "name": "JSFiddle",
          "url": "https://jsfiddle.net/",
          "image": "https://jsfiddle.net/img/logo.png"
        },
        {
          "name": "ED Neutron Router",
          "url": "https://www.spansh.co.uk/",
          "image": "https://image.prntscr.com/image/ACbc5Q-5TJySVODfNkjEkw.png"
        },
        {
          "name": "Elite:Dangerous Board",
          "url": "https://ed-board.net/ru/",
          "image": "https://ed-board.net/css/edboard-logo-320.png"
        },
        {
          "name": "Epidemic Sound",
          "url": "https://player.epidemicsound.com/#/browse/?&genres=Electronica%20%26%20Dance.Electro&active=genres&activeFilter=energy",
          "image": "https://e-webdev.ru/assets/images/sites/epidemicsound.com.png"
        },
        {
          "name": "Deezer",
          "url": "http://www.deezer.com",
          "image": "http://e-cdn-files.deezer.com/cache/images/common/logos/deezer.c0869f01203aa5800fe970cf4d7b4fa4.png"
        }
      ]
    };
  }

  load()
  {
    for (let key in this.data)
    {
      if (this.data.hasOwnProperty(key))
      {
        if (localStorage.getItem(key) === null)
        {
          if (typeof this.data[key] === "string")
          {
            localStorage.setItem(key, this.data[key]);
          }
          else
          {
            localStorage.setItem(key, JSON.stringify(this.data[key]));
          }
        }
      }
    }
  }
}

let config = new ConfigDefault();

config.load();