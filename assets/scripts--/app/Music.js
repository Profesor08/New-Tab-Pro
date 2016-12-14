/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["music", "element"], function (Music, Element)
{

  return function()
  {
    var div = new Element("div").setId("sound").addClass("fa").addClass("stop");

    var music_control = new Music(div.get());

    var sounds = [
      "http://e-webdev.ru/new_tab_pro/sound/music/Tamee harrison - A beautiful time.mp3",
      "http://e-webdev.ru/new_tab_pro/sound/music/Christmas Songs - Dean Martin - Let It Snow.mp3",
      "http://e-webdev.ru/new_tab_pro/sound/music/Christmas Songs - Jingle Bells.mp3",
      "http://e-webdev.ru/new_tab_pro/sound/music/Christmas Songs - Magic Moments.mp3",
      "http://e-webdev.ru/new_tab_pro/sound/music/Eartha Kitt - Santa Baby.mp3"
    ];

    document.querySelector(".controls .advancedA").appendChild(div.get());

    div.addEventListener("click", function ()
    {
      if (music_control.paused())
      {
        music_control.play();
        div.removeClass("stop").addClass("play");
      }
      else
      {
        music_control.pause();
        div.removeClass("play").addClass("stop");
      }
    });

    music_control.setTrack(sounds[Math.floor(Math.random() * sounds.length)]);

    music_control.setVolume(0.05);

    music_control.ended = function ()
    {
      this.setTrack(sounds[Math.floor(Math.random() * sounds.length)]);
      this.play();
    };

    if ("play_music" in localStorage)
    {
      music_control.play();
      div.removeClass("stop").addClass("play");
    }
  }

});