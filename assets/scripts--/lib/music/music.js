define(function ()
{
  return function Music()
  {

    var audio = document.createElement("audio");
    var self = this;

    this.paused = function ()
    {
      return audio.paused;
    };

    this.play = function ()
    {
      audio.play();
      localStorage["play_music"] = audio.src;
    };

    this.pause = function ()
    {
      audio.pause();
      localStorage.removeItem("play_music");
    };

    this.setTrack = function (src)
    {
      try
      {
        audio.src = src;
      }
      catch (ex)
      {
        console.log(ex.message);
      }
    };

    this.setVolume = function (value)
    {
      try
      {
        audio.volume = value;
      }
      catch (ex)
      {
        console.log(ex.message);
      }
    };

    this.ended = function ()
    {

    };

    this.setTime = function (seconds)
    {
      audio.currentTime = seconds;
    };

    audio.addEventListener("ended", function ()
    {
      self.ended();
    });

  }
});