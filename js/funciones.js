
function timer(time,update,complete) {
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now <= 0) {
            clearInterval(interval);
            complete();
        }
        else update(Math.floor(now/1000));
    },100);
}


function ceroIzquierda(valor, largo) {
  if(valor.length >= largo){
    return valor;
  }else{
    let cadena = '';
    for (let i = valor.length; i < largo; i++) {
        cadena += '0';
    }
    return cadena+valor;
  }
}

/*==========================================================================*/
function format_num(input,nombre) {
  long=document.getElementById(nombre).value;
  contador=long.length;
  if(contador==4 || contador==8){
      var num = input.value.replace(/\-/g,'');//Elimina todo que no sea un punto
    if(!isNaN(num)){
      num = num.toString().split('').join('').replace(/(?=\d*\-?)(\d{3})/g,'$1-');// convierte a string y cada 3 caracter agrega un punto
      num = num.split('').join('').replace(/^[\-]/,'');
      input.value = num;// va remplazando en el input su valor con el separador de miles
    }else{
      input.value = input.value.replace(/[^\d\-]*/g,'');
    }
  }
}

function separador_Miles(valor,nombre) {
     var num = valor.replace(/\./g,'');//Elimina todo que no sea un punto
     if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');// convierte a string y cada 3 caracter agrega un punto
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      document.getElementById(nombre).value = num;// va remplazando en el input su valor con el separador de miles
     }else{
      document.getElementById(nombre).value = document.getElementById(nombre).value.replace(/[^\d\.]*/g,'');
     }
}

function separador_Mil(valor) {
     var num = valor.replace(/\./g,'');//Elimina todo que no sea un punto
     if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');// convierte a string y cada 3 caracter agrega un punto
      num = num.split('').reverse().join('').replace(/^[\.]/,'');      
     }
     return num;
}


/*==========================================================================*/
function soloNumber(nombre){ 
  document.getElementById(nombre).value = document.getElementById(nombre).value.replace(/[^\d\.]*/g,'');// EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
}

function soloDecimal(e){
  var key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57 || key==8 || (key==46 && e.target.value.indexOf(".") == -1)) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
}

function soloNumeros(e){
  var key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57 || key==8) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
}

function soloLetras(e){
  var key = window.Event ? e.which : e.keyCode
  console.log(key);
  // EL numero 8 es una tecla especial para borrar "BackSpace" el 241 ñ 209 Ñ
  return ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key==8 || key==241 || key==209 || key==225 || key==233 || key==237 || key==243 || key==250 || key==193 || key==201 || key==205 || key==211 || key==218 ) 
}


function soloIP(e){
  var key = window.Event ? e.which : e.keyCode
  // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
  // 46 es el punto "."
  return (key >= 48 && key <= 57 || key==8 || key==46) 
}

function soloNumeroConNegativo(e){
  var key = window.Event ? e.which : e.keyCode
  // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
  // 45 es el punto "."
  return (key >= 48 && key <= 57 || key==8 || key==45) 
}

function soloFactura(e){
  var key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57 || key==8 || key==45) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
}

function soloRuc(e){
  let key = window.Event ? e.which : e.keyCode;
  let array = e.target.value.split('-');
  var verificador;
  if(e.target.value.search("-") > -1){
    verificador = array[1].split('');
    if(verificador.length >= 1){
      return false;
    }
  }

  if(key == 45){
    if(e.target.value.search("-") > -1){      
      return false;
    }
  }

  return (key >= 48 && key <= 57 || key==8 || key==45); // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
}

/*==========================================================================*/
  function format_numero(input) {
    var valor = input.value;
    let array = valor.split('-');
    if(valor.search("-") > -1){
      valor = array[0];
    }
    var num = valor.replace(/\D/g,'')//Elimina todo que no sea un guion
  // var num = valor.replace(/\./g,'');//Elimina todo que no sea un punto
    if(isNaN(num) == false){
      if(isNaN(parseInt(num)) == false){
        num = parseInt(num);
      }else{
        num = (num);
      }
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');// convierte a string y cada 3 caracter agrega un punto
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      if(array.length > 1 ){
        if(array[1] != ''){
          verificador = array[1].split('');
          input.value = num+'-'+verificador[0];
        }else{
          input.value = num+'-';// va remplazando en el input su valor con el separador de miles
        }
        verificador = array[1].split('');
        
      }else{
        input.value = num;// va remplazando en el input su valor con el separador de miles
      }
    }else{      
      if(array.length > 1){
        verificador = array[1].split('');
        input.value = valor.replace(/[^\d\.]*/g,'')+'-'+verificador[0];
      }else{
        input.value = parseInt(valor).toString().replace(/[^\d\.]*/g,'');
      }
    }

  }


  function format_factura(input) {
      var valor = input.value;
      let array = valor.split('-');
      if(valor.search("-") > -1){
        valor = array[0];
      }
      
      var numero = '';

      if(array.length >= 1){
        
        if(array[0].split("").length >= 3 && parseInt(array[0]) == 0){
          input.value = ''; return;
        }else if(array[0].split("").length > 3){
          numero = array[0].substring(0, array[0].length - 1);;
        }else{
          numero = array[0];
        }
      }
      
      if(array.length >= 2){
        if(array[1].split("").length >= 3 && parseInt(array[1]) == 0){
          input.value = numero; return;
        }else if(array[1].split("").length > 3){
          numero += '-'+array[1].substring(0, array[1].length - 1);
        }else{
          numero += '-'+array[1];
        }
      }
      
      if(array.length == 3){
        if(array[2].split("").length >= 7 && parseInt(array[2]) == 0){
          input.value = numero; return;
        }else if(array[2].split("").length > 7){
          numero += '-'+array[2].substring(0, array[2].length - 1);;
        }else{
          numero += '-'+array[2];
        }
      }

      input.value = numero;
  }

  function quitarSeparador(valor) {
    return valor.replace(/\D/g,'')//Elimina todo que no sea un guion    
  }

/*==========================================================================*/
//YYYY-MM-DD
function formatear_fecha(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    if(month < 10){
      return (`${year}-0${month}-${day}`);
    }else{
      return (`${year}-${month}-${day}`);
    }
}


function obtenerDia(date) {
  return date.getDate();
}

function obtenerMes(date) {
  return date.getMonth() + 1;
}

function obtenerAnho(date) {
 return date.getFullYear();  
}

  //DD-MM-YYYY
function formatear_fecha2(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  if(month < 10){
    return (`${day}-0${month}-${year}`);
  }else{
    return (`${day}-${month}-${year}`);
  }
}

//YYYY-MM-DD
function sumarDia(date, dias) {
  date.setDate(date.getDate() + dias);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if(day < 10)
    day = '0'+day;

  if(month < 10){
    return (`${year}-0${month}-${day}`);
  }else{
    return (`${year}-${month}-${day}`);
  }
}

//YYYY-MM-DD
function sumarMes(fecha, meses) {
  let date = fecha;
  date.setMonth(date.getMonth()+meses);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if(month < 10){
    return new Date(`${year}-0${month}-0${day} 00:00:00`);
  }else{
    return new Date(`${year}-${month}-0${day} 00:00:00`);
  }
}

//YYYY-MM-DD
function restarMes(date, meses) {
  let fecha = date;
  fecha.setMonth(fecha.getMonth() - meses);
  return fecha;
}

/*==========================================================================*/

function acortarCadena(texto, largo){
  if(texto.length > largo){
    return texto.substring(0, largo)+'...';
  }else{
    return texto;
  }
}


//COOKIE
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function eliminarCookies() {
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}