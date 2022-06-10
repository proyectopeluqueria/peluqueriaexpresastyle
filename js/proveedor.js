
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }
let registrosArray = proveedorArray;


$(document).ready(function () {    
    mostrarDatos();       
    dataTable();   
});


function mostrarDatos() {
    let etiqueta = '';
    let ciruc = '';
    registrosArray.forEach(e => {   
        ciruc = separador_Mil(e.ci.toString());
        if(e.verificador != ''){
            ciruc = separador_Mil(e.ci.toString())+'-'+e.verificador;
        }     
        etiqueta = etiqueta + `
        <tr>
            <td>${e.id}</td>
            <td>${separador_Mil(ciruc)}</td>
            <td>${e.nombre}</td>
            <td>${e.telefono}</td>
            <td>
                <button type="button" id="btn_editar" class="btn btn-primary">Editar</button>
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
            { "sClass": "text-end", "aTargets": [ 0, 1, 3 ] },
        ]
    }); 
}


function obtenerRegistro(id) {    
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(e.id == id){ 
            return e;
        }
    }   
    return null;
}


function obtenerId() {
    let id = 0;
    registrosArray.forEach(element => {
        id = element.id;
    });
    return id+1;
}


function validarCliente(ci, verificador) {
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(quitarSeparador(ci).toString() == e.ci.toString() && e.verificador == verificador && e.id != id){                
            return 0;
        }
    }
    return 1;
}


function validarCorreo(correo) {
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(correo == e.correo && e.id != id){                
            return 0;
        }
    }
    return 1;
}


function actualizarRegistro(data) {
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(data.id == e.id){
            e.ci = data.ci;
            e.verificador = data.verificador;
            e.nombre = data.nombre;
            e.telefono = data.telefono;
            e.direccion = data.direccion;
            e.correo = data.correo;
            e.funcionario = data.funcionario;
            mostrarDatos();
            return 1;
        }
    }
    return 0;
}


function borrarRegistro(id) {
    let i = 0;
    pos = -1;
    while(i < registrosArray.length){
        if(registrosArray[i].id == id){
            pos = i;break;
        }
        i++;
    }
    registrosArray.splice(pos, 1);
    alertify.success('Registro eliminado satisfactoriamente.'); 
    cargarTabla();
}


$('#btn_nuevo').click(function (e) {
    id = 0;
    e.preventDefault();
    $('#ci').val('');
    $('#verificador').val('');
    $('#nombre').val('');
    $('#correo').val('');
    $('#telefono').val('');
    $('#direccion').val('');
    $('#funcionario').val('');

    $('#titulo').text('Nuevo Proveedor');
    $('#miModal').modal('show');
    $('#ci').focus();


});


//Botón cancelar
$(document).on("click", "#btn-cancel", function(){			        
    id = 0;	            
    $("#titulo").text('Nuevo Proveedor');
    $('#ci').val('');
    $('#Verificador').val('');
    $('#nombre').val('');
    $('#correo').val('');
    $('#telefono').val('');
    $('#miModal').modal('hide');	
});



$(document).on("click", "#btn_editar", function(){
    fila = $(this).closest("tr");	        
    id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
    let data = obtenerRegistro(id); 
    if(data != null){
        $("#ci").val(separador_Mil(data.ci.toString()));
        $("#verificador").val((data.verificador.toString()));
        $("#nombre").val(data.nombre);
        $("#telefono").val(data.telefono);
        $("#direccion").val(data.direccion);
        $("#correo").val(data.correo);
        $("#funcionario").val(data.funcionario);
        $("#titulo").text('Editar Proveedor');
        $('#miModal').modal('show');
        setTimeout(function () {
            $("#ci").focus();	
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
            for (let i = 0; i < registrosArray.length; i++) {
                const element = registrosArray[i];
                if(id == element.id){
                    pos = i; break;
                }
            }
            if(pos > -1){
                registrosArray.splice(pos, 1);
                alertify.success('Registro eliminado');
                mostrarDatos();
            }  
        }         
      });
});



$('#btn_guardar').click(function (e) {
    e.preventDefault();
    
    if($('#ci').val().length === 0){
        alertify.error('Campo vacio, complete con el CI.');
        $('#ci').focus();
    }else if($('#nombre').val().length === 0){
        alertify.error('Campo vacio, complete con el nombre.');
        $('#nombre').focus();
    }else if($('#telefono').val().length === 0){
        alertify.error('Campo vacio, complete con el número de teléfono.');
        $('#telefono').focus();
    }else if($('#correo').val().length === 0){
        alertify.error('Campo vacio, complete con la dirección de correo.');
        $('#correo').focus();
    }else if($('#direccion').val().length === 0 && id < 1){
        alertify.error('Campo vacio, complete con el direccion.');
        $('#direccion').focus();
    }else if($('#funcionario').val().length === 0 && id < 1){
        alertify.error('Campo vacio, complete con el funcionario representante.');
        $('#funcionario').focus();
    }else{
        if(validarCliente(quitarSeparador($('#ci').val()), ($('#verificador').val()))){
            if(validarCorreo($('#correo').val().toLowerCase())){
                if(id < 1){
                    let postData = {
                        id : id,
                        ci : quitarSeparador($('#ci').val()),
                        verificador : ($('#verificador').val()),
                        nombre : $('#nombre').val().toUpperCase(),
                        telefono : $('#telefono').val(),
                        correo : $('#correo').val().toLowerCase(),
                        direccion : $('#direccion').val().toUpperCase(),
                        funcionario : $('#funcionario').val().toUpperCase()
                    };
                    postData.id = obtenerId();
                    registrosArray.push(postData);
                    alertify.success('Registro insertado satisfactoriamente.');               
                }else{
                    let postData = {
                        id : id,
                        ci : quitarSeparador($('#ci').val()),
                        verificador : ($('#verificador').val()),
                        nombre : $('#nombre').val().toUpperCase(),
                        telefono : $('#telefono').val(),
                        direccion : $('#direccion').val().toUpperCase(),
                        correo : $('#correo').val(),
                        funcionario : $('#funcionario').val().toUpperCase()
                    };            
                    actualizarRegistro(postData);   
                    alertify.success('Registro actualizado satisfactoriamente.');  
                }        
                $('#ci').val('');
                $('#Verificador').val('');
                $('#nombre').val('');
                $('#correo').val('');  
                $('#telefono').val('');        
                $('#direccion').val('');          
                $('#funcionario').val('');
                $('#miModal').modal('hide');                    
                mostrarDatos();
            }else{
                alertify.error('El correo ya existe.');
                $('#correo').focus();
            }  
        }else{
            alertify.error('El número de CI ya existe.');
            $('#ci').focus();
        }              
    }
});


    //Preguntar si hay campos cargados
    $("#miModal").on('hidden.bs.modal', function () {
        if($('#ci').val().length > 0 || $('#verificador').val().length > 0 || $('#nombre').val().length > 0 || $('#correo').val() != 0 || $('#telefono').val() != 0 || $('#direccion').val() != 0 || $('#funcionario').val() != 0){
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






