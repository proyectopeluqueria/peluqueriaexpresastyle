
$(function (){
  let usuarios = usuariosArray;


  $('#user').keyup(function (e) {
    if (e.keyCode == 13 && $('#user').val().length > 4) {//Si presiona enter
      $('#pass').focus();
    }    
  });

  $('#pass').keyup(function (e) {
    if (e.keyCode == 13 && $('#pass').val().length > 7 && $('#user').val().length > 4) {//Si presiona enter
      $('#enviar').click();
    }    
  });

  
  function validarUsusario(usu, pass){
    for (var i = 0; i < usuarios.length; i++) {
      user = usuarios[i];
      if(user.usuario == usu){
        if(user.password == pass){
          return user;
        }
      }
    }
    return null;
  }


  // Agregar producto al detalle_venta
  $('#enviar').click(function (e) {
    e.preventDefault();
    if($('#user').val().length == 0){
      alertify.error('Falta el usuario.');
      $('#user').focus();
    }else if($('#pass').val().length == 0){
      alertify.error('Falta la contraseña.');
      $('#pass').focus();
    }else {
      let usu = $('#user').val();
      let pass =$('#pass').val();
      let user = validarUsusario(usu, pass);
      if(user != null){
        setCookie('nombre', user.nombre, 1);
        setCookie('telefono', user.telefono, 1);
        setCookie('correo', user.correo, 1);
        setCookie('usuario', usu, 1);
        setCookie('idusuario', user.id, 1);
        setCookie('idrol', user.idrol, 1);
        window.location.href = "./index.html";
      }else{
        alertify.error('Usuario y/o contraseña incorrecta.');
        $('#pass').focus();
      }
    }
  });


});
