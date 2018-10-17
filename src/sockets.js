//exporto soquets
module.exports = function (io) {
    let users = {};
    //conectando a socket en tiempo real
    io.on("connection", socket => {
        console.log("Un nuevo usuario se ha conectado");
        
        socket.on("nuevo usuario", (data, cb) =>{
            if(data in users){
             cb(false);
            }else {
                cb(true);
                socket.nickName = data;
                users[socket.nickName] = socket;
                updateNickNames();
            }
        });

        //recibiendo el mensaje de send message RECIBIENDO DATOS DEL SERVIDOR
        socket.on("send message", (data, cb) => {
            //Analizar si tiene un prefijo para detectar mensaje privado 
            var msg = data.trim();

            //si el mensaje es privado 
            if(msg.substr(0, 3) === "/w "){
               msg = msg.substr(3); //despues del indice tres
               const index = msg.indexOf(" "); //encontrando el espacio en blanco
               if(index !== -1){
                   msg.substring(0, index); //existe un texto 
                   var name = msg.substring(0, index); // guardo el texto en una variable
                   var msg = msg.substring(index + 1); // guardando el mensaje
                   if(name in users){
                       users[name].emit("whisper", {
                         msg,
                         nick: socket.nickName
                       }); // Si el usuario esta en la lista de usuarios enviar el mensaje 
                   }  else{
                       cb("Error por favor ingrese un usuario valido");
                   }
                }  else {
                    cb("Error por favor ingresa tú mensaje");
                }

            } else {
                 //Retransmitiendo el mensaje recibido a mis demas usuarios
            io.sockets.emit("new message", {
                msg: data,
                nick: socket.nickName
            });

            }
        });
        socket.on("disconnect", data => {
            if(!socket.nickName) return;
            delete users[sockets.nickName];
            updateNickNames();
        });

        function updateNickNames() {
            io.sockets.emit("users", Object.keys(users));
        }
        
    });
}