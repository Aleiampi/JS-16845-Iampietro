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
let presupuestos = [];

for (const presu of presusJSON) {
    presupuestos.push(new Presupuesto(presu));
}

console.log(presupuestos)

//2- mostrarlos en pantalla
//2-a) mostrar ingresos gastos y balance

// function cargarData(padre, valor) {
//     print = document.createElement('p')
//     print.textContent = valor;
//     padre.appendChild(print);
// }

const ingresosMensualesPrint = document.getElementById('ingresosMensualesPrint');
const gastosMensualesPrint = document.getElementById('gastosMensualesPrint');
const balanceMensualPrint = document.getElementById('balanceMensualPrint');

let ingresos = presupuestos[0].monto;
let gastos = 0;
let balance = ingresos - gastos;


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
            <div class="list-group-item">
                <p class="presuTitle" id="${presu.categoria}Print">${presu.categoria}: $ <span>${presu.monto}</span></p>
                
                <p>Ya gastaste: $ <span id="${presu.categoria}GastadoPrint"> </span></p>
                <p>Quedan: $ <span id="${presu.categoria}SaldoPrint"> </span></p>
             </div>
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

        ///act presupuestos
        sumarCategoria('gastosFijos',1,gastosFijosGastadoPrint,gastosFijosSaldoPrint, gastosFijosPrint)
        sumarCategoria('compras',2,comprasGastadoPrint,comprasSaldoPrint, comprasPrint)
        sumarCategoria('transporte',3,transporteGastadoPrint,transporteSaldoPrint, transportePrint)
        sumarCategoria('ocio',4,ocioGastadoPrint,ocioSaldoPrint,ocioPrint)




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

    ///actualizar totales
    gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
    gastosPrint.textContent = gastos;
    balance = ingresos - gastos;
    balancePrint.textContent = balance
}


///filtrar los gastos por categoria
let gastosFijosPrint = document.getElementById ('gastosFijosPrint')
let comprasPrint = document.getElementById ('comprasPrint')
let transportePrint = document.getElementById ('transportePrint')
let ocioPrint = document.getElementById ('ocioPrint')

let gastosFijosGastadoPrint = document.getElementById('gastosFijosGastadoPrint')
let gastosFijosSaldoPrint = document.getElementById('gastosFijosSaldoPrint')
let comprasGastadoPrint = document.getElementById('comprasGastadoPrint')
let comprasSaldoPrint = document.getElementById('comprasSaldoPrint')
let transporteGastadoPrint = document.getElementById('transporteGastadoPrint')
let transporteSaldoPrint = document.getElementById('transporteSaldoPrint')
let ocioGastadoPrint = document.getElementById('ocioGastadoPrint')
let ocioSaldoPrint = document.getElementById('ocioSaldoPrint')

// function totalesPresus(){
//     let listaGastoFijos = gastosMes.filter( el => el.categoria == 'gastosFijos')
//     gastosFijosGastado = listaGastoFijos.reduce((sumatoria, expense) => sumatoria + parseInt(expense.monto), 0)
//     gastosFijosGastadoPrint.textContent = gastosFijosGastado
//     let saldoGastosFijos = presupuestos[1].monto - gastosFijosGastado
//     gastosFijosSaldoPrint.textContent = saldoGastosFijos



//     let totalCompras = gastosMes.filter( el => el.categoria == 'compras')
//     console.log(totalCompras)
//     let totalTransporte = gastosMes.filter( el => el.categoria == 'transporte')
//     console.log(totalTransporte)
//     let totalOcio = gastosMes.filter( el => el.categoria == 'ocio')
//     console.log(totalOcio)
// }

// function totalesPresus(cat, print, saldoprint){
//     // let filtro = cat
//     let listaGastos = gastosMes.filter( el => el.categoria == cat)
//     gastosGastado = listaGastos.reduce((sumatoria, expense) => sumatoria + parseInt(expense.monto), 0);
// console.log(print)
//     // print.textContent = gastosGastado
//     let saldoGastos = presupuestos[1].monto - gastosGastado
//     saldoprint.textContent = saldoGastos
// }

// function totalesPresus(cat){
//     let listaGastos = gastosMes.filter( el => el.categoria == cat)
//     gastadoCat = listaGastos.reduce((sumatoria, expense) => sumatoria + parseInt(expense.monto), 0);
// console.log(gastadoCat)
//     // print.textContent = gastosGastado
//     let saldo = presupuestos[1].monto - gastadoCat
//     // saldoprint.textContent = saldoGastos
//     console.log(gastadoCat)
// }

function sumarCategoria (categoria, id, print, saldo, titulo){
    let gastosFiltrados = gastosMes.filter( el => el.categoria == categoria)
    totalCategoria = gastosFiltrados.reduce((sumatoria, expense) => sumatoria + parseInt(expense.monto), 0);
    // console.log(totalCategoria)
    let saldoCategoria = presupuestos[id].monto - totalCategoria
    // console.log(saldoCategoria)
    //cambiar color de fondo segun saldo
    // if (presupuestos[id].monto < (saldoCategoria*2) || ) {
    //     titulo.classList.add("presuok")
    //     titulo.classList.remove("presuAlerta")
    //     titulo.classList.remove("presuNegativo")
    // } else if (saldoCategoria < (presupuestos[id].monto/2)){
    //     titulo.classList.add("presuAlerta")
    //     titulo.classList.remove("presuok")
    //     titulo.classList.remove("presuNegativo")
    // }
    //  if (saldoCategoria > presupuestos[id].monto){
    //     titulo.classList.add("presuNegativo")
    //     titulo.classList.remove("presuAlerta")
    //     titulo.classList.remove("presuok")
    // }



    // if (presupuestos[id].monto > saldoCategoria) { //se pone verde
    //     titulo.classList.add("presuok")
    //     titulo.classList.remove("presuAlerta")
    //     // titulo.classList.remove("presuNegativo")
    // } else if (saldoCategoria < (presupuestos[id].monto/2)){
    //         titulo.classList.add("presuAlerta")
    //         titulo.classList.remove("presuok")
    //         // titulo.classList.remove("presuNegativo")
    //     }
        
    //     // else if (presupuestos[id].monto < saldoCategoria){
    //     //            titulo.classList.add("presuNegativo")
    //     // titulo.classList.remove("presuAlerta")
    //     // titulo.classList.remove("presuok")
    //     // }

        if (saldoCategoria < (presupuestos[id].monto/2) && presupuestos[id].monto > saldoCategoria){
            titulo.classList.add("presuAlerta")
            titulo.classList.remove("presuNegativo")
        } 
        if (saldoCategoria <= 0) { //se pone verde
                titulo.classList.add("presuNegativo")
                titulo.classList.remove("presuAlerta")
                    // titulo.classList.remove("presuNegativo")
                }
        // if 
            // titulo.classList.remove("presuNegativo")
        // } else if (presupuestos[id].monto > saldoCategoria) { //se pone verde
        //     titulo.classList.add("presuNegativo")
        //     titulo.classList.remove("presuAlerta")
        //         // titulo.classList.remove("presuNegativo")
        //     }



    
    print.textContent = totalCategoria
    saldo.textContent = saldoCategoria
}

// totalesPresus('gastosFijos')




//Evento para que se agreguen los datos al array y se actualice la info en pantalla
const btnEnviarGasto = document.getElementById('btnGasto')
btnGasto.addEventListener('click', (e) => {
    e.preventDefault();

    ingresoGastos();

    //act presus
    // totalesPresus()
    // sumarCategoria('gastosFijos',1,gastosFijosGastadoPrint,gastosFijosSaldoPrint)

    clearForm();
    console.log(gastosMes);
})


/*****gastos anteriores */
document.getElementById('contAnteriores').style.display = 'none';
let verAnteriores = document.getElementById('verAnteriores')




let gastosAnteriores = []

const cargarDatos = async() => {
    const resp = await fetch('../json/data.json')
    const data = await resp.json()

    gastosAnteriores = data

    mostarGastosAnt(gastosAnteriores)

}

verAnteriores.addEventListener('click', (e) => {
    e.preventDefault()
    cargarDatos()
    document.getElementById('contAnteriores').style.display = 'block';
})

// cargarDatos()

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


    let arrayFiltrado = []

    if (valorFiltroCategoria == 'all') {
        arrayFiltrado = gastosAnteriores
    } else {
        arrayFiltrado = gastosAnteriores.filter(el => el.categoria == selCategoria.value)
    }

    mostarGastosAnt(arrayFiltrado)
}

selCategoria.addEventListener('change', () => {
    filtro()
})