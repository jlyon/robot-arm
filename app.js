var motion_dir = '/tmp/motion';



var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// Public files
app.use(express.static(__dirname + '/public'));

server.listen(3000);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


// Watch the motion dir and return the latest image
/*var watch = require('watch');
var fs = require('fs');
var currentImage = null;
watch.createMonitor(motion_dir, function (monitor) {
  //monitor.files['/home/mikeal/.zshrc'] // Stat object for my zshrc.
  monitor.on("created", function (f, stat) {
    // Handle file changes
    console.log(f);
    console.log(stat);
    currentImage = f;
  });
});

// routing
app.get('/camera', function (req, res) {
  if (currentImage != null) {
    var img = fs.readFileSync(currentImage);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  }
  return res.end();
});*/



// Socket.io logic
io.sockets.on('connection', function (socket) {

  // when the client emits 'update', this listens and executes
  socket.on('update', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    //io.sockets.emit('updatechat', socket.username, data);
    //motor_move(data);
    console.log(data);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
  });
  
});


