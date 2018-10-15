//exporto soquets
module.exports = function (io) {
    let nickName = [];
    //conectando a socket en tiempo real
    io.on("connection", socket => {
        console.log("Un nuevo usuario se ha conectado");
        
        socket.on("nuevo usuario", (data, cb) =>{
            if(nickName.indexOf(data)!= -1){
             cb(false);
            }else {
                cb(true);
                socket.nickName = data;
                nickName.push(socket.nickName);
                updateNickNames();
            }
        });

        //recibiendo el mensaje de send message RECIBIENDO DATOS DEL SERVIDOR
        socket.on("send message", data => {
           //Retransmitiendo el mensaje recibido a mis demas usuarios
            io.sockets.emit("new message", {
                msg: data,
                nick: socket.nickName
            });
        });
        socket.on("disconnect", data => {
            if(!socket.nickName) return;
            nickName.splice(nickName.indexOf(socket.nickName), 1);
            updateNickNames();
        });

        function updateNickNames() {
            io.sockets.emit("users", nickName);
        }
        
    });
}