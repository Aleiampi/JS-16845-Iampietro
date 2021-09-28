/*****
balance = 0

debe = suma de los ingresos

haber = suma de los gastos

balance debe - haber
=>pedir ingresos
=>pedir gastos x veces
=>agregar gastos a array
=>mostrar gastos por categoria?
=>mostrar balance
=>ahorro ofrecer ahorro por mes segun porcenaje elegido por usuario

***/
// ingresos = 0
// gastos = 0

//Constructor para agregar los gastos del usuario
class Gasto {
    constructor(categoria, monto, mes) {
        this.categria = categoria;
        this.monto = monto;
        this.mes = mes;
    }

    infoGasto() {
        console.log('gastaste ' + this.monto + ' en ' + this.categria + ' en el mes de ' + this.mes)
    }
}

//declaro total
let gastoTotalMes = 0

//array de gastos del mes
let totalGastosMes = [];

//agregar ingresos
//funcion para que el usuario agregue sus ingresos por prompt 
function agregarIngreso() {
    let ingresosUsuario = parseInt(prompt('Cuáles son tus ingresos mensuales? (en números, sin puntos ni comas)'));

    while (isNaN(ingresosUsuario)) {
        alert('El número ingresado no es válido');
        ingresosUsuario = parseInt(prompt('Cuáles son tus ingresos mensuales? (en números, sin puntos ni comas)'));
    }
    return ingresosUsuario;
}

//ejecuto pedir ingresos al usuario
var ingresos = agregarIngreso();
console.log(ingresos)
document.write('Sus ingresos son $' + ingresos + '<br>')

//funcion para que el usuario agregue sus gastos por prompt, devuelve un objeto
function agregarGasto() {

    categoriaUsuario = prompt('En qué gastaste?');
    montoUsuario = parseInt(prompt('Cuanto gastaste?'));
    while (isNaN(montoUsuario)) {
        alert('El número ingresado no es válido');
        montoUsuario = parseInt(prompt('Cuanto gastaste?'));
    }


    let n = new Date();
    let mes = n.getMonth() + 1;
    mesUsuario = mes

    return {
        categoriaUsuario,
        montoUsuario,
        mesUsuario,
    };

}

//funcion para pedir gastos al usuario, incluye la funcion para que el usuario
//ingrese sus gastos por propt y agrega ese objeto al array
function ingresoGastos() {
    let preguntaGastos = prompt('Quiere ingresar un gasto (Y/N)');
    while ((preguntaGastos == 'Y')) {
        //creo el nuevo gasto
        let nuevoGasto = agregarGasto()
        console.log(nuevoGasto) //temporal, a remover
            //agrego al arrray de gastos del mes
        totalGastosMes.push(new Gasto(nuevoGasto.categoriaUsuario, nuevoGasto.montoUsuario, nuevoGasto.mesUsuario))
        console.log(totalGastosMes) //temporal, a remover
        preguntaGastos = prompt('Quiere ingresar un gasto (Y/N)');
    }
}
//ejecuto pedir gastos al usuario
ingresoGastos();

//sumo los gastos del mes para obtener el total mensual
//opcion #1 con for each>>
// totalGastosMes.forEach((expense) => {

//     gastoTotalMes = (expense.monto += gastoTotalMes)
//     return gastoTotalMes
// })

//opcion #2 para sumar los gastos del mes con reduce >>
gastoTotalMes = totalGastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)

console.log(gastoTotalMes)
document.write('Sus gastos son $' + gastoTotalMes + '<br>')


//funcion para calcular balance
function cierre() {
    let saldo = ingresos - gastoTotalMes;
    return saldo;
}

//ejecuto funcion para crear el balance final
let balance = cierre();
alert("Su saldo al finalizar el mes es de $" + balance)
document.write('Sus balance a fin de mes es de $' + balance + '<br>')

//ordenar gastos de menos a mayor
let gastosOrdenados = totalGastosMes.sort((a, b) => a.monto - b.monto);
console.log(gastosOrdenados)