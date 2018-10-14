/*creando servidor*/
const express = require("express");

const http = require("http");

const path = require("path");

// usando websoquets.io despues de instalarlo
 const socketio = require("socket.io");

const app= express();

//usar la app para darsela a socket
const server= http.createServer(app);
//soquet escucha en el servidor creado 
 const io = socketio.listen(server);

 //settings
 app.set("port", process.env.PORT || 3000);

 //requiero de sockets
require("./sockets")(io);

//enviando el html en la direccion que queremos, ENVIANDO ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "public")));

//definiendo el puero de nuestro servidor EMPEZANDO EL SERVIDOR
server.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
});

