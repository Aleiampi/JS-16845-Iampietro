//1 -recuperar los ingresos del storage
//2- mostrarlos en pantalla
//3- recuperar el array de presupuestos
//4 mostrarlos en pantalla
//5 - mostrar el balance en cero
//6 - captura de gastos del usuario
//7 - guardarlos en array
//8- mostrarlos en la lista de gastos
//9- ajustar los gastos
//10- ajustar el balance
//11- cambiar el color de los presupuestos segun porcentaje de gastos
//12 - ajustar el texto "quedan $x de $ x"

//1 -recuperar los ingresos del storage
let ingresos = parseInt(localStorage.getItem('ingresos'));
let gastos = 0;
let balance = ingresos - gastos;

//crear los elementos llamando al html
const ingresosMensualesPrint = document.getElementById('ingresosMensualesPrint');
const gastosMensualesPrint = document.getElementById('gastosMensualesPrint');
const balanceMensualPrint = document.getElementById('balanceMensualPrint');


//2- mostrarlos en pantalla
ingresosPrint = document.createElement('p')
ingresosPrint.textContent = ingresos;
ingresosMensualesPrint.appendChild(ingresosPrint);

gastosPrint = document.createElement('p')
gastosPrint.textContent = gastos;
gastosMensualesPrint.appendChild(gastosPrint);

balancePrint = document.createElement('p')
balancePrint.textContent = balance;
balanceMensualPrint.appendChild(balancePrint);

//3- recuperar el array de presupuestos
class Presupuesto {
    constructor(presu) {
        this.categoria = presu.categoria;
        this.monto = parseInt(presu.monto);
        if (presu.monto = isNaN) {
            this.monto = 0
        }
    }
    detallePresupuestos() {
        return `Planeas gastar ${this.monto} en ${this.categoria}`
    }
}

const presusJSON = JSON.parse(localStorage.getItem("presusJSON"));
presupuestos = [];

for (const presu of presusJSON) {
    presupuestos.push(new Presupuesto(presu));
}

//4 mostrarlos en pantalla
const listaPresupuestos = document.getElementById('listaPresupuestos')
for (presupuesto of presupuestos) {
    let gastoPresupuestado = document.createElement('p');
    gastoPresupuestado.innerHTML = `
            <p class="list-group-item" id="${presupuesto.categoria}Print">${presupuesto.categoria}: $ <span>${presupuesto.monto}</span></p>
    `
    listaPresupuestos.appendChild(gastoPresupuestado)
}

//5 - mostrar el balance en cero
//6 - captura de gastos del usuario
//reset del formulario despues de enviar los datos
function clearForm() {
    document.getElementById('formGastos').reset();
}

//Constructor para agregar los gastos del usuario
class Gasto {
    constructor(categoria, monto, detalle) {
        this.categoria = categoria;
        this.monto = monto;
        this.detalle = detalle;
    }

    infoGasto() {
        return `gastaste ${this.monto} en ${this.categoria} para  ${this.detalle}`;
    }

}

//array de gastos del mes
let gastosMes = [];
const listaGastos = document.getElementById('listaGastos')

function soloNumeros(input) {
    input.addEventListener('keyup', () => {
        input.value = input.value.replace(/\s/g, '').replace(/\D/g, '');

    })
}

let inputGastos2 = document.getElementById('inputGastos')
soloNumeros(inputGastos2)

//funcion para que el usuario agregue sus gastos por prompt, devuelve un objeto 
function agregarGasto() {

    categoriaUsuario = document.getElementById('categoriasGastos').value;
    montoUsuario = inputGastos2.value;

    detalleUsuario = document.getElementById('detalleGasto').value;

    return {
        categoriaUsuario,
        montoUsuario,
        detalleUsuario,
    };
}
//agregar el objeto al array de gastos
function ingresoGastos() {
    let nuevoGasto = agregarGasto();
    gastosMes.push(new Gasto(nuevoGasto.categoriaUsuario, parseInt(nuevoGasto.montoUsuario), nuevoGasto.detalleUsuario));
}

/********** */
///gastos precargados al array para mostrar la funcionalidad
const gasto1 = new Gasto('gastosFijos', 30000, 'alquiler');
const gasto2 = new Gasto('compras', 1500, 'Supermercado');
const gasto3 = new Gasto('ocio', 2500, 'restaurant');
const gasto4 = new Gasto('compras', 5000, 'carniceria');
const gasto5 = new Gasto('gastosFijos', 1200, 'internet');
const gasto6 = new Gasto('ocio', 1800, 'paseo');

gastosMes.push(gasto1, gasto2, gasto3, gasto4, gasto5, gasto6);

///agregar los datos precargados del array al html (temporal, la app final no tiene datos precargados) 
///>>>Desafio 2: agregar elementos al htm de un array
function printGastosPrecargados() {

    for (let gasto of gastosMes) {

        const itemLista = document.createElement('li')
        itemLista.innerText = gasto.infoGasto();
        listaGastos.appendChild(itemLista);

    }
    console.log('last' + listaGastos)
    gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
    gastosPrint.textContent = gastos;
}
printGastosPrecargados();

/************************** */

///agregar los gastos a la lista en pantalla
//actualizar el total de los gastos
//actualizar el balance
function printGastos() {

    let lastItem = gastosMes[gastosMes.length - 1]

    const printLastItem = document.createElement('li')
    printLastItem.innerText = lastItem.infoGasto();
    listaGastos.appendChild(printLastItem);

    console.log(listaGastos)
    gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
    gastosPrint.textContent = gastos;
    balance = ingresos - gastos;
    balancePrint.textContent = balance
}


//Evento para que se agreguen los datos al array y se actualice la info en pantalla
const btnEnviarGasto = document.getElementById('btnGasto')
btnGasto.addEventListener('click', (e) => {
    e.preventDefault();
    ingresoGastos();
    printGastos();
    clearForm();
    console.log(gastosMes);
})