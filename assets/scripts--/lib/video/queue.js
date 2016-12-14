/**
 * Created by Profesor08 on 14.01.2016.
 */
define(function()
{
  return function (name)
  {
    var index = 0;

    this.next = function ()
    {
      if (++index >= name.length)
      {
        index = 0;
      }
      return name[index];
    };

    this.nextPost = function()
    {
      if (index + 1 == name.length)
      {
        index = 0;
        return name[name.length - 1];
      }
      return name[index++];
    };

    this.current = function ()
    {
      return name[index];
    };

    this.get = function(id)
    {
      return name[id];
    };

    this.rand = function()
    {
      index = Math.floor(Math.random() * name.length);
      return name[index];
    }

  }
});