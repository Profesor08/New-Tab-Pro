/**
 * Created by Profesor08 on 14.01.2016.
 */
define(["element", "queue", "button"], function (Element, Queue, Control)
{

  return function ()
  {

    var video = document.createElement("video");
    var audio = document.createElement("audio");
    var button_audio = new Control("Background Music", "video_audio_background");

    var data = new Queue([
      {
        name: "Piercing Light (Mako Remix)",
        video: "assets/video/Piercing Light (Mako Remix).mp4",
        audio: "assets/video/song/Piercing Light (Mako Remix).mp3"
      },
      {
        name: "Edge of Infinity (Minnesota Remix)",
        video: "assets/video/Edge of Infinity (Minnesota Remix).mp4",
        audio: "assets/video/song/Edge of Infinity (Minnesota Remix).mp3"
      },
      {
        name: "Welcome to Planet Urf (Jauz Remix)",
        video: "assets/video/Welcome to Planet Urf (Jauz Remix).mp4",
        audio: "assets/video/song/Welcome to Planet Urf (Jauz Remix).mp3"
      },
      {
        name: "PROJECT Yi (Vicetone Remix)",
        video: "assets/video/PROJECT Yi (Vicetone Remix).mp4",
        audio: "assets/video/song/PROJECT Yi (Vicetone Remix).mp3"
      },
      {
        name: "Flash Funk (Marshmello Remix)",
        video: "assets/video/Flash Funk (Marshmello Remix).mp4",
        audio: "assets/video/song/Flash Funk (Marshmello Remix).mp3"
      },
      {
        name: "Let The Games Begin (Hyper Potions Remix)",
        video: "assets/video/Let The Games Begin (Hyper Potions Remix).mp4",
        audio: "assets/video/song/Let The Games Begin (Hyper Potions Remix).mp3"
      },
      {
        name: "Worlds Collide (Arty Remix)",
        video: "assets/video/Worlds Collide (Arty Remix).mp4",
        audio: "assets/video/song/Worlds Collide (Arty Remix).mp3"
      },
      {
        name: "The Glory (James Egbert Remix)",
        video: "assets/video/The Glory (James Egbert Remix).mp4",
        audio: "assets/video/song/The Glory (James Egbert Remix).mp3"
      },
      {
        name: "The Boy Who Shattered Time (MitiS Remix)",
        video: "assets/video/The Boy Who Shattered Time (MitiS Remix).mp4",
        audio: "assets/video/song/The Boy Who Shattered Time (MitiS Remix).mp3"
      },
      {
        name: "Lucidity (Dan Negovan Remix)",
        video: "assets/video/Lucidity (Dan Negovan Remix).mp4",
        audio: "assets/video/song/Lucidity (Dan Negovan Remix).mp3"
      },
      {
        name: "Silver Scrapes (ProtoShredanoid Remix)",
        video: "assets/video/Silver Scrapes (ProtoShredanoid Remix).mp4",
        audio: "assets/video/song/Silver Scrapes (ProtoShredanoid Remix).mp3"
      }
    ]);

    document.querySelector("body").appendChild(video);

    video.classList.add("video_background");
    video.src = data.rand().video;
    audio.src = data.current().audio;
    audio.volume = 0.03;
    video.play();

    audio.addEventListener("ended", function ()
    {
      video.src = data.next().video;
      audio.src = data.current().audio;
    });

    audio.addEventListener("canplay", function()
    {
      if (video.readyState == 4)
      {
        audio.play();
        video.play();
      }
    });

    video.addEventListener("canplay", function()
    {
      if (audio.readyState == 4)
      {
        audio.play();
        video.play();
      }
    });

    audio.addEventListener("timeupdate", function()
    {

    });

    audio.addEventListener("error", function()
    {
      console.log(this.error);
    });

    button_audio.checkedAction(function ()
    {
      audio.currentTime = video.currentTime;
      audio.volume = 0.03;
    });

    button_audio.uncheckedAction(function ()
    {
      audio.volume = 0;
    });

    button_audio.checkState();

    window.audio = audio;

  }

});