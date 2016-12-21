/**
 * Created by Profesor08 on 14.12.2016.
 */

var sitesData = {
  active: true,
  size: 175,
  contentWidth: 1000,
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

    // window.addEventListener("resize", () =>
    // {
    //   if (window.innerWidth < 1520)
    //   {
    //     let count = Math.floor((window.innerWidth - 300) / this.size) - 2;
    //     let width = count * 10 + count * this.size + this.size / 2;
    //
    //     if (width < this.size + 10)
    //     {
    //       width = this.size + 10;
    //     }
    //
    //     this.contentWidth = width;
    //   }
    //   else
    //   {
    //     this.contentWidth = window.innerWidth;
    //   }
    // });

    console.log("Sites component loaded.");
  }
});

Vue.component("site-resize", {
  template: "#site-resize",

  data: function ()
  {
    return sitesData;
  },

  methods: {

  },

  mounted: function ()
  {
    $("#site-button-size").slider({
      orientation: "horizontal",
      min: 75,
      max: 250,
      value: this.size,
      step: 1,
      slide: (event, ui) =>
      {
        this.size = ui.value;
      },
      change: (event, ui) =>
      {
        localStorage["siteSize"] = ui.value;
      }
    });
  },

  created: function ()
  {
    if ('siteSize' in localStorage)
    {
      this.size = parseInt(localStorage["siteSize"]);
    }

    console.log("Site resize slider component loaded.");
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