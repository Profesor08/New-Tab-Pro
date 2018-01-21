/**
 * Created by Profesor08
 */
Vue.component("bookmarks-button", {
  template: '#bookmarks-button',

  data: function () {
    return commonData
  },

  methods: {
    showBookmarksPanel: function () {
      let tl = new TimelineMax();
      let panel = document.querySelector(".bookmarks-panel");

      tl
        .to(panel, 0, {
          left: "50%"
        })
        .to(panel, .5, {
          opacity: 1
        });
    }
  },

  created: function () {

    let bookmarks = new Bookmarks();

    bookmarks.get().then(result => {
      this.bookmarks = bookmarks.order(result, [
        {
          prop: "date",
          order: "desc"
        },
        {
          prop: "name",
          order: "asc"
        },
      ]);
    });

    console.log("Bookmarks button component loaded.");
  }
});


Vue.component("bookmarks-panel", {
  template: '#bookmarks-panel',

  data: function () {
    return commonData
  },

  methods: {
    hidePanel()
    {
      let tl = new TimelineMax();
      let panel = document.querySelector(".bookmarks-panel");

      tl
        .to(panel, .2, {
          opacity: 0
        })
        .to(panel, 0, {
          left: -9999
        });
    },

    dateFormat: function (timestamp) {
      return new Date(timestamp).toLocaleString().substr(0, 10);
    },

    timeFormat: function (timestamp) {
      let time = new Date(timestamp).toLocaleString().substr(12);

      if (time.length < 8)
      {
        return "0" + time;
      }

      return time;
    },

    getFavicon: function (bookmark) {
      return "chrome://favicon/size/24@1x/" + bookmark.url;
    }
  },

  watch: {
    bookmarksSearchQuery: function (query) {
      let bookmarks = new Bookmarks();

      bookmarks.search(query).then(result => {
        this.bookmarks = bookmarks.order(result, [
          {
            prop: "name",
            order: "desc"
          },
          {
            prop: "date",
            order: "asc"
          },
        ]);
      });
    }
  },

  created: function () {
    console.log("Bookmarks panel component loaded.");
  }
});