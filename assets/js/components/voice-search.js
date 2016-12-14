/**
 * Created by Profesor08 on 14.12.2016.
 */

var voiceSearchData = {
  active: true,
  recording: false,
  voiceSearch: null
};

Vue.component("microphone-button", {
  template: "#microphone-button",

  data: function ()
  {
    return voiceSearchData;
  },

  methods: {
    showMicrophone: function (show)
    {
      this.active = show;
      localStorage["showMicrophone"] = show;
    }
  },

  created: function ()
  {
    if ("showMicrophone" in localStorage)
    {
      this.showMicrophone(localStorage["showMicrophone"] == "true");
    }

    console.log("Microphone button component loaded.");
  }
});

Vue.component("microphone", {
  template: "#microphone",

  data: function ()
  {
    return voiceSearchData;
  },

  methods: {

    startRecording: function ()
    {
      if (!this.recording)
      {
        this.voiceSearch.start();
      }
      else
      {
        this.voiceSearch.stop();
      }
      this.recording = !this.recording;
    }

  },

  created: function ()
  {

    if (typeof speechRecognition === "undefined")
    {

      var speechRecognition = null;

      if (typeof msSpeechRecognition !== "undefined")
      {
        speechRecognition = msSpeechRecognition;
      }
      else if (typeof mozSpeechRecognition !== "undefined")
      {
        speechRecognition = mozSpeechRecognition;
      }
      else if (typeof webkitSpeechRecognition !== "undefined")
      {
        speechRecognition = webkitSpeechRecognition;
      }
      else
      {
        console.log("%cERROR: Can't initialize SpeechRecognition!", "color: #FF0000;");
        return;
      }
    }

    this.voiceSearch = new speechRecognition();

    this.voiceSearch.addEventListener("result", (event) =>
    {
      window.open("http://google.ru/search?q=" + event.results[0][0].transcript, "")
    });

    this.voiceSearch.addEventListener("end", () =>
    {
      this.recording = false;
    });

    this.voiceSearch.addEventListener("error", (event) =>
    {
      console.log("%cERROR: " + event.error, "color: #FF0000;");
      console.log(event);
    });

    console.log("Voice Search component loaded.");
  }
});