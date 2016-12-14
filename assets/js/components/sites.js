/**
 * Created by Profesor08 on 14.12.2016.
 */

var sitesData = {
  active: true,
  sites: [
    {class: "google", name: "Google", url: "https://www.google.ru"},
    {class: "torrents", name: "Torrentsmd", url: "https://torrentsmd.com/"},
    {class: "youtube", name: "Youtube", url: "https://youtube.com/"},
    {class: "xmu", name: "X-MU Forum", url: "http://forum.x-mu.net/"},
    {class: "facebook", name: "Facebook", url: "https://facebook.com/"},
    {class: "micb", name: "Moldindconbank", url: "https://wb.micb.md/"},
    {class: "habr", name: "Habrahabr", url: "http://habrahabr.ru/"},
    {class: "geek", name: "Geektimes", url: "http://geektimes.ru/"},
    {class: "vk", name: "Vkontakte", url: "http://vk.com"},
    {class: "lostfilm", name: "Lostfilm", url: "http://lostfilm.tv/"},
    {class: "thepiratebay", name: "The Pirate Bay", url: "http://thepiratebay.se/"},
    {class: "ebay", name: "Ebay", url: "http://ebay.com/"},
    {class: "gearbest", name: "GearBest", url: "http://www.gearbest.com/"},
    {class: "paypal", name: "Paypal", url: "http://paypal.com/"},
    {class: "coub", name: "Coub", url: "http://coub.com/"}
  ]
};

Vue.component("sites", {
  template: "#sites",

  data: function ()
  {
    return sitesData;
  },

  created: function ()
  {
    console.log("Sites component loaded.");
  }
});

Vue.component("sites-button", {
  template: "#sites-button",

  data: function ()
  {
    return sitesData;
  },

  methods: {
    showSites: function (show)
    {
      this.active = show;
      localStorage["showSites"] = show;
    }
  },

  created: function ()
  {
    if ("showSites" in localStorage)
    {
      this.showSites(localStorage["showSites"] == "true");
    }

    console.log("Sites button component loaded.");
  }
});