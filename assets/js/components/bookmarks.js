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
        }
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
    },

    toggleFilterMenu: function () {
      if (this.isFilteMenuOpen === false)
      {
        this.openFilterMenu();
      }
      else
      {
        this.closeFilterMenu();
      }
    },

    openFilterMenu: function () {
      let tl = new TimelineMax();

      tl
        .to(this.filterMenu, 0, {
          left: "50%"
        })
        .to(this.filterMenu, .3, {
          opacity: 1
        });

      this.isFilteMenuOpen = true;
    },

    closeFilterMenu: function () {
      let tl = new TimelineMax();

      tl
        .to(this.filterMenu, .3, {
          opacity: 0
        })
        .to(this.filterMenu, 0, {
          left: -9999
        });

      this.isFilteMenuOpen = false;
    },

    startCloseTimeout: function () {
      this.closeTimeout = setTimeout(() => {
        this.closeFilterMenu();
      }, 2000);
    },

    stopCloseTimeout: function () {
      clearTimeout(this.closeTimeout);
    },

    filterBookmarks: function (query) {
      let bookmarks = new Bookmarks();

      bookmarks.search(query).then(result => {
        this.bookmarks = bookmarks.order(result, this.bookmarksFilter);
      });
    },

    getFilterRule: function (name) {
      if (this.bookmarksFilter[0].prop === name)
      {
        return Object.assign({}, this.bookmarksFilter[0]);
      }
      else
      {
        return Object.assign({}, this.bookmarksFilter[1]);
      }
    },

    filterBy: function (order) {

      switch (order)
      {
        case "date-desc":
        {
          let secondRule = this.getFilterRule("name");

          this.bookmarksFilter = [
            {
              prop: "date",
              order: "desc"
            }
          ];

          this.bookmarksFilter.push(secondRule);

          break;
        }
        case "date-asc":
        {
          let secondRule = this.getFilterRule("name");

          this.bookmarksFilter = [
            {
              prop: "date",
              order: "asc"
            }
          ];

          this.bookmarksFilter.push(secondRule);

          break;
        }
        case "name-desc":
        {
          let secondRule = this.getFilterRule("date");

          this.bookmarksFilter = [
            {
              prop: "name",
              order: "desc"
            }
          ];

          this.bookmarksFilter.push(secondRule);

          break;
        }
        case "name-asc":
        {
          let secondRule = this.getFilterRule("date");

          this.bookmarksFilter = [
            {
              prop: "name",
              order: "asc"
            }
          ];

          this.bookmarksFilter.push(secondRule);

          break;
        }
      }

      this.filterBookmarks(this.bookmarksSearchQuery);
      this.saveFilterOrder();
      this.closeFilterMenu();
    },

    filterSelected: function (order) {
      return order === `${this.bookmarksFilter[0].prop}-${this.bookmarksFilter[0].order}`;
    },

    saveFilterOrder: function () {
      localStorage["bookmarksFilter"] = JSON.stringify(this.bookmarksFilter);
    },

    loadFilterOrder: function () {
      if (localStorage.hasOwnProperty("bookmarksFilter"))
      {
        this.bookmarksFilter = JSON.parse(localStorage["bookmarksFilter"]);
      }
      else
      {
        this.bookmarksFilter = [
          {
            prop: "date",
            order: "desc"
          },
          {
            prop: "name",
            order: "asc"
          }
        ];
      }
    }
  },

  watch: {
    bookmarksSearchQuery: function (query) {
      this.filterBookmarks(query);
    }
  },

  mounted: function () {
    this.filterMenu = document.querySelector(".bookmarks-panel .filter .filter-list");
    this.filterContainer = document.querySelector(".bookmarks-panel .filter");
  },

  created: function () {
    this.isFilteMenuOpen = false;
    this.closeTimeout = null;
    this.loadFilterOrder();
    this.filterBookmarks(this.bookmarksSearchQuery);

    chrome.bookmarks.onCreated.addListener(() => {
      this.filterBookmarks(this.bookmarksSearchQuery);
    });

    chrome.bookmarks.onRemoved.addListener(() => {
      this.filterBookmarks(this.bookmarksSearchQuery);
    });

    let filter = document.querySelector(".bookmarks-panel .filter");

    document.body.addEventListener("click", (event) => {
      let isClickOnFilter = element => {
        if (element !== null && element !== undefined)
        {
          if (element.isSameNode(this.filterContainer)) {
            return true;
          }
          else {
            return isClickOnFilter(element.parentNode);
          }
        }

        return false;
      };

      if (!isClickOnFilter(event.target))
      {
        this.closeFilterMenu();
      }
    });

    console.log("Bookmarks panel component loaded.");
  }
});