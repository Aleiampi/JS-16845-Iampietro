/*****var balance = 0

debe ?
    haber ?

    debe = suma de los ingresos

haber = suma de los gastos***/

// ingresos = 0
// gastos = 0

function agregarIngreso() {
    let pedirIngreso = parseInt(prompt('Cuales son sus ingresos mensuales? (en numeros, sin puntos ni comas)'));

    while (isNaN(pedirIngreso)) {
        alert('No es un numero.')
        pedirIngreso = parseInt(prompt('Cuales son sus ingresos mensuales? (en numeros, sin puntos ni comas)'));
    }

    let ingresosUsuario = pedirIngreso;
    return ingresosUsuario;

}


function agregarGasto() {
    let pedirGasto = parseInt((prompt('Cuales son sus gastos mensuales? (en numeros, sin puntos ni comas')));

    while (isNaN(pedirGasto)) {
        alert('No es un numero.')
        pedirGasto = parseInt(prompt('Cuales son sus gastos mensuales? (en numeros, sin puntos ni comas)'));
    }

    let gastosUsuario = pedirGasto;
    return gastosUsuario;

}

function cierre() {
    let saldo = ingresos - gastos;
    return saldo;
}

var ingresos = agregarIngreso();
console.log(ingresos)
document.write('Sus ingresos son $' + ingresos + '<br>')

var gastos = agregarGasto();
console.log(gastos)
document.write('Sus gastos son $' + gastos + '<br>')

let balance = cierre();
alert("Su saldo al finalizar el mes es de $" + balance)
document.write('Sus balance a fin de mes es de $' + balance + '<br>')

function calcularTasaAhorro() {
    let pedirTasa = parseInt(prompt('Qué porcentaje de sus ingresos quiere guardar para ahorros?'));
    while (isNaN(pedirTasa)) {
        alert('No es un numero.')
        pedirTasa = parseInt(prompt('Qué porcentaje de sus ingresos quiere guardar para ahorros?'));
    }
    let tasaDeAhorro = pedirTasa;

    return tasaDeAhorro;
}

function calcularAhorro() {
    let calculoAhorro = (ingresos * tasa) / 100;
    return calculoAhorro;
}

function calcularGasto() {
    let calculoGastos = ingresos - ahorro;
    return calculoGastos;
}


var tasa = calcularTasaAhorro();
var ahorro = calcularAhorro();
var gastosAhorro = calcularGasto();
alert('Usted deberia guardar $' + ahorro + " por mes, y gastar solo $" + gastosAhorro)
document.write('Usted deberia guardar $' + ahorro + " por mes, y gastar solo $" + gastosAhorro)