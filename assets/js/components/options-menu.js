/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("options-menu", {
  template: "#options-menu",
  data: function ()
  {
    return commonData
  },
  created: function ()
  {
    document.body.addEventListener("click", (e) =>
    {
      for (let i = 0; i < e.path.length; i++)
      {
        if (e.path[i].classList && e.path[i].classList.contains("menu"))
        {
          return;
        }
      }

      if (document.querySelector(".menu").classList.contains("active"))
      {
        this.showMenu = false;
      }
    });

    console.log("Menu component loaded.");
  }
});

Vue.component("options-button", {
  template: "#options-button",

  data: function ()
  {
    return commonData;
  },

  methods: {
    showOptions: function (show)
    {
      this.options.active = show;
    }
  },

  created: function ()
  {
    console.log("Options button component loaded.");
  }
});