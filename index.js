/*creando servidor*/
const express = require("express");

const http = require("http");

// usando websoquets.io despues de instalarlo
 const socketio = require("socket.io");

const app= express();

//usar la app para darsela a socket
const server= http.createServer(app);
//soquet escucha en el servidor creado 
 const io = socketio.listen(server);

io.on("connection", socket => {
    console.log("Un nuevo usuario se ha conectado")
})



//enviando el html en la carpeta public al servidos, ENVIANDO ARCHIVOS ESTATICOS
app.use(express.static("public"));

//definiendo el puero de nuestro servidor EMPEZANDO EL SERVIDOR
app.listen(3000, () => {
    console.log("server on port 3000");
});