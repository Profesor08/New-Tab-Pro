/**
 * Created by Profesor08 on 05.01.2016.
 */
define(["jquery"], function ()
{

  return function (host)
  {

    var request = function (params, callback, error)
    {

      var data = {
        version: "1.1",
        params: {}
      };

      for (var key in params)
      {
        if (params.hasOwnProperty(key))
        {
          data[key] = params[key];
        }
      }

      $.ajax({
        type: "POST",
        url: host,
        data: JSON.stringify(data),
        dataType: "JSON",
        success: callback,
        error: error
      });
    };

    this.Play = function (params, callback, error)
    {
      request({
        method: "Play",
        params: params
      }, callback, error);
    };

    this.Pause = function (callback, error)
    {
      request({
        method: "Pause",
        params: {}
      }, callback, error);
    };

    this.PlayPrevious = function (callback, error)
    {
      request({
        method: "PlayPrevious",
        params: {}
      }, callback, error);
    };

    this.PlayNext = function (callback, error)
    {
      request({
        method: "PlayNext",
        params: {}
      }, callback, error);
    };

    this.RepeatPlaybackMode = function (repeat_on)
    {
      request({
        method: "RepeatPlaybackMode",
        params: {
          repeat_on: repeat_on
        }
      });
    };

    this.ShufflePlaybackMode = function (shuffle_on)
    {
      request({
        method: "ShufflePlaybackMode",
        params: {
          shuffle_on: shuffle_on
        }
      });
    };

    this.GetPlayerControlPanelState = function (callback, error)
    {
      request({
        method: "GetPlayerControlPanelState",
        params: {}
      }, callback, error);
    };

    this.GetFormattedEntryTitle = function (playlist_id, track_id, callback, error)
    {
      request({
        method: "GetFormattedEntryTitle",
        params: {
          format_string: "%IF(%a,%a - %T,%T)",
          playlist_id: playlist_id,
          track_id: track_id
        }
      }, callback, error);
    };

    this.SetPlayPosition = function (position, callback, error)
    {
      request({
        method: "Status",
        params: {
          status_id: 31,
          value: position
        }
      }, callback, error);
    };

    this.SubscribeOnAIMPStateUpdateEvent = function (event, callback, error)
    {
      request({
        method: "SubscribeOnAIMPStateUpdateEvent",
        params: {
          event: event
        }
      }, callback, error);
    };

    this.VolumeLevel = function (level, callback, error)
    {
      request({
        method: "VolumeLevel",
        params: {
          level: level
        }
      }, callback, error);
    };

    this.Mute = function (mute_on, callback, error)
    {
      request({
        method: "Mute",
        params: {
          mute_on: mute_on
        }
      }, callback, error);
    };

    this.GetPlaylists = function(callback, error)
    {
      request({
        method: "GetPlaylists",
        params: {
          fields: ["id", "title"]
        }
      }, callback, error);
    };
    
    this.GetPlaylistEntries = function (playlist_id, entries_count, start_index, callback, error)
    {
      request({
        method: "GetPlaylistEntries",
        params: {
          playlist_id: playlist_id,
          fields: ["id", "artist", "title", "album", "date", "genre", "bitrate", "duration", "filesize", "rating"],
          entries_count: entries_count,
          order_fields: [],
          search_string: "",
          start_index: start_index
        }
      }, function(res) {
        var entries = [];

        res.result.entries.forEach(function (e)
        {
          entries.push({
            id : e[0],
            artist : e[1],
            title : e[2],
            album : e[3],
            date : e[4],
            genre : e[5],
            bitrate : e[6],
            duration : e[7],
            filesize : e[8],
            rating : e[9]
          });
        });

        res.result.entries = entries;

        callback(res);
      }, error);
    };

  }

});