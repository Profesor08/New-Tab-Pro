/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("snow-button", {
  template: '#snow-button',

  data: function ()
  {
    return commonData
  },

  methods: {
    showSnow: function (show)
    {
      if (show)
      {
        this.snowButton.canvas.classList.add("active");
        this.snowButton.snow.start();
      }
      else
      {
        this.snowButton.canvas.classList.remove("active");
        this.snowButton.snow.stop();
      }

      this.snowButton.active = show;

      localStorage["showSnow"] = show;
    }
  },

  created: function ()
  {
    this.snowButton.canvas = document.createElement("canvas");
    this.snowButton.canvas.setAttribute("id", this.snowButton.canvas_id);
    document.body.appendChild(this.snowButton.canvas);

    this.snowButton.snow = new Snowfall("#" + this.snowButton.canvas_id, {
      images: [
        "assets/images/flakes/flake1.png",
        "assets/images/flakes/flake2.png",
        "assets/images/flakes/flake3.png",
        "assets/images/flakes/flake4.png",
        "assets/images/flakes/flake5.png",
        "assets/images/flakes/flake6.png",
        "assets/images/flakes/flake7.png"
      ],
      count: 250
    });

    if ("showSnow" in localStorage)
    {
      this.showSnow(localStorage["showSnow"] == "true");
    }
    else
    {
      this.showSnow(true);
    }

    console.log("Snow component loaded.");
  }
});