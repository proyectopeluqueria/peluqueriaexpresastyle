
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }

    let registrosArray = ajustesArray;


    $(document).ready(function () {
        vaciarCampos();
        cargarTablaArt();
        mostrarDatos();  
        $('#consultTableArticulo').DataTable( {
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
            "lengthMenu":       [[5, -1], [5, "Todos"]],
            "iDisplayLength":     5,
            "responsive":       true,
            "order": [[ 0, "desc" ]],
            columnDefs: [
                { "sClass": "text-end", "aTargets": [ 0, 2, 3 ] },
            ]
        });      
        dataTable();  
    });


    function cargarTablaArt() {
        let plantilla = ``;
        articulosArray.forEach(e => {
            plantilla +=`
            <tr>
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.stock}</td>
                <td>${separador_Mil(e.precio.toString())}</td>
                <td>
                <button type="button" class="btn btn-success" id="btn-check" title='Seleccionar'> Seleccionar </button>
                </td>
            </tr>
            `;
        });
        $('#tbody_articulo').html(plantilla);
    }

    //Botón Nuevo
    $(document).on("click", "#search", function(){
        $('#consultarArticulo').modal('show');
        $("#consultarArticulo").css("z-index", "1500");	 	//Poner el modal encima de otro modal
    });

    //Botón Seleccionar item        
    $(document).on("click", "#btn-check", function () {
        fila = $(this).closest("tr");
        id = (fila.find('td:eq(0)').text()); //capturo el ID
        let data = registroArt(id); 
        if(data != null){
            asignarArticulo(data);
        }
        $('#consultarArticulo').modal('hide');
    });


    function asignarArticulo(data) {
        // idiva = iva;
        $('#id_art').val(data.id);
        $('#nombre').val(data.nombre);  
        $('#existencia').val(data.stock);       
        $('#cantidad').val('1');         
        $( "#cantidad" ).focus();
    }


    function mostrarDatos() {
        $('#example').dataTable().fnDestroy();
        let plantilla = ``;
        let tipo = '';
        
        registrosArray.forEach(e => {
            if(e.tipo == 'S'){
                tipo = 'SALIDA';
            }else{
                tipo = 'ENTRADA';
            }
            plantilla +=`
            <tr>
                <td class="text-right">${e.id}</td>
                <td>${nombreArticulo(e.idarticulo)}</td>
                <td class="text-right">${(e.antes)}</td>
                <td class="text-right">${e.cantidad}</td>
                <td class="text-right">${e.despues}</td>
                <td>${(e.fecha.getDate()+'-'+ceroIzquierda(e.fecha.getMonth().toString(), 2)+'-'+e.fecha.getFullYear())}</td>      
                <td class="text-right">${tipo}</td>   
                <td class="text-right"> <button type="button" id="btn_eliminar" class="btn btn-danger">Eliminar</button>   </td>          
            </tr>
            `;
        });
        $('#tbody_registro').html(plantilla);
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
                { "sClass": "text-end", "aTargets": [ 0, 2, 3, 4 ]},
            ]
        }); 
    }
    

    function registroArt(id) {   
        for (let i = 0; i < articulosArray.length; i++) {
            const e = articulosArray[i];
            if(e.id == id){ 
                return e;
            }
        }           
        return null;
    }
    

    function nombreArticulo(id) {    
        for (let i = 0; i < articulosArray.length; i++) {
            const e = articulosArray[i];
            if(e.id == id){ 
                return e.nombre;
            }
        }           
        return null;
    }


    function obtenerId() {
        let id = 0;
        registrosArray.forEach(e => {
            id = e.id;
        });
        return (id+1);
    }


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
                    alertify.success('Registro eliminado y stock actualizado.');
                    mostrarDatos();
                }  
            }         
        });
    });


    function vaciarCampos() {
        $('#id_art').val('');
        $('#nombre').val('');
        $('#existencia').val('');
        $('#cantidad').val('');
        $('#descripcion').val('');
    }


    $('#btn_guardar').click(function (e) {
        let guardar = true;
        e.preventDefault();
        if($('#id_art').val() == ''){
            alertify.error('Falta el identificador del artículo');
            guardar = false;
            $('#nombre').focus();
        }else if($('#nomrbe').val() == ''){
            alertify.error('Falta el nombre del artículo');
            guardar = false;
            $('#nombre').focus();
        }else if($('#existencia').val() == ''){
            alertify.error('Falta la cantidad del stock del artículo');
            guardar = false;
            $('#existencia').focus();
        }else if($('#cantidad').val() == ''){
            alertify.error('Falta la cantidad a ajustar');
            guardar = false;
            $('#cantidad').focus();
        }else if($('#cantidad').val() > $('#existencia').val() && $('input:radio[name=tipo]:checked').val() == 'S'){
            alertify.error('la cantidad a ajustar no puede ser mayor al stock actual');
            guardar = false;
            $('#cantidad').focus();
        }else if($('#descripcion').val() == ''){
            alertify.error('El motivo del ajuste es obligatorio.');
            guardar = false;
            $('#descripcion').focus();
        }
        
        if(guardar == true){

            let despues =  (parseFloat($('#existencia').val()) + parseFloat($('#cantidad').val()));

            if($('input:radio[name=tipo]:checked').val() == 'S'){
                despues =  (parseFloat($('#existencia').val()) - parseFloat($('#cantidad').val()));
            }

            let registro = {
                id : id,
                idarticulo : $('#id_art').val(),
                antes : $('#existencia').val(),
                cantidad : ($('#cantidad').val()),
                despues : despues,
                fecha : new Date(),
                desc : $('#descripcion').val().toUpperCase(),
                tipo : $('input:radio[name=tipo]:checked').val()
            };
            
            registro.id = obtenerId();
            registrosArray.push(registro);
            alertify.success('Registro insertado satisfactoriamente.');    
            vaciarCampos();     
            mostrarDatos();
        }
    });

    




