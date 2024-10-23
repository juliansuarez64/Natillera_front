// Clase JavaScript para el objeto Ahorro
class Ahorro {
    constructor(ahorroID, clienteID, montoMensual, fechaInicial) {
        this.ahorroID = ahorroID;
        this.clienteID = clienteID;
        this.montoMensual = montoMensual;
        this.fechaInicial = fechaInicial;
    }
}

// Función para llenar la tabla de ahorros
jQuery(function () {
    LlenarTabla(); // Llenar la tabla de ahorros
});

function LlenarTabla() {
    LlenarTablaXServicios("http://localhost:50745/api/Ahorros/LlenarTablaAhorros", "#tblAhorros");
}

// Función genérica para ejecutar comandos de inserción, actualización y eliminación para Ahorro
async function EjecutarComando(Metodo, Funcion) {
    const ahorro = new Ahorro(
        $("#txtAhorroID").val(),
        $("#txtClienteID").val(),
        $("#txtMontoMensual").val(),
        $("#txtFechaInicial").val()
    );
    let URL = "http://localhost:50745/api/Ahorros/" + Funcion;
    await EjecutarServicio(Metodo, URL, ahorro);
    LlenarTabla();
}

// Funciones para operaciones CRUD
function Insertar() {
    EjecutarComando("POST", "Insertar");
}

function Actualizar() {
    EjecutarComando("PUT", "Actualizar");
}

function Eliminar() {
    EjecutarComando("DELETE", "Eliminar");
}

// Función para consultar un ahorro por su ID
async function Consultar() {
    let ahorroID = $("#txtAhorroID").val();
    let URL = "http://localhost:50745/api/Ahorros/ConsultarXID?id=" + ahorroID;
    const ahorro = await ConsultarServicio(URL);
    if (ahorro != null) {
        $("#txtClienteID").val(ahorro.clienteID);
        $("#txtMontoMensual").val(ahorro.montoMensual);
        $("#txtFechaInicial").val(ahorro.fechaInicial);
    } else {
        $("#dvMensaje").html("El ahorro no está en la base de datos");
        $("#txtClienteID").val("");
        $("#txtMontoMensual").val("");
        $("#txtFechaInicial").val("");
    }
}
