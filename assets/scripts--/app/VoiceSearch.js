/**
 * Created by Profesor08 on 02.01.2016.
 */
define(["element"], function (Element)
{

  return function()
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

    var recognition = new speechRecognition();
    var div = new Element("div").addClass("microphone");
    var body = document.querySelector("body");
    var recording = false;

    body.appendChild(div.get());

    div.addEventListener("click", function ()
    {
      if (!recording)
      {
        div.addClass("recording");
        recognition.start();
      }
      else
      {
        recognition.stop();
      }
      recording = !recording;
    });

    recognition.addEventListener("result", function (event)
    {
      window.open("http://google.ru/search?q=" + event.results[0][0].transcript, "");
    });

    recognition.addEventListener("end", function ()
    {
      div.removeClass("recording").removeClass("prepare");
      recording = false;
    });

    recognition.addEventListener("error", function (event)
    {
      console.log("%cERROR: " + event.error, "color: #FF0000;");
      console.log(event);
    });
  }

});