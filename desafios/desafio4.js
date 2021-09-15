/*****
balance = 0

debe = suma de los ingresos

haber = suma de los gastos

balance debe - haber ***/

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