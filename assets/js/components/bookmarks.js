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
      let panelWrapper = document.querySelector(".bookmarks-wrapper");
      let panel = document.querySelector(".bookmarks-panel");

      tl
        .set(panelWrapper, {
          left: 0
        })
        .to(panel, .5, {
          opacity: 1
        });
    }
  },

  created: function () {
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
      let panelWrapper = document.querySelector(".bookmarks-wrapper");
      let panel = document.querySelector(".bookmarks-panel");

      tl
        .to(panel, .2, {
          opacity: 0
        })
        .set(panelWrapper, {
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

    filterBy: function (by, order) {

      this.bookmarksFilter = {
        by: by,
        order: order
      };

      this.filterBookmarks(this.bookmarksSearchQuery);
      this.saveFilterOrder();
      this.closeFilterMenu();
    },

    filterSelected: function (order) {
      return order === `${this.bookmarksFilter.by}-${this.bookmarksFilter.order}`;
    },

    saveFilterOrder: function () {
      localStorage["bookmarksFilter"] = JSON.stringify(this.bookmarksFilter);
    },

    loadFilterOrder: function () {
      if (localStorage.hasOwnProperty("bookmarksFilter"))
      {
        this.bookmarksFilter = JSON.parse(localStorage["bookmarksFilter"]);
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

    getRemovedBookmarks: function () {
      if (localStorage.hasOwnProperty("removedBookmarks"))
      {
        return JSON.parse(localStorage["removedBookmarks"]);
      }

      return [];
    },

    saveRemovedBookmarks: function (bookmarks) {
      localStorage["removedBookmarks"] = JSON.stringify(bookmarks);
    },

    addBookmarkToRemovedList: function (bookmark) {
      let removed = this.getRemovedBookmarks();

      removed.push({
        dateAdded: bookmark.dateAdded,
        id: bookmark.id,
        index: bookmark.index,
        parentId: bookmark.parentId,
        title: bookmark.title,
        url: bookmark.url
      });

      this.saveRemovedBookmarks(removed);
    },

    copyBookmarkUrl: function () {
      Utils.copyToClipboard(this.selectedBookmark.url);
      this.closeBookmarkMenu();
    },

    deleteBookmark: function () {
      let index = this.bookmarks.indexOf(this.selectedBookmark);

      if (index !== -1)
      {
        chrome.bookmarks.remove(this.selectedBookmark.id, () => {
          this.addBookmarkToRemovedList(this.selectedBookmark);
          this.closeBookmarkMenu();
        })
      }
    },

    openInNewTab: function () {
      chrome.tabs.create({url: this.selectedBookmark.url}, () => {
        this.closeBookmarkMenu();
      });
    },

    openInNewWindow: function () {
      chrome.windows.create({url: this.selectedBookmark.url}, () => {
        this.closeBookmarkMenu();
      });
    },

    openInIncognito: function () {
      chrome.windows.create({
        url: this.selectedBookmark.url,
        "incognito": true
      }, () => {
        this.closeBookmarkMenu();
      });
    },

    restorePreviouslyDeletedBookmark: function () {
      let bookmarks = this.getRemovedBookmarks();

      if (bookmarks.length > 0)
      {
        let bookmark = {
          title: bookmarks[bookmarks.length - 1].title,
          url: bookmarks[bookmarks.length - 1].url
        };

        chrome.bookmarks.create(bookmark);

        bookmarks.splice(bookmarks.length - 1, 1);

        this.saveRemovedBookmarks(bookmarks);
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
    this.bookmarkMenu = document.querySelector(".bookmarks-panel .bookmark-menu");
    this.bookmarkPanel = document.querySelector(".bookmarks-panel");
    let searchInputOutlineLine = document.querySelector(".bookmarks-panel .search-container .bookmark-search-input-container .outline-line");
    let searchInput = document.querySelector(".bookmarks-panel .search-container .bookmark-search-input-container input");

    searchInput.addEventListener("focus", function () {
      new TimelineMax()
        .fromTo(searchInputOutlineLine, .2, {
          width: 0
        }, {
          width: "100%"
        })
    });

    searchInput.addEventListener("blur", function () {
      new TimelineMax()
        .to(searchInputOutlineLine, 0, {
          width: 0
        })
    });

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