let ImgToDataUrl = {
  
  convert: async function (url) {
    return await new Promise((resolve, reject) => {

      if (url.substr(0, 5).toLowerCase() === "data:") {
        resolve(url);
      }

      try {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let image = new Image();

        image.setAttribute("crossorigin", "true");

        image.addEventListener("load", function () {
          canvas.width = this.width;
          canvas.height = this.height;
          ctx.drawImage(image, 0, 0, this.width, this.height);
          resolve(canvas.toDataURL());
        });

        image.src = url;
      }
      catch(err) {
        reject(err);
      }
    });
  }
  
};