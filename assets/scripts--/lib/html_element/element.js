define(function ()
{
  var ElementConstructor = function (name)
  {
    var element = null;

    if (typeof name == "object")
    {
      if (name.constructor.name == this.constructor.name)
      {
        element = name.get();
      }
      else
      {
        element = name;
      }
    }
    else
    {
      element = document.createElement(name);
    }

    this.get = function ()
    {
      return element;
    };

    this.addClass = function (className)
    {
      element.classList.add(className);
      return this;
    };

    this.removeClass = function (className)
    {
      element.classList.remove(className);
      return this;
    };

    this.hasClass = function (className)
    {
      return element.classList.contains(className);
    };

    this.clearAttributes = function ()
    {
      if (element.attributes)
      {
        var attributes = [];
        Object.getOwnPropertyNames(element.attributes).forEach(function (name)
        {
          attributes.push(Object.getOwnPropertyDescriptor(element.attributes, name).value.name);
        });

        attributes.forEach(function (attr)
        {
          element.removeAttribute(attr);
        });
      }
      return this;
    };

    this.clearAttributesAll = function ()
    {
      if (element.attributes)
      {
        var attributes = [];
        Object.getOwnPropertyNames(element.attributes).forEach(function (name)
        {
          attributes.push(Object.getOwnPropertyDescriptor(element.attributes, name).value.name);
        });

        attributes.forEach(function (attr)
        {
          element.removeAttribute(attr);
        });
      }

      [].forEach.call(element.childNodes, function (child)
      {
        new ElementConstructor(child).clearAttributesAll();
      });

      return this;
    };

    this.setText = function (text)
    {
      element.innerHTML = text;
      return this;
    };

    this.getText = function ()
    {
      return element.innerHTML;
    };

    this.appendText = function (text)
    {
      element.innerHTML = element.innerHTML + text;
      return this;
    };

    this.attr = function (attr, value)
    {
      return this.setAttribute(attr, value);
    };

    this.setAttribute = function (attr, value)
    {
      element.setAttribute(attr, value);
      return this;
    };

    this.css = function (styleProperty, value)
    {
      if (value)
      {
        element.style[styleProperty] = value;
      }
      else
      {
        return element.style[styleProperty];
      }
      return this;
    };

    this.appendChild = function (child)
    {
      if (child.constructor.name == this.constructor.name)
      {
        element.appendChild(child.get());
      }
      else
      {
        element.appendChild(child);
      }
      return this;
    };

    this.prependChild = function (child)
    {
      if (child.constructor.name == this.constructor.name)
      {
        element.insertBefore(child.get(), element.firstChild);
      }
      else
      {
        element.insertBefore(child, element.firstChild);
      }
      return this;
    };

    this.insertBefore = function (newElement, referenceElement)
    {
      if (newElement.constructor.name == this.constructor.name)
      {
        newElement = newElement.get();
      }

      if (referenceElement.constructor.name == this.constructor.name)
      {
        referenceElement = referenceElement.get();
      }

      referenceElement.parentNode.insertBefore(newElement, referenceElement);

      return this;
    };
    
    this.addEventListener = function (event, callback)
    {
      element.addEventListener(event, callback);
      return this;
    };

    this.checked = function (value)
    {
      if (value)
      {
        element.checked = value == true;
        return this;
      }
      else
      {
        return element.checked;
      }
    };

    this.setId = function (value)
    {
      element.setAttribute("id", value);
      return this;
    };

    this.selfDelete = function()
    {
      element.parentNode.removeChild(element);
    };

  };

  return ElementConstructor;
});