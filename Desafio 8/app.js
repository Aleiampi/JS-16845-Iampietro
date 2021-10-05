/**
 * bal inicial= 0
 * ingreso inicial = 0
 * gasto inicial = 0
 * 
 * 1-pedir al usuario sus ingresos  :)
 *          >>mostrar ingresos en pantalla  :)
 * 2- pedir al usuario sus gastos 
 *         
 * 3-crear array con los gastos  :)
 *          >>mostrar el total de gastos mensual 
 * 4-mostrar el balance actualizado (ingresos -gastos)
 * 5-crear lista con los gastos  
 *          >>mostrar gastos en pantalla :)
 *          >>ajustar balance
 *          >>ajustar total gastos
 *6-mostrar gastos por categoria    
            >>filtrar array por cat y mostrar en pantalla
 *          
 */


let ingresos = 0;
let gastos = 0;
let balance = ingresos - gastos;

//rellenar el formulario
//crear los elementos llamando al html
const ingresosMensualesPrint = document.getElementById('ingresosMensualesPrint');
const gastosMensualesPrint = document.getElementById('gastosMensualesPrint');
const balanceMensualPrint = document.getElementById('balanceMensualPrint');

//crear los parrafor originales mostrando el bal inicial de cero
ingresosPrint = document.createElement('p')
ingresosPrint.textContent = ingresos;
ingresosMensualesPrint.appendChild(ingresosPrint);

gastosPrint = document.createElement('p')
gastosPrint.textContent = gastos;
gastosMensualesPrint.appendChild(gastosPrint);

balancePrint = document.createElement('p')
balancePrint.textContent = balance;
balanceMensualPrint.appendChild(balancePrint);


//********1-pedir al usuario sus ingresos
//funcion para que el usuario agregue sus ingresos por prompt 
function agregarIngreso() {
    let ingresosUsuario = parseInt(prompt('Cuáles son tus ingresos mensuales? (en números, sin puntos ni comas)'));

    while (isNaN(ingresosUsuario)) {
        alert('El número ingresado no es válido');
        ingresosUsuario = parseInt(prompt('Cuáles son tus ingresos mensuales? (en números, sin puntos ni comas)'));
    }
    return ingresos = ingresosUsuario + ingresos;
}

//ejecuto pedir ingresos al usuario
ingresos = agregarIngreso();
console.log(ingresos)
    //actualizar los ingresos en el html segun el dato ingresado por el usuario
ingresosPrint.textContent = ingresos;


///******2- pedir al usuario sus gastos*****

//Constructor para agregar los gastos del usuario
class Gasto {
    constructor(categoria, monto, detalle) {
        this.categoria = categoria;
        this.monto = monto;
        this.detalle = detalle;
    }

    infoGasto() {

        console.log('gastaste ' + this.monto + ' en ' + this.categoria + ' para ' + this.detalle)

        return `gastaste ${this.monto} en ${this.categoria} para  ${this.detalle}`;
    }

}

//array de gastos del mes
let gastosMes = [];

//funcion para que el usuario agregue sus gastos por prompt, devuelve un objeto
function agregarGasto() {

    categoriaUsuario = "Compras"
    detalleUsuario = prompt('En qué gastaste?');
    montoUsuario = parseInt(prompt('Cuanto gastaste?'));
    while (isNaN(montoUsuario)) {
        alert('El número ingresado no es válido');
        montoUsuario = parseInt(prompt('Cuanto gastaste?'));
    }

    return {
        categoriaUsuario,
        montoUsuario,
        detalleUsuario,
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
        gastosMes.push(new Gasto(nuevoGasto.categoriaUsuario, nuevoGasto.montoUsuario, nuevoGasto.detalleUsuario))
        console.log(gastosMes) //temporal, a remover
        preguntaGastos = prompt('Quiere ingresar un gasto (Y/N)');
    }
}
//ejecuto pedir gastos al usuario
ingresoGastos();



///gastos precargados al array para mostrar la funcionalidad
const gasto1 = new Gasto('gastosFijos', 30000, 'alquiler');
const gasto2 = new Gasto('compras', 1500, 'Supermercado');
const gasto3 = new Gasto('ocio', 2500, 'restaurant');
const gasto4 = new Gasto('compras', 5000, 'carniceria');
const gasto5 = new Gasto('gastosFijos', 1200, 'internet');
const gasto6 = new Gasto('ocio', 1800, 'paseo');

gastosMes.push(gasto1, gasto2, gasto3, gasto4, gasto5, gasto6);


console.log(gastosMes);


//agrego los gastos del array al html como lista en el div "Detalle de sus gastos"
for (let gasto of gastosMes) {

    const itemLista = document.createElement('li')
    itemLista.innerText = gasto.infoGasto();
    listaGastos.appendChild(itemLista);

}
console.log(listaGastos)

///hasta aca funciona ok

//sumar los gastos del mes con reduce >>
gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)

console.log(gastosMes)
console.log(gastos)

//actualizo el monto del <p> que contiene la suma de los gastos
gastosPrint.textContent = gastos;
//actualizo el monto del <p> que contiene el balance
balancePrint.textContent = ingresos - gastos;