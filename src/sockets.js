//exporto soquets
module.exports = function (io) {
    //conectando a socket en tiempo real
    io.on("connection", socket => {
        console.log("Un nuevo usuario se ha conectado");
    });
}