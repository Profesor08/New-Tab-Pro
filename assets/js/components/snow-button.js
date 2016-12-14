/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("snow-button", {
  template: '#snow-button',

  data: function ()
  {
    return {
      active: true,
      snow: null,
      canvas_id: "Snow",
      canvas: null
    }
  },

  methods: {
    showSnow: function (show)
    {
      if (show)
      {
        this.canvas.classList.add("active");
        this.snow.start();
      }
      else
      {
        this.canvas.classList.remove("active");
        this.snow.stop();
      }

      this.active = show;

      localStorage["showSnow"] = show;
    }
  },

  created: function ()
  {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", this.canvas_id);
    document.body.appendChild(this.canvas);

    this.snow = new Snow("#" + this.canvas_id, {
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