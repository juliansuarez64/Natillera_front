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
        $("#txtFecha").val(deposito.fecha);
        $("#cmbCliente").val(deposito.cliente);
        $("#txtAhorro").val(deposito.ahorro);
    } else {
        $("#dvMensaje").html("El depósito no está en la base de datos");
        $("#txtMonto").val("");
        $("#txtFecha").val("");
        $("#cmbCliente").val("");
        $("#txtAhorro").val("");
    }
}
