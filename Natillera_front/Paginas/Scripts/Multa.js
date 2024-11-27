class Multa {
    constructor(id, clienteID, monto, descripcion, fecha) {
        this.id = id;
        this.clienteID = clienteID;
        this.monto = monto;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
}

jQuery(function () {
    LlenarTabla(); // Llenar la tabla de multas
});

async function LlenarTabla() {
    try {
        console.log("Llenando tabla de multas...");
        await LlenarTablaXServicios("http://localhost:50745/api/Multas/LlenarTablaMultas", "#tblMultas");
    } catch (error) {
        console.error("Error al intentar llenar la tabla:", error);
        $("#dvMensaje").html("Error al llenar la tabla de multas.");
    }
}

// Función genérica para ejecutar comandos de inserción, actualización y eliminación para Multas
async function EjecutarComando(Metodo, Funcion) {
    const multa = new Multa(
        $("#txtId").val(),
        $("#txtClienteID").val(),
        $("#txtMonto").val(),
        $("#txtDescripcion").val(),
        $("#txtFecha").val()
    );
    let URL = "http://localhost:50745/api/Multas/" + Funcion;
    await EjecutarServicio(Metodo, URL, multa);
    LlenarTabla();
}

// Funciones para operaciones CRUD de multas
function Insertar() {
    EjecutarComando("POST", "Insertar");
}

function Actualizar() {
    EjecutarComando("PUT", "Actualizar");

}

function Eliminar() {
    EjecutarComando("DELETE", "Eliminar");
}
// Función para consultar una multa por su ID
async function ConsultarMulta() {
    let multaID = $("#txtId").val(); // Obtener el ID de la multa desde un campo de entrada
    let URL = "http://localhost:50745/api/Multas/ConsultarXID?id=" + multaID; // Construir la URL para consultar
    const multa = await ConsultarServicio(URL); // Realizar la consulta usando tu función genérica

    if (multa != null) {
        // Rellenar los campos del formulario con los datos de la multa
        $("#txtClienteID").val(multa.clienteID);
        $("#txtMonto").val(multa.monto);
        $("#txtDescripcion").val(multa.descripcion);
        $("#txtFecha").val(multa.fecha);
    } else {
        // Mostrar mensaje de error y limpiar los campos si no se encuentra la multa
        $("#dvMensaje").html("La multa no está en la base de datos.");
        $("#txtClienteID").val("");
        $("#txtMonto").val("");
        $("#txtDescripcion").val("");
        $("#txtFecha").val("");
    }
}