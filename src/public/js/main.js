//ejecutando socket

$(function () {
    
    const socket = io();
    //obteniendo los elementos del DOM desde la interface

     const $messageForm = $("#message-form");
     const $messageBox= $("#message");
     const $chat = $("#chat");

     /*obteniendo DOM de los elementos para el nickNameForm*/
     const $nickForm = $("#nickForm");
     const $nickError = $("#nickError");
     const $nickName = $("#nickName");
     
     const $users = $("#usersNames");
     
     $nickForm.submit(e => {
         e.preventDefault();
         socket.emit("nuevo usuario", $nickName.val(), data => {
              if(data){
                $("#logIn").hide();
                $("#contentWrap").show();
              }else {
                $nickError.html(
                `<div class="alert alert-danger">
                  El nombre de usuario ya Existe.
                </div>
                `);   
              }
              $nickName.val("");
         });
     });

     //Capturando eventos y capturando los datos del form
     $messageForm.submit( e => {
       e.preventDefault();
       socket.emit("send message", $messageBox.val(), data => {
         $chat.append(`<p class="error">${data} </p>`)
       });
       $messageBox.val(" ");
       
     }); 

     //recibiendo el new message
     socket.on("new message", function(data){
       $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>' );
     });
    
     socket.on("users", data => {
      let html = "";
      for(let i=0; i < data.length; i++ ){
          html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
      }
      $users.html(html);
  });
  //escuchando el evento whisper

  socket.on("whisper", data =>{
    $chat.append(`<p class="whisper"><b>${data.nick}:</b>${data.msg}</p>`)
  });
})