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
    LlenarComboClientes();
});

function LlenarTabla() {
    LlenarTablaXServicios("http://localhost:50745/api/Ahorros/LlenarTablaAhorros", "#tblAhorros");
}

function LlenarComboClientes() {
    const url = "http://localhost:50745/api/Clientes/LlenarCombo";
    LlenarComboCliente(url, "#cmbCliente");
}
async function LlenarComboCliente(URLServicio, ComboLlenar) {
    try {
        const Respuesta = await fetch(URLServicio, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const Rpta = await Respuesta.json();

        // Limpiar el combo antes de llenarlo
        $(ComboLlenar).empty();
        $(ComboLlenar).append('<option value="">Seleccione un cliente</option>');

        // Llenar el combo con los datos recibidos
        for (let i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value="' + Rpta[i].clienteID + '">' + Rpta[i].nombre + '</option>');
        }
    } catch (error) {
        $("#dvMensaje").html("Error al cargar el combo: " + error);
    }
}

// Función genérica para ejecutar comandos de inserción, actualización y eliminación para Ahorro
async function EjecutarComando(Metodo, Funcion) {
    const ahorro = new Ahorro(
        $("#txtAhorroID").val(),
        $("#cmbCliente").val(),
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
        $("#cmbCliente").val(ahorro.clienteID);
        $("#txtMontoMensual").val(ahorro.montoMensual);
        $("#txtFechaInicial").val(ahorro.fechaInicial);
    } else {
        $("#dvMensaje").html("El ahorro no está en la base de datos");
        $("#cmbCliente").val("");
        $("#txtMontoMensual").val("");
        $("#txtFechaInicial").val("");
    }
}
