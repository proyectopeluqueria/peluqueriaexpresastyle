
   

    let registroArray = creditoCompraArray;

    $(document).ready(function () {
        registrosArray = getRegistros(1);    
        mostrarDatos();       
        dataTable();   
    });



    function obtenerNumDoc(id) {
        for (let i = 0; i < comprasArray.length; i++) {
            const e = comprasArray[i];
            if (e.id == id) {
                return e.num_doc;
            }
        }
        return 0;
    }

    function mostrarDatos() {
        let etiqueta = '';
        registroArray.forEach(e => {
            etiqueta += `
            <tr>
                <td>${e.id}</td>
                <td>${obtenerNumDoc(e.idcompra)}</td>
                <td>${obtenerProveedor(e.idproveedor)}</td>
                <td>${e.vence.getDate() + '/' + ceroIzquierda(e.vence.getMonth().toString(), 2) + '/' + e.vence.getFullYear()}</td>
                <td>${separador_Mil(e.total.toString())}</td>
                <td>${separador_Mil(e.pagado.toString())}</td>
                <td>${separador_Mil(e.faltante.toString())}</td>
                <td>
                    <button type="button" class="btn btn_secundario" id="btn_pagar" title="Registrar pago"> Pagar </button>
                </td>
            </tr>
            `;
        });

        $('#cuerpo_tabla').html(etiqueta); 
    }


    function dataTable() {
        $('#example').dataTable().fnDestroy();
        $('#example').DataTable({
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
                    "first": ">|",
                    "last": "|<",
                    "next": ">>",
                    "previous": "<<"
                },
                "aria": {
                    "sortAscending": ": activar para ordenar la columna ascendente",
                    "sortDescending": ": activar para ordenar la columna descendente",
                    "sort": "descending"
                },
                "responsive": true,
            },
            "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
            "iDisplayLength": 5,
            "responsive": true,
            "order": [[0, "desc"]],
            columnDefs: [
                { "sClass": "text-end", "aTargets": [0, 1, 3, 4, 5, 6] },
            ]
        });
    }


    function obtenerProveedor(id) {
        for (let i = 0; i < proveedorArray.length; i++) {
            const e = proveedorArray[i];
            if (e.id == id) {
                return e.nombre;
            }
        }
        return null;
    }


    $(document).on("click", "#btn_pagar", function () {
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID

        let credito = obtenerCrédito(id);
        if (credito.faltante != 0) {
            deuda = credito.total - credito.pagado;
            $("#proveedor-modal").text("Proveedor : " + obtenerProveedor(credito.idproveedor));
            $("#total-modal").text("Total : 0");
            $("#deuda-modal").text("Deuda: " + separador_Mil(deuda.toString()) + " gs.");
            $("#btn-form-modal").prop('disabled', true);                
            $('#form').trigger('reset');
            $('#newModal').modal('show');
        } else {
            alertify.error('No hay pagos que registrar.');
        }
    });


    function obtenerCrédito(id) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if (e.id == id) {
                return e;
            }
        }
        return null;
    }


    // calcular el Total
    $('#efectivo').keyup(function (e) {
        e.preventDefault();
        calcularTotal();
    });


    $('#cheque').keyup(function (e) {
        e.preventDefault();
        calcularTotal();
    });


    $('#tarjeta').keyup(function (e) {
        e.preventDefault();
        calcularTotal();
    });


    $('#vale').keyup(function (e) {
        e.preventDefault();
        calcularTotal();
    });


    $('#efectivo').blur(function (e) {
        e.preventDefault();
        if ($('#efectivo').val() === '') {
            $('#efectivo').val('0');
        }
    });


    $('#cheque').blur(function (e) {
        e.preventDefault();
        if ($('#cheque').val() === '') {
            $('#cheque').val('0');
        }
    });


    $('#tarjeta').blur(function (e) {
        e.preventDefault();
        if ($('#tarjeta').val() === '') {
            $('#tarjeta').val('0');
        }
    });


    $('#vale').blur(function (e) {
        e.preventDefault();
        if ($('#vale').val() === '') {
            $('#vale').val('0');
        }
    });


    function calcularTotal() {
        let efectivo = parseInt(validarNumero(quitarSeparador($('#efectivo').val())));
        let tarjeta = parseInt(validarNumero(quitarSeparador($('#tarjeta').val())));
        let cheque = parseInt(validarNumero(quitarSeparador($('#cheque').val())));
        let vale = parseInt(validarNumero(quitarSeparador($('#vale').val())));

        var total = efectivo + tarjeta + cheque + vale;

        if (!isNaN(total)) {
            $("#total-modal").text("Total: " + separador_Mil(total.toString()) + " gs.");
            if (parseInt(total) > parseInt(deuda)) {
                alertify.error("El total ya supera la deuda");
                $("#btn-form-modal").prop('disabled', true);
            } else {
                $("#btn-form-modal").prop('disabled', false);
            }
        }

        if (total == 0) {
            $("#btn-form-modal").prop('disabled', true);
        }
    }


    function validarNumero(valor) {
        if (isNaN(valor))
            return 0;
        return valor;
    }


    $('#btn-form-modal').click(function (e) {
        e.preventDefault();
        
        if(id > 0){
            let efectivo = validarNumero(quitarSeparador($('#efectivo').val()));
            let tarjeta = validarNumero(quitarSeparador($('#tarjeta').val()));
            let cheque = validarNumero(quitarSeparador($('#cheque').val()));
            let vale = validarNumero(quitarSeparador($('#vale').val()));
            let total = parseInt(efectivo) + parseInt(tarjeta) + parseInt(cheque) + parseInt(vale);

            for (let i = 0; i < registroArray.length; i++) {
                const e = registroArray[i];
                if(e.id == id){
                    if(e.total >= (total+e.pagado)){
                        e.pagado = e.pagado + total;
                        e.faltante = e.faltante - total;
                        mostrarDatos();
                        $('#newModal').modal('hide');
                        alertify.success('Pago registrado.');
                    }else{
                        alertify.error('El monto a pagar excede el monto faltante.');
                    }
                }                
            }
        }

    });