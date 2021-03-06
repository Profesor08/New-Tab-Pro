class Bookmarks
{
  constructor()
  {
    this.bookmarks = [];
  }

  _get()
  {
    return new Promise((resolve, reject) => {
      let bookmarks = [];

      function parse(nodeList)
      {
        nodeList.forEach(node => {
          if (node.hasOwnProperty("children"))
          {
            parse(node.children);
          }
          else
          {
            bookmarks.push(node);
          }
        });
      }

      chrome.bookmarks.getTree(tree => {
        parse(tree);
        resolve(bookmarks);
      });
    });
  }

  get ()
  {
    return this._get();
  }

  order(data, options)
  {

    function sort(a, b, order)
    {
      if (order === "asc")
      {
        if (a > b)
        {
          return 1;
        }
        if (a < b)
        {
          return -1;
        }
      }

      if (order === "desc")
      {
        if (a < b)
        {
          return 1;
        }
        if (a > b)
        {
          return -1;
        }
      }

      return 0;
    }

    function getSortProperty(name)
    {
      switch (name.toLowerCase())
      {
        case "name":
          return "title";
          break;
        case "date":
          return "dateAdded";
          break;
        default:
          return null;
      }
    }

    return data.sort(function (a, b) {
      return sort(
        a[getSortProperty(options.by)],
        b[getSortProperty(options.by)],
        options.order
      );
    });
  }

  search(query)
  {
    return new Promise((resolve, reject) => {
      this._get().then(result => {
        let bookmarks = [];

        result.forEach(bookmark => {
          if (bookmark.title.search(query) !== -1 || bookmark.url.search(query) !== -1)
          {
            bookmarks.push(bookmark);
          }
        });

        resolve(bookmarks);
      });
    });
  }
}