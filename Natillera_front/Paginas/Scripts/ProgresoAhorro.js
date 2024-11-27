// Clase para manejar los progresos de ahorro
class ProgresoAhorro {
    constructor(ahorroID, clienteID, numeroPagos, totalMonto) {
        this.ahorroID = ahorroID;
        this.clienteID = clienteID;
        this.numeroPagos = numeroPagos;
        this.totalMonto = totalMonto;
    }
}

// Llenar la tabla al cargar la página
$(function () {
    LlenarTablaProgresoAhorros();
});

// Función para llenar la tabla con datos del backend
function LlenarTablaProgresoAhorros() {
    LlenarTablaXServicios(
        "http://localhost:50745/api/ProgresoAhorros/LlenarTablaProgresoAhorros",
        "#tblProgresoAhorros"
    );
}

// Función para ejecutar operaciones CRUD
async function EjecutarComando(Metodo, Funcion) {
    const progreso = new ProgresoAhorro(
        $("#txtAhorroID").val(),
        $("#txtClienteID").val(),
        $("#txtNumeroPagos").val(),
        $("#txtTotalMonto").val()
    );

    const URL = "http://localhost:50745/api/ProgresoAhorros/" + Funcion;
    await EjecutarServicio(Metodo, URL, progreso);
    LlenarTablaProgresoAhorros();
}

// Operaciones CRUD
function Insertar() {
    EjecutarComando("POST", "Insertar");
}

function Actualizar() {
    EjecutarComando("PUT", "Actualizar");
}

function Eliminar() {
    EjecutarComando("DELETE", "Eliminar");
}

// Consultar un progreso por su ID
async function Consultar() {
    const ahorroID = $("#txtAhorroID").val();
    const URL = "http://localhost:50745/api/ProgresoAhorros/ConsultarXID?id=" + ahorroID;

    const progreso = await ConsultarServicio(URL);
    if (progreso) {
        $("#txtClienteID").val(progreso.clienteID);
        $("#txtNumeroPagos").val(progreso.numeroPagos);
        $("#txtTotalMonto").val(progreso.totalMonto);
    } else {
        $("#dvMensaje").html("El progreso de ahorro no existe.");
        $("#txtClienteID").val("");
        $("#txtNumeroPagos").val("");
        $("#txtTotalMonto").val("");
    }
}
