// Clase para manejar las multas
class Multa {
    constructor(multaID, clienteID, descripcion, monto, fecha) {
        this.multaID = multaID;
        this.clienteID = clienteID;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
}

// Llenar la tabla al cargar la página
$(function () {
    LlenarTablaMultas();
});

// Función para llenar la tabla con datos del backend
function LlenarTablaMultas() {
    LlenarTablaXServicios(
        "http://localhost:50745/api/Multas/LlenarTablaMultas",
        "#tblMultas"
    );
}

// Función para ejecutar operaciones CRUD
async function EjecutarComando(Metodo, Funcion) {
    const multa = new Multa(
        $("#txtMultaID").val(),
        $("#txtClienteID").val(),
        $("#txtDescripcion").val(),
        $("#txtMonto").val(),
        $("#txtFecha").val()
    );

    const URL = "http://localhost:50745/api/Multas/" + Funcion;
    await EjecutarServicio(Metodo, URL, multa);
    LlenarTablaMultas();
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

// Consultar una multa por su ID
async function Consultar() {
    const multaID = $("#txtMultaID").val();
    const URL = "http://localhost:50745/api/Multas/ConsultarXID?id=" + multaID;

    const multa = await ConsultarServicio(URL);
    if (multa) {
        $("#txtClienteID").val(multa.clienteID);
        $("#txtDescripcion").val(multa.descripcion);
        $("#txtMonto").val(multa.monto);
        $("#txtFecha").val(multa.fecha);
    } else {
        $("#dvMensaje").html("La multa no existe.");
        $("#txtClienteID").val("");
        $("#txtDescripcion").val("");
        $("#txtMonto").val("");
        $("#txtFecha").val("");
    }
}

// Función para pagar una multa
async function PagarMulta() {
    const multaID = $("#txtMultaID").val(); // ID de la multa
    const montoPago = $("#txtMonto").val(); // Monto a pagar

    if (!multaID || !montoPago) {
        alert("Por favor, ingrese el ID de la multa y el monto a pagar.");
        return;
    }

    const URL = `http://localhost:50745/api/Multas/PagarMulta?multaID=${multaID}&montoPago=${montoPago}`;

    try {
        const response = await fetch(URL, { method: "POST" });

        const result = await response.text();
        alert(result); // Mostrar el mensaje devuelto por la API

        // Actualizar la tabla después del pago
        LlenarTablaMultas();
    } catch (error) {
        alert("Error al realizar el pago: " + error);
    }
}

