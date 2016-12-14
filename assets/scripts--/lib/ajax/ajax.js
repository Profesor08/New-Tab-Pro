define(function ()
{
  return function ajax(params)
  {

    var data = {
      url: "",
      method: "GET",
      data: {},
      success: function() {},
      error: function() {}
    };

    for (var key in params)
    {
      if (params.hasOwnProperty(key))
      {
        data[key] = params[key];
      }
    }

    var XmlHttp = function XmlHttp()
    {
      var xmlhttp;
      try
      {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e)
      {
        try
        {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E)
        {
          xmlhttp = false;
        }
      }
      if (!xmlhttp && typeof XMLHttpRequest != 'undefined')
      {
        xmlhttp = new XMLHttpRequest();
      }
      return xmlhttp;
    };

    var req = XmlHttp();

    req.onreadystatechange = function ()
    {
      if (req.readyState == 4)
      {
        if (req.status == 200)
        {
          if (data.success && (typeof data.success == "function"))
          {
            if (data.format)
            {
              if (data.format == "json")
              {
                data.success(JSON.parse(req.responseText));
              }
              else
              {
                data.success(req.responseText);
              }
            }
            else
            {
              data.success(req.responseText);
            }
          }

        }
        else
        {
          if (data.error && (typeof data.error == "function"))
          {
            data.error();
          }
          else
          {
            console.log("error: " + req.status);
          }
        }
      }
    };

    if (data.data)
    {
      var tmp = [];
      for (var property in data.data)
      {
        if (data.data.hasOwnProperty(property))
        {
          tmp.push(property + "=" + data.data[property]);
        }
      }
      if (tmp.length)
      {
        data.url += tmp.join("&");
      }
    }

    req.open("GET", data.url, true);

    if (data.hasOwnProperty("beforeSend"))
    {
      data.beforeSend(req);
    }

    req.send(null);

  }
});