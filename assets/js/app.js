/**
 * Created by Profesor08 on 10.12.2016.
 */

var app = new Vue({
  el: "#app",

  data: {},

  methods: {},

  created: function ()
  {

  },

  mounted: function ()
  {
    $("#site-button-size").slider({
      orientation: "horizontal",
      range: false,
      min: 0,
      max: 1,
      value: 0,
      step: .01,
      animate: true
    });

    $("#site-columns-count").slider({
      orientation: "horizontal",
      range: false,
      min: 0,
      max: 1,
      value: 0,
      step: .01,
      animate: true
    });

  }
});
