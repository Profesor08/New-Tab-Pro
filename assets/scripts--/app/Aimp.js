/**
 * Created by Profesor08 on 05.01.2016.
 */
define(["aimp_api", "jquery-ui"], function (AimpAPI)
{

  return function ()
  {

    var api = new AimpAPI("http://127.0.0.1:38475/RPC_JSON");

    window.api = api;

    var blockProgressUpdate = false;
    var pendingSubscriptionToControlPanelStateChange = false;


    var play = document.querySelector(".aimp .play");
    var previous = document.querySelector(".aimp .previous");
    var next = document.querySelector(".aimp .next");
    var repeat = document.querySelector(".aimp .repeat");
    var shuffle = document.querySelector(".aimp .shuffle");
    var title = document.querySelector(".aimp .track-name");
    var time = document.querySelector(".aimp .play-time");
    var length = document.querySelector(".aimp .track-length");
    var progressBar = document.querySelector(".aimp .progress-bar");
    var progressPoint = document.querySelector(".aimp .progress-point");
    var timeLine = document.querySelector(".aimp .time-line");
    var volume = document.querySelector(".aimp .volume");
    var volumePoint = document.querySelector(".aimp .volume-progress-point");
    var volumeBar = document.querySelector(".aimp .volume-progress-bar");
    var volumeSlider = document.querySelector(".aimp .volume-bg-wrapper");

    function getTime(seconds)
    {
      var date = new Date(seconds * 1000);
      var hh = date.getUTCHours();
      var mm = date.getUTCMinutes();
      var ss = date.getSeconds();
      if (hh > 0 && hh < 10)
      {
        hh = "0" + hh + ":";
      }
      else
      {
        hh = "";
      }

      if (ss < 10)
      {
        ss = "0" + ss;
      }

      return hh + mm + ":" + ss;
    }

    function updateControls(res)
    {


      // {
      //   "id": 2,
      //   "jsonrpc": "2.0",
      //   "result": {
      //     "current_track_source_radio": false,
      //     "mute_mode_on": false,
      //     "playback_state": "playing",
      //     "playlist_id": 75408160,
      //     "radio_capture_mode_on": false,
      //     "repeat_mode_on": true,
      //     "shuffle_mode_on": false,
      //     "track_id": 95889064,
      //     "track_length": 249,
      //     "track_position": 51,
      //     "volume": 50
      //   }
      // }

      if (res.result.playback_state == "playing")
      {
        play.classList.add("pause");
      }
      else
      {
        play.classList.remove("pause");
      }

      if (!blockProgressUpdate)
      {
        volumePoint.style.top = (100 - res.result.volume) + "px";
        volumeBar.style.height = res.result.volume + "px";
      }

      if (res.result.repeat_mode_on)
      {
        repeat.classList.add("active");
      }
      else
      {
        repeat.classList.remove("active");
      }

      if (res.result.shuffle_mode_on)
      {
        shuffle.classList.add("active");
      }
      else
      {
        shuffle.classList.remove("active");
      }

      if (res.result.mute_mode_on)
      {
        volume.classList.add("muted");
      }
      else
      {
        volume.classList.remove("muted");
      }

      // setPlayListPlayingTrack(res.result.playlist_id, res.result.track_id);

      api.GetFormattedEntryTitle(res.result.playlist_id, res.result.track_id, function (res)
      {
        title.innerHTML = res.result.formatted_string;
      });
    }

    function syncProgressBar()
    {
      api.GetPlayerControlPanelState(function (res)
      {

        time.innerHTML = getTime(res.result.track_position);

        length.innerHTML = getTime(res.result.track_length);

        if (!blockProgressUpdate)
        {
          progressBar.style.width = res.result.track_position / (res.result.track_length / 100) + "%";
        }
      });
    }

    function update()
    {
      api.GetPlayerControlPanelState(function (res)
      {
        updateControls(res);
      });
    }
    
    function SubscribeToControlPanelStateChange()
    {
      if (!pendingSubscriptionToControlPanelStateChange)
      {

        pendingSubscriptionToControlPanelStateChange = true;
        api.SubscribeOnAIMPStateUpdateEvent("control_panel_state_change", function (res)
        {
          pendingSubscriptionToControlPanelStateChange = false;
          updateControls(res);
          SubscribeToControlPanelStateChange();
        }, function ()
        {
          pendingSubscriptionToControlPanelStateChange = false;
          setTimeout(function ()
          {
            SubscribeToControlPanelStateChange();
          }, 1000);
        });
      }
    }
    
    play.addEventListener("click", function ()
    {
      if (this.classList.contains("pause"))
      {
        this.classList.remove("pause");
        api.Pause();
      }
      else
      {
        api.Play({});
      }
    });

    previous.addEventListener("click", function ()
    {
      api.PlayPrevious();
    });

    next.addEventListener("click", function ()
    {
      api.PlayNext();
    });

    repeat.addEventListener("click", function ()
    {
      if (this.classList.contains("active"))
      {
        this.classList.remove("active");
        api.RepeatPlaybackMode(false);
      }
      else
      {
        this.classList.add("active");
        api.RepeatPlaybackMode(true);
      }
    });

    shuffle.addEventListener("click", function ()
    {
      if (this.classList.contains("active"))
      {
        this.classList.remove("active");
        api.ShufflePlaybackMode(false);
      }
      else
      {
        this.classList.add("active");
        api.ShufflePlaybackMode(true);
      }
    });

    timeLine.addEventListener("click", function (event)
    {
      api.GetPlayerControlPanelState(function (res)
      {
        api.SetPlayPosition(parseInt(res.result.track_length / 100 * (event.layerX / (event.target.clientWidth / 100))));
      });
    });

    $(progressPoint).draggable({
      axis: "x",
      containment: "parent",
      start: function ()
      {
        this.classList.add("active");
        blockProgressUpdate = true;
      },
      drag: function ()
      {
        var position = $(this).position().left / (this.parentNode.clientWidth / 100);
        progressBar.style.width = position + "%";
      },
      stop: function ()
      {
        this.classList.remove("active");
        var position = $(this).position().left / (this.parentNode.clientWidth / 100);
        progressBar.style.width = position + "%";
        api.GetPlayerControlPanelState(function (res)
        {
          api.SetPlayPosition(parseInt(res.result.track_length / 100 * (position)), function ()
          {
            blockProgressUpdate = false;
          });
        });
        this.style.left = "auto";
      }
    });

    volumeSlider.addEventListener("click", function (event)
    {
      api.VolumeLevel(100 - event.layerY);
      volumeBar.style.height = (100 - event.layerY) + "px";
      volumePoint.style.top = (event.layerY) + "px";
    });

    $(volumePoint).draggable({
      axis: "y",
      containment: "parent",
      start: function ()
      {
        blockProgressUpdate = true;
      },
      drag: function ()
      {
        var position = 100 - ($(this).position().top / (this.parentNode.clientHeight / 100));
        volumeBar.style.height = position + "px";
      },
      stop: function ()
      {
        var position = 100 - ($(this).position().top / (this.parentNode.clientHeight / 100));
        api.VolumeLevel(position, function ()
        {
          blockProgressUpdate = false;
        });
      }
    });

    volume.addEventListener("click", function (event)
    {
      if (this === event.target)
      {
        if (this.classList.contains("muted"))
        {
          this.classList.remove("muted");
          api.Mute(false);
        }
        else
        {
          this.classList.add("muted");
          api.Mute(true);
        }
      }
    });


    function createPlayListButton(id, title)
    {
      var child = document.createElement("div");

      child.innerHTML = title;

      child.setAttribute("id", "playlist-button-" + id);
      child.addEventListener("click", function ()
      {
        this.parentNode.childNodes.forEach(function (e)
        {
          if (e instanceof HTMLElement)
          {
            e.classList.remove("active");
          }
        });
        this.classList.add("active");

        var playlist = document.querySelector("#playlist-" + id);

        if (playlist)
        {
          playlist.parentNode.childNodes.forEach(function (e)
          {
            if (e instanceof HTMLElement)
            {
              e.classList.remove("active");
            }
          });

          playlist.classList.add("active");
        }
      });

      return child;
    }
    
    function createPlayList(id, tracks)
    {
      var list = document.createElement("div");

      list.classList.add("track-list-wrapper");

      list.setAttribute("id", "playlist-" + id);

      tracks.forEach(function (e)
      {
        var track = document.createElement("div");

        track.classList.add("track");

        track.innerHTML = e.artist.length > 0 ? e.artist + " - " + e.title : e.title;

        track.innerHTML += ":::: " + id + " " + e.id;

        // track.setAttribute("data-playlist", id);
        // track.setAttribute("data-track", e.id);
        track.addEventListener("click", function ()
        {
          console.log(id, e.id);
          api.Play({
            playlist_id: id,
            track_id: e.id
          }, function ()
          {
            // getPlayLists();
          });
        });

        list.appendChild(track);
      });

      return list;
    }
    
    function setActivePlayList(id)
    {
      var button = document.querySelector("#playlist-button-" + id);
      button.click();
    }
    
    function findActivePlayList()
    {
      api.GetPlayerControlPanelState(function (res)
      {
        // console.log(res);
        setActivePlayList(res.result.playlist_id);
        setPlayListPlayingTrack(res.result.playlist_id, res.result.track_id)
      });
    }

    function setPlayListPlayingTrack(playlist, track)
    {
      if (playingTrack)
      {
        playingTrack.classList.remove("playing");
      }

      playingTrack = document.querySelector(".aimp .track[data-track='" + track + "'][data-playlist='" + playlist + "']");

      if (playingTrack)
      {
        playingTrack.classList.add("playing");
      }

      var container = $(playingTrack.parentNode),
        scrollTo = $(playingTrack);

      container.scrollTop(
        scrollTo.offset().top - container.offset().top + container.scrollTop()
      );
    }

    function getPlayLists()
    {

      var buttonsContainer = document.querySelector(".aimp .play-lists-buttons");
      var tracksListContainer = document.querySelector(".aimp .play-lists");

      while (buttonsContainer.firstChild)
      {
        buttonsContainer.removeChild(buttonsContainer.firstChild);
      }

      while (tracksListContainer.firstChild)
      {
        tracksListContainer.removeChild(tracksListContainer.firstChild);
      }

      api.GetPlaylists(function (res)
      {
        var notLast = res.result.length;

        res.result.forEach(function (playlist)
        {
          buttonsContainer.appendChild(createPlayListButton(playlist.id, playlist.title));

          api.GetPlaylistEntries(playlist.id, 10000, 0, function (res)
          {

            if (playlist.id == 77699400)
            {
              console.log(res);
            }

            tracksListContainer.appendChild(createPlayList(playlist.id, res.result.entries));
            if (!(--notLast))
            {
              findActivePlayList();
            }
          });
        });
      });
    }

    // var playingTrack = null;

    // getPlayLists();

    // document.querySelector(".aimp .play-list .toggle-button").addEventListener("click", function ()
    // {
    //   var wrapper = document.querySelector(".aimp .play-list-content-wrapper");
    //   if (wrapper.classList.contains("hidden"))
    //   {
    //     wrapper.classList.remove("hidden");
    //   }
    //   else
    //   {
    //     wrapper.classList.add("hidden");
    //   }
    // });

    SubscribeToControlPanelStateChange();
    update();

    setInterval(function ()
    {
      syncProgressBar();
    }, 1000);

  }

});