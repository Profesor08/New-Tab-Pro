/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("space-button", {
  template: '#space-button',

  data: function ()
  {
    return commonData
  },

  methods: {
    showSpace: function (show)
    {
      if (show)
      {
        this.spaceButton.canvas.classList.add("active");
        this.spaceButton.space.start();
      }
      else
      {
        this.spaceButton.canvas.classList.remove("active");
        this.spaceButton.space.stop();
      }

      this.spaceButton.active = show;

      localStorage["showSpace"] = show;
    }
  },

  created: function ()
  {
    this.spaceButton.canvas = document.createElement("canvas");
    this.spaceButton.canvas.setAttribute("id", this.spaceButton.canvas_id);
    document.body.appendChild(this.spaceButton.canvas);

    this.spaceButton.space = new FlyingThroughTheSpace("#" + this.spaceButton.canvas_id, {
      speed: 0.025,
      count: 300,
      background: commonData.pageBackgroundColor,
      experimental: false
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