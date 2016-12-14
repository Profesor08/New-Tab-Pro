/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("clouds-button", {
  template: '#clouds-button',

  data: function ()
  {
    return {
      active: true,
      clouds: null,
      canvas_id: "Clouds",
      canvas: null
    }
  },

  methods: {
    showClouds: function (show)
    {
      if (show)
      {
        this.canvas.classList.add("active");
        this.clouds.start();
      }
      else
      {
        this.canvas.classList.remove("active");
        this.clouds.stop();
      }

      this.active = show;

      localStorage["showClouds"] = show;
    }
  },

  created: function ()
  {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", this.canvas_id);
    document.body.appendChild(this.canvas);

    this.clouds = new Clouds("#" + this.canvas_id, {
      images: [
        "assets/images/clouds/cloud.png",
        "assets/images/clouds/dark_cloud.png",
        "assets/images/clouds/explosion.png",
        "assets/images/clouds/explosion2.png",
        "assets/images/clouds/smoke.png"
      ]
    });

    if ("showClouds" in localStorage)
    {
      this.showClouds(localStorage["showClouds"] == "true");
    }
    else
    {
      this.showClouds(true);
    }

    console.log("Clouds component loaded.");
  }
});