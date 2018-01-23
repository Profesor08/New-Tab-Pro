let Utils = {
  copyToClipboard: function (text) {
    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    copyFrom.style.position = "absolute";
    copyFrom.style.left = "-9999px";
    copyFrom.style.top = "0px";
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    document.body.removeChild(copyFrom);
  },

  clickOutOfElement: function (elements, callback) {

    function isClicked(target, element)
    {
      if (target !== null && target !== undefined)
      {
        if (target.isSameNode(element))
        {
          return true;
        }
        else
        {
          return isClicked(target.parentNode, element);
        }
      }
    }

    if (Array.isArray(elements) === false)
    {
      elements = [elements];
    }

    document.body.addEventListener("click", function (event) {
      let counter = 0;

      for (let i = 0; i < elements.length; i++)
      {
        if (!isClicked(event.target, elements[i]))
        {
          counter++;
        }
      }

      if (counter === elements.length)
      {
        callback(event);
      }

    });
  },

  mouseleaveTimeout: function (element, delay, callback) {
    let timeout = null;

    element.addEventListener("mouseenter", function () {
      clearTimeout(timeout);
    });

    element.addEventListener("mouseleave", function () {
      timeout = setTimeout(function () {
        callback();
      }, delay);
    });
  }
};