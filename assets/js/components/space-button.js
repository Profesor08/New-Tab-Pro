/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("space-button", {
  template: '#space-button',

  data: function ()
  {
    return {
      active: true,
      space: null,
      canvas_id: "FlyingThroughTheSpace",
      canvas: null
    }
  },

  methods: {
    showSpace: function (show)
    {
      if (show)
      {
        this.canvas.classList.add("active");
        this.space.start();
      }
      else
      {
        this.canvas.classList.remove("active");
        this.space.stop();
      }

      this.active = show;

      localStorage["showSpace"] = show;
    }
  },

  created: function ()
  {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", this.canvas_id);
    document.body.appendChild(this.canvas);

    this.space = new FlyingThroughTheSpace("#" + this.canvas_id, {
      speed: 0.025,
      count: 300,
      background: sitesData.pageBackgroundColor,
      experimental: true
    });

    if ("showSpace" in localStorage)
    {
      this.showSpace(localStorage["showSpace"] == "true");
    }
    else
    {
      this.showSpace(true);
    }

    console.log("Space component loaded.");
  }
});