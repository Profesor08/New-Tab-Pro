/**
 * Created by Profesor08 on 01.02.2016.
 */

define(["element", "ajax", "queue", "button"], function (Element, Ajax, Queue, Button)
{

  return function ()
  {
    var button = new Button("Show Currency", "currency");
    var table = null;

    function getData(text)
    {
      var xml = new DOMParser().parseFromString(text, "text/xml");

      var data = [];

      [].forEach.call(xml.documentElement.childNodes, function (volute)
      {
        if (volute.nodeType == Node.ELEMENT_NODE)
        {
          data.push(
            {
              NumCode: volute.querySelector("NumCode").innerHTML,
              CharCode: volute.querySelector("CharCode").innerHTML,
              Nominal: volute.querySelector("Nominal").innerHTML,
              Name: volute.querySelector("Name").innerHTML,
              Value: volute.querySelector("Value").innerHTML
            }
          );
        }
      });

      return data;
    }

    function createTable(data)
    {
      var title = new Queue(["В валюте", "В леях", "Курс"]);
      var table = new Element("table").addClass("currency");

      var thead = new Element("tr")
        .appendChild(new Element("th"))
        .appendChild(new Element("th").setText(title.nextPost()))
        .appendChild(new Element("th").setText(title.nextPost()))
        .appendChild(new Element("th").setText(title.nextPost()));

      var volutes = ["USD", "EUR", "RUB", "UAH", "RON", "GBP", "CHF"];

      table.appendChild(thead);

      data.forEach(function (e)
      {

        if (volutes.indexOf(e.CharCode) == -1)
        {
          return;
        }

        var tr = new Element("tr");
        var nominal = new Element("input").attr("type", "number").attr("step", 0.01).attr("value", e.Nominal);
        var result = new Element("input").attr("type", "number").attr("step", 0.01).attr("value", parseFloat(e.Value).toFixed(2));

        nominal.addEventListener("input", function ()
        {
          result.get().value = parseFloat(this.value * parseFloat(e.Value)).toFixed(2);
        });

        result.addEventListener("input", function ()
        {
          nominal.get().value = parseFloat(this.value / parseFloat(e.Value)).toFixed(2);
        });

        tr.appendChild(new Element("td").addClass("volute").setText(e.CharCode));
        tr.appendChild(new Element("td").addClass("nominal").appendChild(nominal));
        tr.appendChild(new Element("td").addClass("result").appendChild(result));
        tr.appendChild(new Element("td").addClass("buy").setText(parseFloat(e.Value).toFixed(2)));

        table.appendChild(tr);
      });

      return table;
    }

    button.checkedAction(function ()
    {

        Ajax({
          url: "http://bnm.md/ru/official_exchange_rates?get_xml=1&date=" + new Date().toLocaleDateString(),
          success: function (text)
          {
            var data = getData(text);
            table = createTable(data);
            document.querySelector("body").appendChild(table.get());
          }
        });

    });

    button.uncheckedAction(function ()
    {
      if (table != null)
      {
        table.selfDelete();
      }
    });

    button.checkState();

  }

});