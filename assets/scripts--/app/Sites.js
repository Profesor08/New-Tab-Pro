/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["site", "element", "jquery"], function (Site, Element, $)
{

  return function()
  {
    var content = (new Element("div")).addClass("content").setId("content");
    var tabs = (new Element("div")).addClass("tabs").appendChild(content);
    document.querySelector("body").appendChild(tabs.get());

    var data = [
      ["google", "Google", "https://www.google.ru"],
      ["torrents", "Torrentsmd", "https://torrentsmd.com/"],
      ["youtube", "Youtube", "https://youtube.com/"],
      ["xmu", "X-MU Forum", "http://forum.x-mu.net/"],
      ["facebook", "Facebook", "https://facebook.com/"],
      ["micb", "Moldindconbank", "https://wb.micb.md/"],
      ["habr", "Habrahabr", "http://habrahabr.ru/"],
      ["geek", "Geektimes", "http://geektimes.ru/"],
      ["vk", "Vkontakte", "http://vk.com"],
      ["lostfilm", "Lostfilm", "http://lostfilm.tv/"],
      ["thepiratebay", "The Pirate Bay", "http://thepiratebay.se/"],
      //["amazon", "Amazon", "http://www.amazon.com/"],
      ["ebay", "Ebay", "http://ebay.com/"],
      ["gearbest", "GearBest", "http://www.gearbest.com/"],
      ["paypal", "Paypal", "http://paypal.com/"],
      ["coub", "Coub", "http://coub.com/"]
    ];

    if ("web_sites" in localStorage)
    {
      data = JSON.parse(localStorage["web_sites"]);

      for (var i = 0; i < data.length; i++)
      {
        new Site(content).setClass(data[i][0]).setName(data[i][1]).setUrl(data[i][2]);
      }

    }
    else
    {

      localStorage["web_sites"] = JSON.stringify(data);
    }
  }

});