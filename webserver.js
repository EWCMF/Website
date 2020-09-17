var http = require('http');
var fs = require('fs');
var path = require('path')

http.createServer(function (req, res) {
  let filePath = req.url;
  if (filePath == "/") {
    filePath = "/index.html";
  }

  filePath = __dirname + filePath;
  let contentType;
  
  let ext = path.extname(filePath);
  switch (ext) {
    case ".html":
      contentType = 'text/html';
      break;
    case ".css":
      contentType = 'text/css'  
      break;
    case ".png":
      contentType = 'image/png'
    case ".jpg":
      contentType = 'image/jpeg'  
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    return res.end();
  });
}).listen(3000, 'localhost', () => {
  console.log("Server running at http://localhost:3000/");
});