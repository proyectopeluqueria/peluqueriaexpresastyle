
/* Aquí va la lógica de lado del cliente*/

$(function () {

    document.addEventListener("keyup", abrirVentanas, false);

    function abrirVentanas(event) {
      cod = event.keyCode;
      if(cod == 113){//113 = f2
        $('#consultarProveedor').modal('show');
      }else if(cod == 115){//115 == f4
        $('#consultarArticulo').modal('show');
      }else if(cod == 119){//117 == f6
        guardarCompra();
      }else if(cod == 120){//117 == f6
        cancelarCompra();
      }else if(cod == 121){//117 == f6
        $('#modalAutor').modal('show');
      }
    }


    let detalles = [];


    listarDetalles();

    let cabecera = {
      idproveedor: '0',
      fecha: $('#fecha').val(),
      total: '',
      tipo_doc: $('#tipo_doc').val(),
      num_doc: $('#num_doc').val(),
      condicion: $('#condicion').val(),
    };


    $(document).ready(function() {
      limpiarForm();
      $('#tableProveedor').DataTable({
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
          { "sClass": "text-end", "aTargets": [ 0, 2 ] },
      ]
      });

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
    });


    // limpiarForm();

    function articuloModel(cod, nombre, stock, precio) {
      return {
        cod : cod,
        nombre : nombre,
        stock : stock,
        precio : precio
      };
    }


    let articulosArray = [
      articuloModel('1236587423698', "SAMPO SEDAL", 30, 5000),
      articuloModel('6548410656548', "CREMA DE AFEITAR", 15, 3500),
      articuloModel('9876543210525', "TINTE LOREAL", 50, 5500),
      articuloModel('5468523644858', "ESMALTE SILCARE", 30, 2000),
    ];


    function cargarTablaArt() {
      let plantilla = ``;
      articulosArray.forEach(e => {
          plantilla +=`
            <tr>
              <td>${e.cod}</td>
              <td>${e.nombre}</td>
              <td>${e.stock}</td>
              <td>${e.precio}</td>
              <td>
                <button type="button" class="btn btn-success" id="btn-check" title='Seleccionar'> Seleccionar </button>
              </td>
            </tr>
          `;
      });
      $('#tbody_articulo').html(plantilla);
    }


    cargarTablaArt();


    function proveedorModel(ruc, nombre, telefono) {
      return {
        ruc : ruc,
        nombre : nombre,
        telefono : telefono,
      };
    }


    let proveedorArray = [
      proveedorModel(2569658, "JUAN PEREZ", "0985555666"),
      proveedorModel(2658550, "HERNAN LOPEZ", "0991568740"),
      proveedorModel(3108556, "CARLOS MACIEL", "0972850125"),
      proveedorModel(1044658, "MIRIAN FERNANDEZ", "0971001687"),
      proveedorModel(999658, "JOSEFINA CANO", "0973500686"),
      proveedorModel(4669658, "ANDREA OVIEDO", "0985775044"),
    ];


    function cargarTablaProv() {
      let plantilla = ``;
      proveedorArray.forEach(e => {
          plantilla +=`
            <tr>
              <td>${e.ruc}</td>
              <td>${e.nombre}</td>
              <td>${e.telefono}</td>
              <td>
                  <button type="button" class="btn btn-success btn-checkProv"> Seleccionar </button>
              </td>
            </tr>
          `;
      });
      $('#tbody_proveedor').html(plantilla);
    }


    cargarTablaProv();


    function buscarProveedor(ruc){
      let encontrado = false;
      ruc = quitarSeparador(ruc.toString());
      for (let i = 0; i < proveedorArray.length; i++) {
        const e = proveedorArray[i];
        if(e.ruc == ruc){
          encontrado = true;
          asignarProveedor(e.ruc, e.nombre, e.telefono); break;
        }
      }

      if(encontrado == false){
        vaciarProveedor();
        alertify.error('Proveedor no encontrado.');
      }
    }


    // Data Picker Initialization
    $('#fecha').datepicker({
      format: 'dd/mm/yyyy',
      //startDate: '-3d',
      endDate: '+0d',
    });

    function cero(value) {
      if(value.toString().length == 1){
        return '0'+value;
      }
      return value;
    }


    $("#fecha").datepicker().datepicker("setDate", new Date().getFullYear()+'-'+cero(new Date().getMonth()+1)+'-'+cero(new Date().getDate())+' 00:00:00');


    viewProcesar();


    $('#fecha').blur(function (e) {
      cabecera.fecha = $('#fecha').val();
      viewProcesar();
    });


    //Botón Seleccionar item
    $(document).on("click", "#search-prov", function () {
      $('#consultarProveedor').modal('show');
    });


    //Botón Seleccionar item
    $(document).on("click", ".btn-checkProv", function () {
      fila = $(this).closest("tr");
      id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
      ci = fila.find('td:eq(0)').text(); //capturo el CI
      nombre = fila.find('td:eq(1)').text(); //capturo el Nombre
      telefono = fila.find('td:eq(2)').text(); //capturo el TELEFONO

      asignarProveedor(ci, nombre, telefono);
      $('#consultarProveedor').modal('hide');
    });


    function vaciarProveedor() {
      $('#cirucP').val('');
      $('#nombreP').val('');
      $('#telefonoP').val('');
    }


    function asignarProveedor(ci, nombre, telefono) {
      $('#cirucP').val(separador_Mil(ci.toString()));
      $('#nombreP').val(nombre);
      $('#telefonoP').val(telefono);
      viewProcesar();
    }


    $('#cirucP').keyup(function (e) {
      if (e.keyCode == 13) {//Si presiona enter
        let codProv = $('#cirucP').val();
        if (codProv != "") {
          buscarProveedor(codProv);
        } else {
          vaciarProveedor();
        }
      }
      if($('#cirucP').val() == '-'){
        $('#cirucP').val('');
      }
      if(quitarSeparador($('#cirucP').val().toString()) == '0'){
        $('#cirucP').val('');
      }
    });



    $('#cirucP').blur(function (e) {
      var valor = $('#cirucP').val().toString();
      let array = valor.split('-');

      if(valor.search("-") > -1){
        valor = quitarSeparador(array[0]);
      }

      var num = valor.replace(/\D/g,'')//Elimina todo que no sea un guion

      if(!isNaN(num)){
        if(num <= 0){
          $('#cirucP').val('');
        }
      }
      viewProcesar();

    });


    //Botón Nuevo
    $(document).on("click", "#search", function(){
        $('#consultarArticulo').modal('show');
        $("#consultarArticulo").css("z-index", "1500");	 	//Poner el modal encima de otro modal
    });


    //Botón Seleccionar item
    $(document).on("click", "#btn-check", function () {
      fila = $(this).closest("tr");
      id = (fila.find('td:eq(0)').text()); //capturo el ID
      nombre = (fila.find('td:eq(1)').text()); //capturo el ID
      stock = (fila.find('td:eq(2)').text()); //capturo el ID
      precio = (fila.find('td:eq(3)').text()); //capturo el ID

      asignarArticulo(id, nombre, precio);
      calcularTotal();

      $('#consultarArticulo').modal('hide');
    });



    function vaciarArticulo() {
      $('#txt_cod_producto').val('');
      $('#txt_descipcion').val('-');
      $('#txt_cant').val('0');
      $('#txt_precio').val('0');
      $('#txt_subtotal').val('0');

      //Bloquear Cantidad y Costo
      $('#txt_cant').attr('disabled', 'disabled');
      $('#txt_precio').attr('disabled', 'disabled');
      // Ocultar Boto Agregar
      // $('#add_product_compra').hide();
    }


    function asignarArticulo(id, nombre, precio) {
      // idiva = iva;
      $('#txt_cod_producto').val(id);
      $('#txt_descipcion').val(nombre);
      // $('#txt_existencia').html(info.existencia);
      $('#txt_cant').val('1');
      $('#txt_precio').val(separador_Mil(precio.toString()));
      $('#txt_subtotal').val(separador_Mil(precio.toString()));
      // Activar Cantidad y Costo
      $('#txt_cant').removeAttr('disabled');
      $('#txt_precio').removeAttr('disabled');
      calcularTotal();

      $( "#txt_cant" ).focus();
    }


    function buscarArticulo(id){
      let encontrado = false
      id = quitarSeparador(id.toString());
      for (let i = 0; i < articulosArray.length; i++) {
        const e = articulosArray[i];
        if(e.cod == id){
          encontrado = true;
          asignarArticulo(e.cod, e.nombre, e.precio); break;
        }
      }

      if(encontrado == false){
        vaciarArticulo();
        alertify.error('Artículo no encontrado.');
      }
    }

    $('#num_doc').blur(function (e) {
      var valor = $('#num_doc').val().toString();
      let array = valor.split('-');

      if(valor.search("-") > -1){
        valor = quitarSeparador(array[0]);
      }

      var num = valor.replace(/\D/g,'')//Elimina todo que no sea un guion

      if(!isNaN(num)){
        if(num <= 0){
          $('#num_doc').val('');
        }
      }
      viewProcesar();

    });


    $('#txt_cod_producto').blur(function (e) {
      var valor = $('#txt_cod_producto').val().toString();
      if(isNaN(valor)){
        $('#txt_cod_producto').val('');
      }else{
        if(parseInt(valor) < 1){
          $('#txt_cod_producto').val('');
        }
      }

    });


    $('#txt_cant').keyup(function (e) {
      var valor = $('#txt_cant').val().toString();
      if(valor.substr(-1) != '.' && $('#txt_cant').val() != ''){
        if(!isNaN(valor)){
          calcularTotal();
          if(parseFloat(valor) <= 0){
            $('#txt_cant').val('');
          }else{
            $('#txt_cant').val(parseFloat(valor));
          }
        }
      }

    });


    $('#txt_cant').blur(function (e) {
      var valor = $('#txt_cant').val().toString();
      if(!isNaN(valor) && $('#txt_cant').val() != ''){
        calcularTotal();
        if(parseFloat(valor) <= 0){
          $('#txt_cant').val('1');
        }else{
          $('#txt_cant').val(parseFloat(valor));
        }
      }else{
        $('#txt_cant').val('1');
      }
    });



    $('#txt_cod_producto').keyup(function (e) {
      e.preventDefault();
      //if (($('#txt_cod_producto').val() < 1 || isNaN($('#txt_cod_producto').val())) || ($('#txt_cant').val() < 1 || isNaN($('#txt_cant').val())) || ($('#txt_precio').val() < 1 || isNaN($('#txt_precio').val()))) {
       // $('#add_product_compra').hide();
      //} else {
       // $('#add_product_compra').show();
      //}

      if (e.keyCode == 13) {//Es igual a enter
        let productos = $(this).val();
        if (productos == "") {
          vaciarArticulo();
        } else {
          buscarArticulo(productos);
        }
      }

    });


    $('#txt_precio').keyup(function (e) {
      var valor = quitarSeparador($('#txt_precio').val().toString());
      if($('#txt_precio').val() != ''){
        if(!isNaN(valor)){
          calcularTotal();
          if(parseInt(valor) <= 0){
            $('#txt_precio').val('');
          }else{
            $('#txt_precio').val(separador_Mil(parseInt(valor).toString()));
          }
        }
      }

    });


    $('#txt_precio').blur(function (e) {
      var valor = quitarSeparador($('#txt_precio').val().toString());
      if(!isNaN(valor) && $('#txt_precio').val() != ''){
        calcularTotal();
        if(parseInt(valor) <= 0){
          $('#txt_precio').val('1');
        }else{
          $('#txt_precio').val(separador_Mil(parseInt(valor).toString()));
        }
      }else{
        $('#txt_precio').val('1');
      }
    });


    function calcularTotal() {
      var subtotal = ($('#txt_cant').val()) * quitarSeparador($('#txt_precio').val().toString());
      $('#txt_subtotal').val(separador_Mil(subtotal.toString()));
      // Ocultat el boton Agregar si la cantidad y costo es menor que 1
      if (($('#txt_cod_producto').val() < 1 || isNaN($('#txt_cod_producto').val())) || ($('#txt_cant').val() < 1 || isNaN($('#txt_cant').val())) || (quitarSeparador($('#txt_precio').val().toString()) < 1 || isNaN(quitarSeparador($('#txt_precio').val().toString())))) {
      //  $('#add_product_compra').hide();
      } else {
      //  $('#add_product_compra').show();
      }
    }


    // Agregar producto al detalle_venta
    $('#add_product_compra').click(function (e) {
      e.preventDefault();

      if (($('#txt_cod_producto').val() < 1 || isNaN($('#txt_cod_producto').val())) || ($('#txt_cant').val() < 1 || isNaN($('#txt_cant').val())) || (quitarSeparador($('#txt_precio').val().toString()) < 1 || isNaN(quitarSeparador($('#txt_precio').val().toString())))) {
        //  $('#add_product_compra').hide();
        } else {
          if ($('#txt_cant').val() > 0 && $('#txt_precio').val() > 0) {
            let codarticulo = $('#txt_cod_producto').val();
            let descripcion = $('#txt_descipcion').val();
            let cantidad = $('#txt_cant').val();
            let precio = $('#txt_precio').val();
            let subtotal = $('#txt_subtotal').val();


            let detalle = {
              codarticulo: codarticulo,
              descripcion: descripcion,
              cantidad: cantidad,
              precio: precio,
              subtotal,
            };

            if(!verificarRegistro(codarticulo, cantidad, precio))
              detalles.push(detalle);

            listarDetalles();

            vaciarArticulo();

            viewProcesar();

            $( "#txt_cod_producto" ).focus();
          }
        }
    });



    //Verificar si ese producto ya se cargo
    function verificarRegistro(id, cantidad, precio) {
      cantidad = parseFloat(cantidad);
      for (let i = 0; i < detalles.length; i++) {
        if(detalles[i].codarticulo === id){
          detalles[i].cantidad = (parseInt(detalles[i].cantidad) + cantidad);
          detalles[i].precio = precio;
          detalles[i].subtotal = (detalles[i].cantidad * parseInt(quitarSeparador(detalles[i].precio))).toString();
          return true;
        }
      }
    }



    //Listar los detalles
    function listarDetalles() {
      let subtotal = 0;
      let plantilla = '';
      var orden = 0;
      detalles.forEach(det => {
        orden++;
        subtotal += parseInt(quitarSeparador(det.subtotal.toString()));
        plantilla += `
          <tr>
            <td>${orden}</td>
            <td>${det.codarticulo}</td>
            <td>${det.descripcion}</td>
            <td>${det.cantidad}</td>
            <td>${separador_Mil(det.precio.toString())}</td>
            <td>${separador_Mil(det.subtotal.toString())}</td>
            <td>
              <button type="button" class="btn btn-danger btn-det"> Quitar </button>
            </td>
          </tr>
        `;
      });

      

      // cabecera.total = subtotal;
      if(subtotal == 0){
        $('#total_compra').val('');
      }else{
        $('#total_compra').val(separador_Mil(subtotal.toString()));
      }
      $('#detalle_compra').html(plantilla);
      viewProcesar();
    }


    //Eliminar
    $(document).on("click", ".btn-det", function () {
      fila = $(this).closest("tr");
      id = parseInt(fila.find('td:eq(1)').text()); //capturo el ID
      nombre = fila.find('td:eq(2)').text();
      Swal.fire({
        //title: title,
        text: "¿Está seguro de borrar el registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '##024897',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          borrarRegistro(id);
        }
      });
    });


    //Borrar un registro
    function borrarRegistro(id) {
      // detalles.splice(fila, 1);
      let i = 0;
      pos = -1;
      while(i < detalles.length){
        if(detalles[i].codarticulo == id){
          pos = i;break;
        }
        i++;
      }
      detalles.splice(pos, 1);
      listarDetalles();
    }


    // mostrar/ ocultar boton Procesar
    function viewProcesar() {
      if ($('#detalle_compra tr').length > 0 && $('#cirucP').val().length > 0 &&  $('#nombreP').val().length > 0
        && $('#num_doc').val().length > 0 && $('#total_compra').val().length > 0 && $('#fecha').val().length > 0 ) {
        $('#btn_guardar_compra').attr('disabled', false);
      } else {
        $('#btn_guardar_compra').attr('disabled', true);
      }
    }


    //Botón Seleccionar item
    $(document).on("click", "#btn_guardar_compra", function () {
      guardarCompra();
    });

    function guardarCompra() {
      let puede = true;

      if ($('#detalle_compra tr').length < 1 ) {
        alertify.error('Falta el detalle de la compra.');
        puede = false;
        $('#txt_cod_producto').focus();
      }else if ($('#cirucP').val().length < 1 ) {
        alertify.error('Falta el ruc del proveedor.');
        puede = false;
        $('#cirucP').focus();
      }else if ($('#nombreP').val().length < 1 ) {
        alertify.error('Falta el nombre del proveedor.');
        puede = false;
        $('#nombreP').focus();
      }else if ($('#num_doc').val().length < 1 ) {
        alertify.error('Falta el numero de documento.');
        puede = false;
        $('#num_doc').focus();
      }else if ($('#total_compra').val().length < 1 ) {
        alertify.error('Falta el total de la compra');
        puede = false;
        $('#total_compra').focus();
      }else if ($('#fecha').length < 1 ) {
        alertify.error('Falta la fecha de compra');
        puede = false;
        $('#fecha').focus();
      }


      if(puede){
        Swal.fire({
          //title: title,
          text: "¿Está seguro de guardar el registro de compra?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '##024897',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, guardar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            alertify.success('Compra registrada.');
            limpiarForm();
          }
        });
      }
    }


    function limpiarForm() {
      $('#num_doc').val('');
      $("#fecha").datepicker().datepicker("setDate", new Date().getFullYear()+'-'+cero(new Date().getMonth()+1)+'-'+cero(new Date().getDate())+' 00:00:00');
      vaciarProveedor();
      vaciarArticulo();
      detalles = [];
      calcularTotal();
      listarDetalles();
      $("#cirucP").focus();
    }

    //Eliminar
    $(document).on("click", "#cancelar_compra", function () {
      cancelarCompra();
    });

    //Eliminar
    $(document).on("click", "#icono-index", function () {
      cancelarCompra();
    });

    function provCargado() {
      if($('#cirucP').val().length > 0 || $('#nombreP').val().length > 0 || $('#num_doc').val().length > 0){
        return true;
      }else{
        return false;
      }
    }

    function cancelarCompra(){
      if(provCargado() || detalles.length > 0){
        Swal.fire({
          //title: title,
          text: "¿Está seguro de cancelar el registro de compra y volver al menú principal?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '##024897',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cancelar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./index.html";
          }
        });
      }else{
        window.location.href = "./index.html";
      }     
    }

  });
