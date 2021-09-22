class Gasto {
    constructor(monto, categoria, fecha) {
        this.monto = monto;
        this.categria = categoria;
        this.fecha = fecha;
    }
}

function agregarIngreso() {
    let pedirIngreso = parseInt(prompt('Cuales son sus ingresos mensuales? (en numeros, sin puntos ni comas)'));

    while (isNaN(pedirIngreso)) {
        alert('No es un numero.')
        pedirIngreso = parseInt(prompt('Cuales son sus ingresos mensuales? (en numeros, sin puntos ni comas)'));
    }

    let ingresosUsuario = pedirIngreso;
    return ingresosUsuario;

}

gastoTotalMes = 0

function totalGastosMes() {
    gastoTotalMes = gasto1.monto + gasto2.monto + gasto4.monto;
    return gastoTotalMes;
}

function cierre() {
    let saldo = ingresos - gastoTotalMes;
    return saldo;
}

var ingresos = agregarIngreso();
console.log(ingresos)
document.write('Sus ingresos son $' + ingresos + '<br>')



let gastoSuperUsuario = parseInt(prompt('Cuanto gastó en supermercado?'));
let gastoVerduleriaUsuario = parseInt(prompt('Cuanto gastó en verduleria?'));
let gastoImpuestosUsuario = parseInt(prompt('Cuanto gastó impuestos?'));



let gasto1 = new Gasto(gastoSuperUsuario, "supermercado", "abril");
console.log(gasto1)

let gasto2 = new Gasto(gastoVerduleriaUsuario, "verduleria", "abril")
console.log(gasto2)

let gasto4 = new Gasto(gastoImpuestosUsuario, "impuestos", "abril");
console.log(gasto4)

totalGastosMes();
console.log(gastoTotalMes)

let balance = cierre();
alert("Su saldo al finalizar el mes es de $" + balance)
document.write('Sus balance a fin de mes es de $' + balance + '<br>')