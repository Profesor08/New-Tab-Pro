/**
 * Created by Profesor08 on 10.12.2016.
 */

var Sites = function (data)
{
  var container = document.createElement("div");
  container.classList.add("content");

  var tabs = document.createElement("div");
  tabs.classList.add("tabs");
  tabs.appendChild(container);

  document.body.appendChild(tabs);

  var Site = function ()
  {
    var button = document.createElement("div");
    var name = document.createElement("div");
    var link = document.createElement("a");
    var div = document.createElement("div");
    var id = null;

    button.classList.add("site");
    name.classList.add("name");
    link.classList.add("link");

    button.appendChild(name);
    button.appendChild(link);
    link.appendChild(div);
    container.appendChild(button);

    this.setClass = function (className)
    {
      if (id)
      {
        button.classList.remove(id);
      }
      button.classList.add(className);
      id = className;
      return this;
    };

    this.setName = function (siteName)
    {
      name.innerHTML = siteName;
      return this;
    };

    this.setUrl = function (url)
    {
      link.setAttribute("href", url);
      return this;
    };

  };

  for (let i = 0; i < data.length; i++)
  {
    new Site().setClass(data[i][0]).setName(data[i][1]).setUrl(data[i][2]);
  }

};