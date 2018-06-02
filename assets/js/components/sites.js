/**
 * Created by Profesor08 on 14.12.2016.
 */

Vue.component("add-site-dialog", {
  template: "#add-site-dialog",

  data: function () {
    return commonData;
  },

  methods: {
    addSite: function () {
      ImgToDataUrl.convert(this.options.newSite.image).then(dataUrl => {
        this.options.newSite.image = dataUrl;

        this.sites.push(this.options.newSite);

        this.options.newSite = {
          image: '',
          name: '',
          url: ''
        };

        localStorage["webSites"] = JSON.stringify(this.sites);
      });
    }
  },

  created: function () {

    if (localStorage.hasOwnProperty("webSites")) {
      this.sites = JSON.parse(localStorage["webSites"]);
    }

    if ('siteSize' in localStorage) {
      this.size = parseInt(localStorage["siteSize"]);
    }

    if ('siteBorderColor' in localStorage) {
      this.siteBorderColor = localStorage["siteBorderColor"];
    }

    if ('siteBackgroundColor' in localStorage) {
      this.siteBackgroundColor = localStorage["siteBackgroundColor"];
    }

    console.log("Add site dialog component loaded.");
  }
});

Vue.component("edit-site-dialog", {
  template: "#edit-site-dialog",

  data: function () {
    return commonData;
  },

  methods: {
    editSite: function () {
      ImgToDataUrl.convert(this.options.editSite.image).then(dataUrl => {
        this.sites[this.options.editSite.id].name = this.options.editSite.name;
        this.sites[this.options.editSite.id].url = this.options.editSite.url;
        this.sites[this.options.editSite.id].image = dataUrl;
        this.options.editSiteDialog = false;
        this.options.editSite = null;
        localStorage["webSites"] = JSON.stringify(this.sites);
      });
    }
  },

  created: function () {
    console.log("Edit site dialog component loaded.");
  }
});

Vue.component("sites", {
  template: "#sites",

  data: function () {
    return commonData;
  },

  methods: {
    deleteSite: function (index) {
      this.sites.splice(index, 1);
      localStorage["webSites"] = JSON.stringify(this.sites);
    },

    openEditSiteDialog: function (index) {
      this.options.editSite = Object.assign({}, this.sites[index], {id: index});
      this.options.editSiteDialog = true;
    }
  },

  updated: function () {


    if (this.options.active && this.active) {
      let config = {
        align: "center",
        animationSpeed: 150,
        gutterX: 10,
        gutterY: 10,
        paddingX: 0,
        paddingY: 0,
        animateOnInit: false
      };

      if (this.sitesGrid !== null) {
        this.sitesGrid.shapeshift(config);
      }
      else {
        this.sitesGrid = $(".sites-grid");

        this.sitesGrid.shapeshift(config);

        this.sitesGrid.on("ss-rearranged", (event) => {
          let arrangedSites = [];

          $(event.currentTarget).children(".site").each((index, element) => {
            let orig = $(element).data("orig");

            if (orig !== undefined) {
              $(element).attr("data-orig", index);

              arrangedSites.push({
                name: this.sites[orig].name,
                url: this.sites[orig].url,
                image: this.sites[orig].image
              });
            }
          });

          localStorage["webSites"] = JSON.stringify(arrangedSites);
        });
      }
    }
    else {
      if (this.sitesGrid !== null) {
        this.sitesGrid.trigger("ss-destroy");
        this.sitesGrid.css("height", "");
        this.sitesGrid = null;
      }
    }

  },

  created: function () {
    console.log("Sites component loaded.");
  }
});

Vue.component("site-resize", {
  template: "#site-resize",

  data: function () {
    return commonData;
  },

  methods: {},

  mounted: function () {
    $("#site-button-size").slider({
      orientation: "horizontal",
      min: 75,
      max: 250,
      value: this.size,
      step: 1,
      slide: (event, ui) => {
        this.size = ui.value;
      },
      change: (event, ui) => {
        localStorage["siteSize"] = ui.value;
      }
    });
  },

  created: function () {
    console.log("Site resize slider component loaded.");
  }
});

Vue.component("sites-button", {
  template: "#sites-button",

  data: function () {
    return commonData;
  },

  methods: {
    showSites: function (show) {
      if (show === false && this.sitesGrid !== null) {
        this.sitesGrid.trigger("ss-destroy");
      }

      this.active = show;

      localStorage["showSites"] = show;
    }
  },

  created: function () {
    if ("showSites" in localStorage) {
      this.showSites(localStorage["showSites"] == "true");
    }

    console.log("Sites button component loaded.");
  }
});

Vue.component("site-border-color", {
  template: "#site-border-color",

  data: function () {
    return commonData;
  },

  mounted: function () {

    let data = {
      showAlpha: true,
      color: this.siteBorderColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) => {
        this.siteBorderColor = color.toRgbString();
        localStorage["siteBorderColor"] = this.siteBorderColor;
      }
    };

    $(".site-border-color").spectrum(data);
  },

  created: function () {
    console.log("Site border color component loaded.");
  }
});

Vue.component("site-background-color", {
  template: "#site-background-color",

  data: function () {
    return commonData;
  },

  mounted: function () {

    let data = {
      showAlpha: true,
      color: this.siteBackgroundColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) => {
        this.siteBackgroundColor = color.toRgbString();
        localStorage["siteBackgroundColor"] = this.siteBackgroundColor;
      }
    };

    $(".site-background-color").spectrum(data);
  },

  created: function () {
    console.log("Site background color component loaded.");
  }
});

Vue.component("page-background-color", {
  template: "#page-background-color",

  data: function () {
    return commonData;
  },

  mounted: function () {

    let data = {
      showAlpha: true,
      color: this.pageBackgroundColor,
      showButtons: false,
      preferredFormat: "hex",
      showInput: true,
      move: (color) => {
        this.pageBackgroundColor = color.toRgbString();
        localStorage["pageBackgroundColor"] = this.pageBackgroundColor;

        color.setAlpha(0.2);
        this.pageBackgroundColorTransparent = color.toRgbString();
        localStorage["pageBackgroundColorTransparent"] = this.pageBackgroundColorTransparent;
      }
    };

    $(".page-background-color").spectrum(data);
  },

  created: function () {

    if ('pageBackgroundColor' in localStorage) {
      this.pageBackgroundColor = localStorage["pageBackgroundColor"];
    }

    if ('pageBackgroundColorTransparent' in localStorage) {
      this.pageBackgroundColorTransparent = localStorage["pageBackgroundColorTransparent"];
    }

    console.log("Site background color component loaded.");
  }
});