/**
 * Created by Profesor08 on 14.12.2016.
 */

Vue.component("microphone-button", {
  template: "#microphone-button",

  data: function ()
  {
    return commonData;
  },

  methods: {
    showMicrophone: function (show)
    {
      this.voiceSearch.active = show;
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
    return commonData;
  },

  methods: {

    startRecording: function ()
    {
      if (!this.voiceSearch.recording)
      {
        this.voiceSearch.voiceSearch.start();
      }
      else
      {
        this.voiceSearch.voiceSearch.stop();
      }
      this.voiceSearch.recording = !this.voiceSearch.recording;
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

    this.voiceSearch.voiceSearch = new speechRecognition();

    this.voiceSearch.voiceSearch.addEventListener("result", (event) =>
    {
      window.open("http://google.ru/search?q=" + event.results[0][0].transcript, "")
    });

    this.voiceSearch.voiceSearch.addEventListener("end", () =>
    {
      this.voiceSearch.recording = false;
    });

    this.voiceSearch.voiceSearch.addEventListener("error", (event) =>
    {
      console.log("%cERROR: " + event.error, "color: #FF0000;");
      console.log(event);
    });

    console.log("Voice Search component loaded.");
  }
});