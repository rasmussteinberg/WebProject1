const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Rasmus Steinberg, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Rasmus Steinberg, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageStart);
	res.write(pageBody);
	res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate()+ "</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5300);