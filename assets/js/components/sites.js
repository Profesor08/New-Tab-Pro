/**
 * Created by Profesor08 on 14.12.2016.
 */

Vue.component("add-site-dialog", {
  template: "#add-site-dialog",

  data: function ()
  {
    return sitesData;
  },

  methods: {
    addSite: function ()
    {
      this.sites.push(this.options.newSite);
      this.options.newSite = {
        image: '',
        name: '',
        url: ''
      };
      localStorage["webSites"] = JSON.stringify(this.sites);
    }
  },

  created: function ()
  {

    if (localStorage.hasOwnProperty("webSites"))
    {
      this.sites = JSON.parse(localStorage["webSites"]);
    }

    if ('siteSize' in localStorage)
    {
      this.size = parseInt(localStorage["siteSize"]);
    }

    if ('siteBorderColor' in localStorage)
    {
      this.siteBorderColor = localStorage["siteBorderColor"];
    }

    if ('siteBackgroundColor' in localStorage)
    {
      this.siteBackgroundColor = localStorage["siteBackgroundColor"];
    }

    console.log("Add site dialog component loaded.");
  }
});

Vue.component("sites", {
  template: "#sites",

  data: function ()
  {
    return sitesData;
  },

  methods: {
    deleteSite: function (index)
    {
      this.sites.splice(index, 1);
      localStorage["webSites"] = JSON.stringify(this.sites);
    }
  },

  created: function ()
  {
    console.log("Sites component loaded.");
  }
});

Vue.component("site-resize", {
  template: "#site-resize",

  data: function ()
  {
    return sitesData;
  },

  methods: {},

  mounted: function ()
  {
    $("#site-button-size").slider({
      orientation: "horizontal",
      min: 75,
      max: 250,
      value: this.size,
      step: 1,
      slide: (event, ui) =>
      {
        this.size = ui.value;
      },
      change: (event, ui) =>
      {
        localStorage["siteSize"] = ui.value;
      }
    });
  },

  created: function ()
  {
    console.log("Site resize slider component loaded.");
  }
});

Vue.component("sites-button", {
  template: "#sites-button",

  data: function ()
  {
    return sitesData;
  },

  methods: {
    showSites: function (show)
    {
      this.active = show;
      localStorage["showSites"] = show;
    }
  },

  created: function ()
  {
    if ("showSites" in localStorage)
    {
      this.showSites(localStorage["showSites"] == "true");
    }

    console.log("Sites button component loaded.");
  }
});

Vue.component("options-button", {
  template: "#options-button",

  data: function ()
  {
    return sitesData;
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

Vue.component("site-border-color", {
  template: "#site-border-color",

  data: function ()
  {
    return sitesData;
  },

  mounted: function ()
  {

    let data = {
      showAlpha: true,
      color: this.siteBorderColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) =>
      {
        this.siteBorderColor = color.toRgbString();
        localStorage["siteBorderColor"] = this.siteBorderColor;
      }
    };

    $(".site-border-color").spectrum(data);
  },

  created: function ()
  {
    console.log("Site border color component loaded.");
  }
});

Vue.component("site-background-color", {
  template: "#site-background-color",

  data: function ()
  {
    return sitesData;
  },

  mounted: function ()
  {

    let data = {
      showAlpha: true,
      color: this.siteBackgroundColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) =>
      {
        this.siteBackgroundColor = color.toRgbString();
        localStorage["siteBackgroundColor"] = this.siteBackgroundColor;
      }
    };

    $(".site-background-color").spectrum(data);
  },

  created: function ()
  {
    console.log("Site background color component loaded.");
  }
});

Vue.component("page-background-color", {
  template: "#page-background-color",

  data: function ()
  {
    return sitesData;
  },

  mounted: function ()
  {

    let data = {
      showAlpha: true,
      color: this.pageBackgroundColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) =>
      {
        this.pageBackgroundColor = color.toRgbString();
        localStorage["pageBackgroundColor"] = this.pageBackgroundColor;

        color.setAlpha(0.2);
        this.pageBackgroundColorTransparent = color.toRgbString();
        localStorage["pageBackgroundColorTransparent"] = this.pageBackgroundColorTransparent;
      }
    };

    $(".page-background-color").spectrum(data);
  },

  created: function ()
  {

    if ('pageBackgroundColor' in localStorage)
    {
      this.pageBackgroundColor = localStorage["pageBackgroundColor"];
    }

    if ('pageBackgroundColorTransparent' in localStorage)
    {
      this.pageBackgroundColorTransparent = localStorage["pageBackgroundColorTransparent"];
    }

    console.log("Site background color component loaded.");
  }
});