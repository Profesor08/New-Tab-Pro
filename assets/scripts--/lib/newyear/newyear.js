define(["transform2d"], function ()
{
  return function NewYear()
  {
    $(function ()
    {
      $(".b-ball_bounce").mouseenter(function (event)
      {
        event.stopPropagation();
        var e = $(this);
        if (e.is(':animated'))
        {
          return;
        }
        e.animate({transform: "rotate(-9deg)"}, 200, "linear", function ()
        {
          e.animate({transform: "rotate(6deg)"}, 200, "linear", function ()
          {
            e.animate({transform: "rotate(-3deg)"}, 150, "linear", function ()
            {
              e.animate({transform: "rotate(1.5deg)"}, 100, "linear", function ()
              {
                e.animate({transform: "rotate(0deg)"}, 100);
              });
            });
          });
        });
      });
    });
  }
});

