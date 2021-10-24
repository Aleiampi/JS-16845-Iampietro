///1- recuperar el array de presupuestos
let index = 0
class Presupuesto {
    constructor(presu) {
        this.id = index++;
        this.categoria = presu.name;

        if (presu.value == "") {
            this.monto = 0;
        } else {
            this.monto = parseInt(presu.value);
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

console.log(presupuestos)

//2- mostrarlos en pantalla
//2-a) mostrar ingresos gastos y balance

function cargarData(padre, valor) {
    print = document.createElement('p')
    print.textContent = valor;
    padre.appendChild(print);
}

const ingresosMensualesPrint = document.getElementById('ingresosMensualesPrint');
const gastosMensualesPrint = document.getElementById('gastosMensualesPrint');
const balanceMensualPrint = document.getElementById('balanceMensualPrint');

let ingresos = presupuestos[0].monto;
let gastos = 0;
let balance = ingresos - gastos;

// cargarData(ingresosMensualesPrint, ingresos);
// cargarData(gastosMensualesPrint, gastos);
// cargarData(balanceMensualPrint, balance);

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

//2-b mostrar los presupuestos estimados
//recuperarlos del array
const presusEstimados = presupuestos.filter(function(element) {
    return element.id > 0;
})

// mostrarlos en pantalla
const listaPresupuestos = document.getElementById('listaPresupuestos')
for (presu of presusEstimados) {
    let gastoPresupuestado = document.createElement('p');
    gastoPresupuestado.innerHTML = `
            <p class="list-group-item" id="${presu.categoria}Print">${presu.categoria}: $ <span>${presu.monto}</span></p>
    `
    listaPresupuestos.appendChild(gastoPresupuestado)
}



//Captura de gastos del usuario
//reset del formulario despues de enviar los datos
function clearForm() {
    document.getElementById('formGastos').reset();
}

function soloNumeros(input) {
    input.addEventListener('keyup', () => {
        input.value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    })
}

let inputGastos = document.getElementById('inputGastos')

soloNumeros(inputGastos);

//Constructor para agregar los gastos del usuario
class Gasto {
    constructor(categoria, monto, detalle) {
        this.categoria = categoria;
        this.monto = monto;
        this.detalle = detalle;
    }

    infoGasto() {

        // console.log('gastaste ' + this.monto + ' en ' + this.categoria + ' para ' + this.detalle)

        return `gastaste ${this.monto} en ${this.categoria} para  ${this.detalle}`;
    }

}

//array de gastos del mes
let gastosMes = [];
const listaGastos = document.getElementById('listaGastos')

//funcion para que el usuario agregue sus gastos, devuelve un objeto 
function agregarGasto() {

    categoriaUsuario = document.getElementById('categoriasGastos').value;
    montoUsuario = document.getElementById('inputGastos').value;
    detalleUsuario = document.getElementById('detalleGasto').value;

    return {
        categoriaUsuario,
        montoUsuario,
        detalleUsuario,
    }

}
//agregar el objeto al array de gastos
function ingresoGastos() {
    let nuevoGasto = agregarGasto();
    if (categoriaUsuario && montoUsuario !== "") {

        gastosMes.push(new Gasto(nuevoGasto.categoriaUsuario, parseInt(nuevoGasto.montoUsuario), nuevoGasto.detalleUsuario));
        printGastos();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Elije la categoria y el monto',
        })
    }

}

gastosMes.push(new Gasto('Ocio', 0, 'Gasto de Muestra =)'))
    ///agregar los gastos a la lista en pantalla
    //actualizar el total de los gastos
    //actualizar el balance
function printGastos() {

    let lastItem = gastosMes[gastosMes.length - 1]
    const printLastItem = document.createElement('li')
    printLastItem.innerText = lastItem.infoGasto();
    if (gastosMes.length > 1) {
        listaGastos.appendChild(printLastItem);
    }


    // console.log(listaGastos)
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

    clearForm();
    console.log(gastosMes);
})

// fetch('../json/data.json')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)

//         const categoria = data.categoria
//         const monto = data.monto

//     })

/*****gastos anteriores */
let gastosAnteriores = []

const cargarDatos = async() => {
    const resp = await fetch('../json/data.json')
    const data = await resp.json()

    gastosAnteriores = data

    mostarGastosAnt(gastosAnteriores)

}

cargarDatos()

const datasAntPrint = document.getElementById('datasAntPrint')
const selCategoria = document.getElementById('selCategoria')
const selMes = document.getElementById('selMes')

function mostarGastosAnt(array) {
    datasAntPrint.innerHTML = ''

    array.forEach((gasto) => {
        let item = document.createElement('tr')
        item.innerHTML += `
                    <tr>
                    <td>${gasto.categoria}</td>
                    <td>${gasto.monto}</td>
                    <td>${gasto.mes}</td>
                </tr>
        `
        datasAntPrint.appendChild(item)
    })
}


function filtro() {
    let valorFiltroCategoria = selCategoria.value
    let valorFiltroMes = selMes.value

    let arrayFiltrado = []

    if (valorFiltroCategoria == 'all') {
        arrayFiltrado = gastosAnteriores
    } else {
        arrayFiltrado = gastosAnteriores.filter(el => el.categoria == selCategoria.value)
    }


    // if (valorFiltroMes !== 'Todos') {
    //     arrayFiltrado = gastosAnteriores.filter(el => el.mes == selMes.value)

    // } else {
    //     arrayFiltrado = gastosAnteriores
    // }


    mostarGastosAnt(arrayFiltrado)
}

selCategoria.addEventListener('change', () => {
    filtro()
})

// selMes.addEventListener('change', () => {
//     filtro()
// })