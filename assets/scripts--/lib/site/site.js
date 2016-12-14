define(function ()
{
  return function Site(container)
  {

    container = typeof container == "object" ? container : document.querySelector(container);
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

  }
});