jQuery(function () {
    LlenarTabla(); // Llenar la tabla de depósitos
    LlenarComboClientes(); // Llenar el combo de clientes
});

// Función para llenar la tabla de depósitos
function LlenarTabla() {
    LlenarTablaXServicios("http://localhost:50745/api/Depositos/LlenarTablaDepositos", "#tblDepositos");
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
// Función genérica para ejecutar comandos de inserción, actualización y eliminación
async function EjecutarComando(Metodo, Funcion) {
    const deposito = new Deposito(
        $("#txtDepositoID").val(),
        $("#txtMonto").val(),
        $("#txtFecha").val(),
        $("#cmbCliente").val(), 
        $("#txtAhorro").val()   
    );
    let URL = "http://localhost:50745/api/Depositos/" + Funcion;
    await EjecutarServicio(Metodo, URL, deposito);
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

// Clase JavaScript para el objeto Deposito
class Deposito {
    constructor(DepositoID, Monto, Fecha, Cliente, Ahorro) {
        this.depositoID = DepositoID;
        this.monto = Monto;
        this.fecha = Fecha;
        this.clienteID = Cliente;
        this.ahorroID = Ahorro;
    }
}

// Función para consultar un depósito por su ID
async function Consultar() {
    let depositoID = $("#txtDepositoID").val();
    let URL = "http://localhost:50745/api/Depositos/ConsultarXCodigo?depositoID=" + depositoID;
    const deposito = await ConsultarServicio(URL);
    if (deposito != null) {
        $("#txtMonto").val(deposito.monto);
        $("txtDepositoID").val(deposito.depositoID);
        $("#cmbCliente").val(deposito.clienteID);
        $("#txtAhorro").val(deposito.ahorroID);
        $("#txtFecha").val(deposito.fecha);
    } else {
        $("#dvMensaje").html("El depósito no está en la base de datos");
        $("#txtMonto").val("");
        $("#txtFecha").val("");
        $("#cmbCliente").val("");
        $("#txtAhorro").val("");
    }
}

// Función para registrar un depósito
async function RealizarDeposito() {
    const request = {
        ClienteID: $("#cmbCliente").val(),
        AhorroID: $("#txtAhorro").val(),
        Monto: parseFloat($("#txtMontoMensual").val()),
        FechaDeposito: $("#txtFecha").val()
    };

    const url = "http://localhost:50745/api/Depositos/Realizar";

    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const result = await response.text();
        $("#dvMensaje").html(result);

        // Actualizar tablas y combos si es necesario
        LlenarTabla(); // Ejemplo: Refrescar tabla de depósitos
    } catch (error) {
        $("#dvMensaje").html("Error al realizar el depósito: " + error.message);
    }
}

function LlenarTablaAho() {
    LlenarTablaXServicios("http://localhost:50745/api/Ahorros/LlenarTablaAhorros", "#tblAhorros");
}

// Función para consultar un ahorro por su ID
async function ConsultarAho() {
    let ahorroID = $("#txtAhorro").val().replace(":", "");
    let URL = "http://localhost:50745/api/Ahorros/ConsultarXID?id=" + ahorroID;
    const ahorro = await ConsultarServicio(URL);
    if (ahorro != null) {
        $("#cmbCliente").val(ahorro.clienteID);
        $("#txtMontoMensual").val(ahorro.montoMensual);
        $("#txtFecha").val(ahorro.fechaInicial);
    } else {
        $("#dvMensaje").html("El ahorro no está en la base de datos");
        $("#cmbCliente").val("");
        $("#txtMontoMensual").val("");
        $("#txtFechaInicial").val("");
    }
}


// Llamada al evento del botón
jQuery(function () {
    LlenarTablaAho();
    $("#btnRealizarDeposito").click(function () {
        RealizarDeposito();
    });
});
