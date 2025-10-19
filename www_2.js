const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const dateET = require("./src/dateTimeET");

const textRef = "txt/vanasonad.txt";
const pageBanner = '<img src="/vp_banner_2025_AA.jpg" alt="Kursuse banner">';
const hobbyImage = '<img src="/hobi.jpg" alt="Pilt hobist">';
const pageLink = '\n\t<nav><a href="/">Avaleht</a> | <a href="/vanasonad">Vanasõnad</a> | <a href="/hobid">Hobid</a></nav>\n\t<hr>';
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Rasmus Steinberg, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Rasmus Steinberg, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function (req, res) {
  console.log("Request: " + req.url);
  let currentUrl = url.parse(req.url, true);
  console.log("Parsed: " + currentUrl.pathname);

  // Avaleht
  if (currentUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(pageStart);
    res.write(pageBanner);
    res.write(pageBody);
    res.write(pageLink);
    res.write(
      "\n\t<p>Täna on " +
        dateET.fullDate() +
        ", " +
        dateET.weekDay() +
        ", " +
        dateET.partOfDay() +
        ".</p>"
    );
    res.write(pageEnd);
    return res.end();
  }

  // Vanasõnad
  else if (currentUrl.pathname === "/vanasonad") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.readFile(textRef, "utf8", function (err, data) {
      res.write(pageStart);
      res.write(pageBanner);
      res.write(pageBody);
      res.write(pageLink);
      res.write(
        "\n\t<p>Täna on " +
          dateET.fullDate() +
          ", " +
          dateET.weekDay() +
          ", " +
          dateET.partOfDay() +
          ".</p>"
      );

      if (err) {
        res.write("<p>Ei suutnud vanasõnu lugeda.</p>");
        res.write(pageEnd);
        return res.end();
      }

      const items = String(data || "")
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);

      if (items.length === 0) {
        res.write("<p>(Vanasõnu ei leitud)</p>");
        res.write(pageEnd);
        return res.end();
      }

      const randomOne = items[Math.floor(Math.random() * items.length)];
      res.write("\n\t<h2>Loositud vanasõna</h2>");
      res.write("\n\t<p>" + randomOne + "</p>");

      res.write("\n\t<h2>Kõik vanasõnad</h2>");
      res.write("\n\t<ol>");
      for (const s of items) {
        res.write("\n\t\t<li>" + s + "</li>");
      }
      res.write("\n\t</ol>");

      res.write(pageEnd);
      return res.end();
    });
  }

  // Hobid
  else if (currentUrl.pathname === "/hobid") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(pageStart);
    res.write(pageBanner);
    res.write(pageBody);
    res.write(pageLink);
    res.write(
      "\n\t<p>Täna on " +
        dateET.fullDate() +
        ", " +
        dateET.weekDay() +
        ", " +
        dateET.partOfDay() +
        ".</p>"
    );
    res.write(
      '<p>Minu lemmik hobi on <a href="https://nba.com/">NBA vaatamine</a> ja <a href="https://www.spotify.com/">muusika kuulamine</a>.</p>'
    );
    res.write(hobbyImage);
    res.write(pageEnd);
    return res.end();
  }

  // Pilt 1
  else if (currentUrl.pathname === "/hobi.jpg") {
    const filePath = path.join(__dirname, "images", "hobi.jpg");
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Pilti ei leitud");
      }
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      return res.end(data);
    });
  }

  // Pilt 2
  else if (currentUrl.pathname === "/vp_banner_2025_AA.jpg") {
    const filePath = path.join(__dirname, "images", "vp_banner_2025_AA.jpg");
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Pilti ei leitud");
      }
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      return res.end(data);
    });
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Error 404");
  }
}).listen(5332);

console.log("Server alive");
