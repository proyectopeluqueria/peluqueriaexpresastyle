
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }
let registrosArray = articulosArray;

$(document).ready(function () {
    registrosArray = getRegistros(3); 
    cargarClasificacion();  
    mostrarDatos();       
    dataTable();   
});


function cargarClasificacion() {
    $('#idclasificacion').find('option').remove();
    $('#idclasificacion').append('<option value="0">Seleccione una Clasificaciòn*</option>');
    clasificacionesArray.forEach(v => {
        $('#idclasificacion').append('<option value="' + v.id + '">' + v.nombre + '</option>');
    });
}


function clasificacionNombre(id) {
    for (let i = 0; i < clasificacionesArray.length; i++) {
        const e = clasificacionesArray[i];
        if(e.id == id){
            return e.nombre;
        }
    }
}

$('#btn_nuevo').click(function (e) {
    e.preventDefault();
    $('#id_registro').val('');
    $('#nombre').val('');
    $('#precio').val('');
    $('#idclasificacion').val('0');
    $('#titulo').text('Nuevo Servicio');
    $('#miModal').modal('show');
    $('#nombre').focus();
});


$(document).on("click", "#btn_editar", function(){		
    let fila = $(this).closest("tr");	        
    let id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
    
    let registro = getServicio(id);

    $('#id_registro').val(id);
    $('#nombre').val(registro.nombre);
    $('#precio').val(registro.precio);
    $('#idclasificacion').val(registro.idclasificacion);
    $('#titulo').text('Actualizar Servicio');
    $('#miModal').modal('show');
    $('#nombre').focus();	   
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
    let guardar = true;
    e.preventDefault();
    if($('#nombre').val() == ''){
        alertify.error('Falta el nombre del servicio');
        guardar = false;
        $('#nombre').focus();
    }else if($('#precio').val() == ''){
        alertify.error('Falta el precio del servicio');
        guardar = false;
        $('#precio').focus();
    }else if($('#idclasificacion').val() == ''){
        alertify.error('Falta la categoria del servicio');
        guardar = false;
        $('#idclasificacion').focus();
    }
    
    if(guardar == true){
        let nombre = $('#nombre').val().toUpperCase();
        let precio = $('#precio').val();
        let stock = 0;
        let idmarca = 1;
        let idclasificacion = $('#idclasificacion').val();

        if(validarNombre(nombre, $('#id_registro').val())) {
            let registro = {
                id : $('#id_registro').val(),
                nombre : nombre,
                precio : precio,
                stock : stock,
                idmarca : idmarca,
                idclasificacion : idclasificacion,
                tipo : "S"
            };

            if($('#id_registro').val() == ''){
                //Nuevo Registro
                registro.id = getId()+1;
                registrosArray.push(registro);    
                mostrarDatos();
                alertify.success('Registro guardado.');
            }else{
                //actualizar registro                
                if(actualizarRegistro(registro)){
                    mostrarDatos();
                    alertify.success('Registro actualizado.');
                }else{
                    alertify.error('Hubo un error inesperado.');
                }
            }
            $('#nombre').val('');
            $('#precio').val('');
            $('#idclasificacion').val('0');
            $('#miModal').modal('hide');
        }else{
            alertify.error('El nombre de la marca ya existe.');
        }
    }
});


function getServicio(id) {
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(e.id == id){
            return e;
        }
    }    
    return null;
}


function validarNombre(nombre, id) {
    for (let i = 0; i < registrosArray.length; i++) {
        const e = registrosArray[i];
        if(e.nombre == nombre && e.id != id){
            return false;
        }
    }    
    return true;
}


function getId() {
    let id = 0;
    registrosArray.forEach(element => {
        id = element.id;
    });
    return id;
}



function actualizarRegistro(registro) {
    for (let i = 0; i < registrosArray.length; i++) {
        const element = registrosArray[i];
        if(element.id == registro.id){
            element.nombre = registro.nombre;
            element.precio = registro.precio;
            element.idclasificacion = registro.idclasificacion; 
            return true;
        }
    }
    return false;
}


function mostrarDatos() {
    let etiqueta = '';
    registrosArray.forEach(registro => {
        if(registro.tipo == 'S'){
            etiqueta = etiqueta + `
            <tr>
                <td>${registro.id}</td>
                <td>${registro.nombre}</td>
                <td>${separador_Mil(registro.precio.toString())}</td>
                <td>${clasificacionNombre(registro.idclasificacion)}</td>
                <td>
                    <button type="button" id="btn_editar" class="btn btn-primary">Editar</button>
                    <button type="button" id="btn_eliminar" class="btn btn-danger">Eliminar</button>                
                </td>
            </tr>
        `;   
        }          
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
            { "sClass": "text-end", "aTargets": [ 0, 2 ] },
        ]
    }); 
}



//Preguntar si hay campos cargados
$("#miModal").on('hidden.bs.modal', function () {
    if($('#nombre').val().length > 0 || $('#precio').val().length > 0 || $('#idclasificacion').val() != 0){
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
