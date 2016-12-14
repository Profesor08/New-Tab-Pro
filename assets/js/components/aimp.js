/**
 * Created by Profesor08 on 14.12.2016.
 */
Vue.component("aimp", {
  template: "#aimp",

  data: function ()
  {
    return {
      show: false
    }
  },

  created: function ()
  {
    console.log("Aimp component loaded.");
  }
});