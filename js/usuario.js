
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }
    let registroArray = usuariosArray;

    $(document).ready(function () { 
        cargarRol(); 
        mostrarDatos();      
        dataTable();   
    });


    function cargarRol() {
        $('#idrol').find('option').remove();
        $('#idrol').append('<option value="0">Seleccione un Rol*</option>');
        rolArray.forEach(v => {
            $('#idrol').append('<option value="' + v.id + '">' + v.nombre + '</option>');
        });
    }


    function nombreRol(id) {
        for (let i = 0; i < rolArray.length; i++) {
            const e = rolArray[i];
            if(id == e.id){
                return e.nombre;
            }
        }
        return '';
    }


    function mostrarDatos() {
        let etiqueta = '';
        registroArray.forEach(e => {
            etiqueta +=`
            <tr>
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.usuario}</td>
                <td>${nombreRol(e.idrol)}</td>
                <td>
                    <button type="button" id="btn_editar" class="btn btn-primary">Editar</button>
                    <button type="button" id="btn_clave" title="Reestablecer contraseña" class="btn btn_secundario">Contr.</button>
                    <button type="button" id="btn_eliminar" class="btn btn-danger">Eliminar</button>   
                </td>
            </tr>
            `;
        });

        $('#cuerpo_tabla').html(etiqueta); 
    }


    function dataTable() {
        $('#example').dataTable().fnDestroy();
        $('#example').DataTable( {
            "language": {
                "decimal": "",
                "emptyTable": "No existen datos en la tabla",
                "info": "Se encontraron _TOTAL_ registro/s",
                "infoEmpty": "No existen registros!",
                "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                "infoPostFix": "",
                "thousands": ".",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "No se ha encontrado ningún registro!",
                "paginate": {
                    "first":      ">|",
                    "last":       "|<",
                    "next":       ">>",
                    "previous":   "<<"
                },
                "aria": {
                "sortAscending":  ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente",
                "sort": "descending"
                },
                "responsive":       true,
            },
            "lengthMenu":       [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
            "iDisplayLength":     5,
            "responsive":       true,
            "order": [[ 0, "desc" ]],
            columnDefs: [
                { "sClass": "text-end", "aTargets": [ 0 ] },
            ]
        }); 
    }


    function tiene_numeros(texto, cant){
        let numeros ="0123456789";
        let cont = 0;
        for(i=0; i<texto.length; i++){
            numeros.indexOf(texto.charAt(i),0);
            if (numeros.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }
        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    } 

    

    function tiene_minusculas(texto, cant){
        let cont = 0;
        let letras="abcdefghyjklmnñopqrstuvwxyz";
        for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    } 

    

    function tiene_mayusculas(texto, cant){
        let cont = 0;
        let letras="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    }

    

    function tiene_caracter_especial(texto, cant){
        let cont = 0;
        let mayuscula="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        let minuscula="abcdefghyjklmnñopqrstuvwxyz";
        let numeros ="0123456789";
        
        for(i=0; i<texto.length; i++){
            if (mayuscula.indexOf(texto.charAt(i),0) == -1 && minuscula.indexOf(texto.charAt(i),0) == -1  && numeros.indexOf(texto.charAt(i),0) == -1 ){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    }


    function alfanumerico(pass) {        
        if(tiene_numeros(pass, 2) == true && tiene_minusculas(pass, 2) == true && tiene_mayusculas(pass, 2) == true && tiene_caracter_especial(pass, 2) == true){
            return true;
        }else{
            return false;
        }
    }


    function obtenerRegistro(id) {    
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.id == id){ 
                return e;
            }
        }   
        return null;
    }


    function obtenerId() {
        let id = 0;
        registroArray.forEach(e => {
            id = e.id;
        });
        return (id+1);
    }
    

    function validarUsuario(usuario) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(usuario == e.usuario && e.id != id){                
                return 0;
            }
        }
        return 1;
    }
    

    function validarNombre(nombre) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(nombre == e.nombre && e.id != id){                
                return 0;
            }
        }
        return 1;
    }
    

    function validarCorreo(correo) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(correo == e.correo && e.id != id){                
                return 0;
            }
        }
        return 1;
    }


    function actualizarRegistro(data) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(data.id == e.id){
                e.nombre = data.nombre;
                e.telefono = data.telefono;
                e.correo = data.correo;
                e.usuario = data.usuario;
                e.idrol = data.idrol;
                mostrarDatos();
                return 1;
            }
        }
        return 0;
    }


    function actualizarClave(data) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(data.id == e.id){                
                e.password = data.password;
                mostrarDatos();
                return 1;
            }
        }
        return 0;
    }

    function vaciarCampos() {        
        $('#nombre').val('');    
        $('#telefono').val('');    
        $('#correo').val('');    
        $('#idrol').val('0');    
        $('#usuario').val(''); 
        $('#password').val(''); 
        $('#password2').val('');
    }

    $('#btn_nuevo').click(function (e) {
        e.preventDefault();
        id = 0;
        $('#id_registro').val('');
        vaciarCampos();
        $('#titulo').text('Nuevo Usuario');
        $('#panel-usuario').show();
        $('#miModal').modal('show');
        setTimeout(function () {
            $("#nombre").focus();	
        }, 500);	
    });


    $(document).on("click", "#btn_clave", function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
        
        $('#miModal2').modal('show');
        setTimeout(function () {
            $("#password_clave").focus();	
        }, 500);
    });


    $('#btn_guardar_clave').click(function (e) {
        e.preventDefault();                

       if($('#password_clave').val().length === 0 && id > 0){        
            alertify.error('Campo vacio, complete con la contraseña.');
            $('#password_clave').focus();
        }else if($('#password_clave').val().length < 8 && id > 0){
            alertify.error('Contraseña corta, mínimo 8 caracter.');
            $('#password_clave').focus();
        }else if(alfanumerico($('#password_clave').val()) == false && id > 0){
            alertify.error('Contraseña debil, mínimo 2 caracteres alfabéticos y con 2 numéricos, 2 minúsculas, 2 mayúsculas y 2 caracteres especiales.');
            $('#password_clave').focus();
        }else if($('#password_clave').val() != $('#password2_clave').val() && id > 0){
            alertify.error('Las contraseñas no coinciden.');
            $('#password2_clave').focus();
        }else{
                                    
            let postData = {
                id : id,
                password : $('#password_clave').val(),
            };
            actualizarClave(postData);   
            alertify.success('Contraseña reestablecido satisfactoriamente.');           
                           
            $('#miModal2').modal('hide');   
            
        }
    });


    $(document).on("click", "#btn_editar", function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
        let data = obtenerRegistro(id); 
        if(data != null){
            $("#nombre").val(data.nombre);
            $("#telefono").val(data.telefono);
            $("#correo").val(data.correo);
            $("#usuario").val(data.usuario);
            $("#idrol").val(data.idrol);
            $("#titulo-registro").text('Editar Usuario');
            $('#panel-usuario').hide();
            $('#miModal').modal('show');
            setTimeout(function () {
                $("#nombre").focus();	
            }, 500);	
        }         
    });


    $(document).on("click", "#btn_eliminar", function(){		
        let fila = $(this).closest("tr");	        
        let id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
        
        Swal.fire({
            title: 'Esta seguro de borrar este registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                let pos = -1;
                for (let i = 0; i < registroArray.length; i++) {
                    const element = registroArray[i];
                    if(id == element.id){
                        pos = i; break;
                    }
                }
                if(pos > -1){
                    registroArray.splice(pos, 1);
                    alertify.success('Registro eliminado');
                    mostrarDatos();
                }  
            }     
        });
    });



    $('#btn_guardar').click(function (e) {
        e.preventDefault();
        let exito = true;
                
        if($('#nombre').val().length === 0){
            alertify.error('Campo vacio, complete con el nombre.');
            $('#nombre').focus();
        }else if($('#telefono').val().length === 0){
            alertify.error('Campo vacio, complete con el número de teléfono.');
            $('#telefono').focus();
        }else if($('#correo').val().length === 0){
            alertify.error('Campo vacio, complete con la dirección de correo.');
            $('#correo').focus();
        }else if($('#idrol').val().length === 0){
            alertify.error('Seleccione el rol del usuario.');
            $('#idrol').focus();
        }else if($('#usuario').val().length === 0 && id < 1){
            alertify.error('Campo vacio, complete con el usuario.');
            $('#usuario').focus();
        }else if($('#usuario').val().length  < 5 && id < 1){
            alertify.error('El usuario es demasiado corto, mínimo 5 caracter.');
            $('#usuario').focus();
        }else if($('#password').val().length === 0 && id < 1){
            alertify.error('Campo vacio, complete con la contraseña.');
            $('#password').focus();
        }else if($('#password').val().length < 8 && id < 1){
            alertify.error('Contraseña corta, mínimo 8 caracter.');
            $('#password').focus();
        }else if(alfanumerico($('#password').val()) == false && id < 1){
            alertify.error('Contraseña debil, mínimo 8 caracteres con 2 numéricos.');
            $('#password').focus();
        }else if($('#password').val() != $('#password2').val() && id < 1){
            alertify.error('Las contraseñas no coinciden.');
            $('#password2').focus();
        }else{
            if(validarNombre($('#nombre').val().toUpperCase())){
                if(validarCorreo($('#correo').val().toLowerCase())){
                    if(validarUsuario($('#usuario').val())){
                        if(id < 1){
                            let postData = {
                                id : id,
                                nombre : $('#nombre').val().toUpperCase(),
                                telefono : $('#telefono').val(),
                                correo : $('#correo').val().toLowerCase(),
                                idrol : $('#idrol').val(),
                                usuario : $('#usuario').val(),
                                password : $('#password').val()
                            };
                            postData.id = obtenerId();                                             
                            registroArray.push(postData);
                            alertify.success('Registro insertado satisfactoriamente.');                
                        }else{
                            let postData = {
                                id : id,
                                nombre : $('#nombre').val(),
                                telefono : $('#telefono').val(),
                                correo : $('#correo').val(),
                                idrol : $('#idrol').val(),
                                usuario : $('#usuario').val(),
                            };
                            actualizarRegistro(postData);   
                            alertify.success('Registro actualizado satisfactoriamente.');           
                        }         
                        
                        if(exito){      
                            vaciarCampos();          
                            $('#miModal').modal('hide');                            
                            mostrarDatos(); 
                        }
                    }else{
                        alertify.error('El usuario ya existe.');
                        exito = false;
                        $('#usuario').focus();
                    }
                }else{
                    alertify.error('El correo ya existe.');
                    exito = false;
                    $('#correo').focus();
                }
            }else{
                alertify.error('El Nombre ya existe.');
                exito = false;
                $('#nombre').focus();
            }
        }
    });




//Preguntar si hay campos cargados
$("#miModal").on('hidden.bs.modal', function () {
    if($('#nombre').val().length > 0 || $('#telefono').val().length > 0 || $('#correo').val() != 0 || $('#usuario').val() != 0){
        Swal.fire({
            title: 'Esta seguro de cerrar esta ventana?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar',            
          }).then((result) => {
            if (result.isConfirmed) {
                
            }else{
                $('#miModal').modal('show');
            }
        });           
    }        
});