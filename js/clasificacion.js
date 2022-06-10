
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }
    
let registrosArray = [];

$(document).ready(function () {
    registrosArray = getRegistros(2);    
    mostrarDatos();       
    dataTable();   
});


$('#btn_nuevo').click(function (e) {
    e.preventDefault();
    $('#id_registro').val('');
    $('#nombre').val('');
    $('#titulo').text('Nueva Clasificación');
    $('#miModal').modal('show');
    $('#nombre').focus();
});


$(document).on("click", "#btn_editar", function(){		
    let fila = $(this).closest("tr");	        
    let id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
    let nombre = (fila.find('td:eq(1)').text()); //capturo el ID
    $('#id_registro').val(id);
    $('#nombre').val(nombre);
    $('#titulo').text('Actualizar Clasificación');
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
        alertify.error('Falta el nombre de la clasificacion');
        guardar = false;
        $('#nombre').focus();
    }
    
    if(guardar == true){
        let nombre = $('#nombre').val().toUpperCase();
        if(validarNombre(nombre, $('#id_registro').val())) {
            if($('#id_registro').val() == ''){
                //Nuevo Registro
                nuevoRegistro(nombre);
                alertify.success('Registro guardado.');
            }else{
                //actualizar registro
                let registro = {
                    id : $('#id_registro').val(),
                    nombre : nombre
                };
                if(actualizarRegistro(registro)){
                    mostrarDatos();
                    alertify.success('Registro actualizado.');
                }else{
                    alertify.error('Hubo un error inesperado.');
                }
            }
            $('#nombre').val('');
            $('#miModal').modal('hide');
        }else{
            alertify.error('El nombre de la clasificacion ya existe.');
        }
    }
});


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


function nuevoRegistro(nombre){
    let id = getId() + 1;
    let nuevaclasificacion = clasificacionModel(id, nombre);
    
    registrosArray.push(nuevaclasificacion);
    
    mostrarDatos()
}


function actualizarRegistro(registro) {
    for (let i = 0; i < registrosArray.length; i++) {
        const element = registrosArray[i];
        if(element.id == registro.id){
            element.nombre = registro.nombre; 
            return true;
        }
    }
    return false;
}


function mostrarDatos() {
    let etiqueta = '';
    registrosArray.forEach(clasificacion => {
        etiqueta = etiqueta + `
            <tr>
                <td>${clasificacion.id}</td>
                <td>${clasificacion.nombre}</td>
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
    }); 
}



//Preguntar si hay campos cargados
$("#miModal").on('hidden.bs.modal', function () {
    if($('#nombre').val().length > 0){
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

