/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("clouds-button", {
  template: '#clouds-button',

  data: function ()
  {
    return commonData
  },

  methods: {
    showClouds: function (show)
    {
      if (show)
      {
        this.cloudsButton.canvas.classList.add("active");
        this.cloudsButton.clouds.start();
      }
      else
      {
        this.cloudsButton.canvas.classList.remove("active");
        this.cloudsButton.clouds.stop();
      }

      this.cloudsButton.active = show;

      localStorage["showClouds"] = show;
    }
  },

  created: function ()
  {
    this.cloudsButton.canvas = document.createElement("canvas");
    this.cloudsButton.canvas.setAttribute("id", this.cloudsButton.canvas_id);
    document.body.appendChild(this.cloudsButton.canvas);

    this.cloudsButton.clouds = new Clouds("#" + this.cloudsButton.canvas_id, {
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