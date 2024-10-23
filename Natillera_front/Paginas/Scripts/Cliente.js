class Cliente {
    constructor(clienteID, nombre, apellido, identificacion, direccion, telefono) {
        this.clienteID = clienteID;
        this.nombre = nombre;
        this.apellido = apellido;
        this.identificacion = identificacion;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}

// Función para llenar la tabla de clientes
jQuery(function () {
    LlenarTabla(); // Llenar la tabla de clientes
});

async function LlenarTabla() {
    try {
        console.log("Llenando tabla...");
        await LlenarTablaXServicios("http://localhost:50745/api/Clientes/LlenarTablaClientes", "#tblClientes");
    } catch (error) {
        console.error("Error al intentar llenar la tabla:", error);
        $("#dvMensaje").html("Error al llenar la tabla de clientes.");
    }
}

// Función genérica para ejecutar comandos de inserción, actualización y eliminación para Cliente
async function EjecutarComando(Metodo, Funcion) {
    const cliente = new Cliente(
        $("#txtClienteID").val(),
        $("#txtNombre").val(),
        $("#txtApellido").val(),
        $("#txtIdentificacion").val(),
        $("#txtDireccion").val(),
        $("#txtTelefono").val()
    );
    let URL = "http://localhost:50745/api/Clientes/" + Funcion;
    await EjecutarServicio(Metodo, URL, cliente);
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

// Función para consultar un cliente por su ID
async function Consultar() {
    let clienteID = $("#txtClienteID").val();
    let URL = "http://localhost:50745/api/Clientes/ConsultarXID?id=" + clienteID;
    const cliente = await ConsultarServicio(URL);
    if (cliente != null) {
        $("#txtNombre").val(cliente.nombre);
        $("#txtApellido").val(cliente.apellido);
        $("#txtIdentificacion").val(cliente.identificacion);
        $("#txtDireccion").val(cliente.direccion);
        $("#txtTelefono").val(cliente.telefono);
    } else {
        $("#dvMensaje").html("El cliente no está en la base de datos");
        $("#txtNombre").val("");
        $("#txtApellido").val("");
        $("#txtIdentificacion").val("");
        $("#txtDireccion").val("");
        $("#txtTelefono").val("");
    }
}
