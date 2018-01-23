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
    },

    showBookmarkMenu: function (bookmark, event) {

      this.selectedBookmark = bookmark;
      this.activeBookmarkMenuButton = event.target;

      let x = event.x - event.offsetX - (window.innerWidth - this.bookmarkPanel.offsetWidth) / 2;
      let y = event.y - event.offsetY;

      if (y + this.bookmarkMenu.offsetHeight + 32 > window.innerHeight)
      {
        y = window.innerHeight - this.bookmarkMenu.offsetHeight - 32;
      }

      new TimelineMax()
        .to(this.bookmarkMenu, 0, {
          left: x,
          top: y
        })
        .fromTo(this.bookmarkMenu, .3, {
          opacity: 0
        }, {
          opacity: 1
        });

      clearTimeout(this.autoCloseBookmarkMenu);

      this.autoCloseBookmarkMenu = setTimeout(() => {
        this.closeBookmarkMenu();
      }, 3300);
    },

    closeBookmarkMenu: function () {
      new TimelineMax()
        .to(this.bookmarkMenu, .3, {
          opacity: 0
        })
        .to(this.bookmarkMenu, 0, {
          left: -9999
        });
    },

    copyBookmarkUrl: function () {
      Utils.copyToClipboard(this.selectedBookmark.url);
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
    this.bookmarkMenu = document.querySelector(".bookmarks-panel .bookmark-menu");
    this.bookmarkPanel = document.querySelector(".bookmarks-panel");

    Utils.clickOutOfElement(this.filterContainer, () => {
      this.closeFilterMenu();
    });

    Utils.mouseleaveTimeout(this.filterContainer, 2000, () => {
      this.closeFilterMenu();
    });

    Utils.clickOutOfElement(this.bookmarkMenu, (event) => {
      if (!event.target.isSameNode(this.activeBookmarkMenuButton))
      {
        this.closeBookmarkMenu();
      }
    });

    Utils.mouseleaveTimeout(this.bookmarkMenu, 2000, () => {
      this.closeBookmarkMenu();
    });

    this.bookmarkMenu.addEventListener("mouseenter", () => {
      clearTimeout(this.autoCloseBookmarkMenu);
    })
  },

  created: function () {
    this.isFilteMenuOpen = false;
    this.selectedBookmark = null;
    this.activeBookmarkMenuButton = null;
    this.autoCloseBookmarkMenu = 0;
    this.loadFilterOrder();
    this.filterBookmarks(this.bookmarksSearchQuery);

    chrome.bookmarks.onCreated.addListener(() => {
      this.filterBookmarks(this.bookmarksSearchQuery);
    });

    chrome.bookmarks.onRemoved.addListener(() => {
      this.filterBookmarks(this.bookmarksSearchQuery);
    });

    console.log("Bookmarks panel component loaded.");
  }
});