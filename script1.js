var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const url_datos =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(url).thren;

let requestJSON = (url) => {
  let promise = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status === 200) {
        let json = JSON.parse(req.responseText);
        resolve(json);
      }
    };
    req.send();
  });
  return promise;
};

requestJSON(url_datos).then((response) => {
  console.log(response);
});
