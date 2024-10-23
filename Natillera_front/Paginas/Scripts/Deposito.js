jQuery(function () {
    LlenarTabla(); // Llenar la tabla de depósitos
});

// Función para llenar la tabla de depósitos
function LlenarTabla() {
    LlenarTablaXServicios("http://localhost:50745/api/Depositos/LlenarTablaDepositos", "#tblDepositos");
}

// Función genérica para ejecutar comandos de inserción, actualización y eliminación
async function EjecutarComando(Metodo, Funcion) {
    const deposito = new Deposito(
        $("#txtDepositoID").val(),
        $("#txtMonto").val(),
        $("#txtFecha").val(),
        $("#txtCliente").val(), 
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
        this.cliente = Cliente;
        this.ahorro = Ahorro;
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
        $("#txtCliente").val(deposito.cliente);
        $("#txtAhorro").val(deposito.ahorro);
    } else {
        $("#dvMensaje").html("El depósito no está en la base de datos");
        $("#txtMonto").val("");
        $("#txtFecha").val("");
        $("#txtCliente").val("");
        $("#txtAhorro").val("");
    }
}
