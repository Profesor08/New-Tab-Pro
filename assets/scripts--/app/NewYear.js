/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["newyear", "element", "button"], function (NewYear, Element, Control)
{

  return function()
  {
    var button = new Control("Balls", "balls_show");
    var generated = false;

    var balls_block = new Element("div").setId("balls_show_block").addClass("b-page_newyear");
    var container2 = new Element("div").addClass("b-page__content");
    var container = new Element("div").addClass("b-head-decor");

    button.checkedAction(function()
    {
      if (!generated)
      {

        for (var i = 1; i <= 7; i++)
        {
          var block = new Element("div").addClass("b-head-decor__inner").addClass("b-head-decor__inner_n" + i);

          for (var j = 1; j <= 9; j++)
          {
            var ball = new Element("div").addClass("b-ball").addClass("b-ball_n" + j).addClass("b-ball_bounce");
            ball.appendChild(new Element("div").addClass("b-ball__right"));
            ball.appendChild(new Element("div").addClass("b-ball__i"));
            block.appendChild(ball);
          }

          for (j = 1; j <= 9; j++)
          {
            var branch = new Element("div").addClass("b-ball").addClass("b-ball_i" + j);
            branch.appendChild(new Element("div").addClass("b-ball__right"));
            branch.appendChild(new Element("div").addClass("b-ball__i"));
            block.appendChild(branch);
          }

          container.appendChild(block);
        }

        container2.appendChild(container);
        balls_block.appendChild(container2);
        document.querySelector("body").appendChild(balls_block.get());

        NewYear();
        generated = true;
      }

      balls_block.css("display", "block");
    });

    button.uncheckedAction(function()
    {
      if (generated)
      {
        balls_block.css("display", "none");
      }
    });

    button.checkState();
  }

});