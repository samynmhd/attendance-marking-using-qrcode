var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(express.static(__dirname + "/dist"));
app.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    file: '/dist/index.html',
  },
})
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
})
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
