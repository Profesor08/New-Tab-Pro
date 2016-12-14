define(["element"], function (Element)
{

  var container = document.querySelector(".controls");

  if (container === null)
  {
    container = new Element("div").addClass("controls").appendChild(new Element("div").addClass("advancedA"));

    var close = new Element("div").addClass("close");

    var body = document.querySelector("body");

    var hide = function ()
    {
      container.removeClass("active");
      setTimeout(function ()
      {
        close.removeClass("active");
      }, 30);
    };

    var show = function ()
    {
      container.addClass("active");
      setTimeout(function ()
      {
        close.addClass("active");
      }, 30);
    };

    close.addEventListener("click", function ()
    {

      if (container.hasClass("active"))
      {
        hide();
      }
      else
      {
        show();
      }

    });

    container.appendChild(close);
    body.appendChild(container.get());
    body.addEventListener("click", function (e)
    {
      for(var i = 0; i < e.path.length; i++)
      {
        if (e.path[i].classList && e.path[i].classList.contains("controls"))
        {
          return;
        }
      }

      if (close.hasClass("active"))
      {
        hide();
      }

    });
  }

  return function (text, storage_id)
  {

    var self = this;
    var checked = null;
    var unchecked = null;
    var label = new Element("label").addClass("button").setText(text);

    container.appendChild(label.get());

    label.addEventListener("click", function ()
    {
      if (this.classList.contains("active"))
      {
        self.uncheck();
      }
      else
      {
        self.check();
      }
    });

    this.checkState = function ()
    {
      if (storage_id in localStorage)
      {
        if (localStorage[storage_id] == "true")
        {
          this.check();
        }
        else
        {
          this.uncheck();
        }
      }
      else
      {
        this.check();
      }
    };

    this.checkedAction = function (callback)
    {
      checked = function ()
      {
        callback();
        localStorage[storage_id] = true;
      };
    };

    this.uncheckedAction = function (callback)
    {
      unchecked = function ()
      {
        callback();
        localStorage[storage_id] = false;
      };
    };

    this.check = function ()
    {
      label.addClass("active");
      checked();
    };

    this.uncheck = function ()
    {
      label.removeClass("active");
      unchecked();
    };

  }
});