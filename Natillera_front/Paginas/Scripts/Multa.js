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