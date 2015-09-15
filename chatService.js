var http = require("http");
var sio = require("socket.io");
var fs = require("fs");
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-type": "text/html"
    });
    res.end(fs.readFileSync("views/chat.html"));
});
server.listen(1337);
var socket = sio.listen(server);
socket.on("connection", function(sockets) {
    //给所有人
    socket.sockets.emit("COM", "connect.....");
    sockets.on("sendMsg", function(topic, msg) {

        //给除了自己以外的
        sockets.broadcast.emit("getMsg", topic, msg);



    });




});
console.log('running at 1337');