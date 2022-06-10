
    if(getCookie('idrol') == '2'){
        window.location.href = "./index.html";
    }
   let registroArray = ventasArray;

    $(document).ready(function () { 
        mostrarDatos();       
        dataTable();   
    });


    function mostrarDatos() {
        let etiqueta = '';
        registroArray.forEach(e => {
            if(e.condicion == 'C, CR'){
                condicion = 'CONTADO';
            }else{
                condicion = 'CRÉDITO';
            }
            etiqueta +=`
            <tr>
                <td>${e.id}</td>
                <td>${e.num_ticket}</td>
                <td>${obtenerCliente(e.idcliente)}</td>
                <td>${e.fecha.getDate()+'/'+ceroIzquierda(e.fecha.getMonth().toString(),2)+'/'+e.fecha.getFullYear()}</td>
                <td>${separador_Mil(e.total.toString())}</td>
                <td>${condicion}</td>
                <td>
                    <button type="button" id="btn_editar" class="btn btn-primary">Fechas</button>
                    <button type="button" id="btn_eliminar" class="btn btn-danger">Anular</button>     
                </td>
            </tr>
            `;
        });

        $('#cuerpo_tabla').html(etiqueta); 
    }

    

    function obtenerCliente(id) {    
        for (let i = 0; i < clientesArray.length; i++) {
            const e = clientesArray[i];
            if(e.id == id){ 
                return e.nombre;
            }
        }   
        return null;
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
                { "sClass": "text-end", "aTargets": [ 0, 1, 3, 4 ]},
            ]
        }); 
    }


    function obtenerCréditos(idventa) {        
        for (let i = 0; i < creditoVentaArray.length; i++) {
            const e = creditoVentaArray[i];
            if(e.idventa == idventa){
                console.log(e.idventa+' = '+id);
                return true;
            }
        }
        return false;
    }


    function obtenerCréditosID() {    
        let id = 0;    
        for (let i = 0; i < creditoVentaArray.length; i++) {
            id = creditoVentaArray.id;
        }
        return (id+1);
    }


    //Para definir la fecha de vencimiento de compra
    $(document).on("click", "#btn_editar", function () {
        id = parseInt($(this).closest("tr").find('td:eq(0)').text()); //capturo la condicion
        condicion = ($(this).closest("tr").find('td:eq(5)').text()); //capturo la condicion
        vence = obtenerCréditos(id);
        $("#fechaVenceModal").datepicker().datepicker("setDate", new Date());
        if(condicion == 'CRÉDITO'){
            if(vence == false){
                $('#modalFechaVence').modal('show');
            }else{
                alertify.error('La fecha ya esta asignada');
            }
        }else{
            alertify.error('No es a crédito');
        }         
    });


    $(document).on("click", "#fecha-vence", function () {

        vence = $('#fechaVenceModal').val();
        
        if (vence != '' && id > 0) {
            Swal.fire({
                //title: title,
                text: "¿Definir el "+vence+" como fecha de vencimiento?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '##024897',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, definir!',
                cancelButtonText : 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    data = obtenerRegistro(id);
                    let postData = {
                        id : obtenerCréditosID(),
                        idventa : id,
                        idcliente : data.idcliente,
                        total : data.total,
                        vence : vence,
                        pagado : 0,
                        faltante : data.total,
                    };
                    $('#modalFechaVence').modal('hide');
                    creditoVentaArray.push(postData);
                    mostrarDatos()
                    alertify.success('Crédito definido correctamente.');
                }
            });              
        }else{
            showAlert('Fecha incorrecta', 401);
        }
    });



    function obtenerRegistro(id) {    
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.id == id){ 
                return e;
            }
        }   
        return null;
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


