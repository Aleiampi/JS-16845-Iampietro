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
const presusEstimados = presupuestos.filter(function (element) {
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

//solo permitir numeros en el input
function soloNumeros(input) {
    input.addEventListener('keyup', () => {
        input.value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    })
}

let inputGastos = document.getElementById('inputGastos')

soloNumeros(inputGastos);

//Constructor para agregar los gastos del usuario
let idGasto = 0
class Gasto {

    constructor(categoria, monto, detalle) {
        this.id = idGasto++
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
        sumarCategoria('gastosFijos', 1, gastosFijosGastadoPrint, gastosFijosSaldoPrint, gastosFijosPrint)
        sumarCategoria('compras', 2, comprasGastadoPrint, comprasSaldoPrint, comprasPrint)
        sumarCategoria('transporte', 3, transporteGastadoPrint, transporteSaldoPrint, transportePrint)
        sumarCategoria('ocio', 4, ocioGastadoPrint, ocioSaldoPrint, ocioPrint)

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
    printLastItem.setAttribute('id', lastItem.id);
    printLastItem.classList.add("gastoUnico");
    // printLastItem.innerText = lastItem.infoGasto();

    printLastItem.innerHTML = `
        ${lastItem.infoGasto()}
        <button type="button" class="btn-close eliminarGasto" aria-label="Close" id="btn-${lastItem.id}"></button>
    `

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
let gastosFijosPrint = document.getElementById('gastosFijosPrint')
let comprasPrint = document.getElementById('comprasPrint')
let transportePrint = document.getElementById('transportePrint')
let ocioPrint = document.getElementById('ocioPrint')

let gastosFijosGastadoPrint = document.getElementById('gastosFijosGastadoPrint')
let gastosFijosSaldoPrint = document.getElementById('gastosFijosSaldoPrint')
let comprasGastadoPrint = document.getElementById('comprasGastadoPrint')
let comprasSaldoPrint = document.getElementById('comprasSaldoPrint')
let transporteGastadoPrint = document.getElementById('transporteGastadoPrint')
let transporteSaldoPrint = document.getElementById('transporteSaldoPrint')
let ocioGastadoPrint = document.getElementById('ocioGastadoPrint')
let ocioSaldoPrint = document.getElementById('ocioSaldoPrint')


////sumar los gastos por categoria y actualizar los balances por cat
function sumarCategoria(categoria, id, print, saldo, titulo) {
    let gastosFiltrados = gastosMes.filter(el => el.categoria == categoria)
    totalCategoria = gastosFiltrados.reduce((sumatoria, expense) => sumatoria + parseInt(expense.monto), 0);
    // console.log(totalCategoria)
    let saldoCategoria = presupuestos[id].monto - totalCategoria


    if (saldoCategoria < (presupuestos[id].monto / 2) && presupuestos[id].monto > saldoCategoria) {
        titulo.classList.add("presuAlerta")
        titulo.classList.remove("presuNegativo")
    }
    if (saldoCategoria <= 0) { //se pone verde
        titulo.classList.add("presuNegativo")
        titulo.classList.remove("presuAlerta")
        // titulo.classList.remove("presuNegativo")
    }

    print.textContent = totalCategoria
    saldo.textContent = saldoCategoria
}


//Evento para que se agreguen los datos al array y se actualice la info en pantalla
const btnEnviarGasto = document.getElementById('btnGasto')
btnGasto.addEventListener('click', (e) => {
    e.preventDefault();

    ingresoGastos();

    clearForm();
    console.log(gastosMes);
})


///eliminar gasto
// let eliminarGasto = document.querySelectorAll('.eliminarGasto')
// $(".eliminarGasto").on("click", '.delete', function() {
//     var confirmation = confirm('Are you sure you want to delete this action plan/s?');
//     if (confirmation) {
//         $(this).closest('.gastoUnico').remove();
//     }
// });



// Array.prototype.remove = function (key, value) {
//     const index = this.findIndex(obj => obj[key] === value);
//     return index >= 0 ? [
//         ...this.slice(0, index),
//         ...this.slice(index + 1)
//     ] : this;
// };

function resetColor(titulo) {
    titulo.classList.remove("presuNegativo");
    titulo.classList.remove("presuAlerta")
}


//eliminar gastos de la lista
$(document).on("click", ".eliminarGasto", function () {


    var confirmar = confirm('Esta seguro que quiere elimiar este gasto?');
    if (confirmar == true) {

        //encontara el id del objeto
        let idABorrar = $(this).closest("li").attr('id')
        console.log(idABorrar)

        //eliminar el gasto del array
        gastosMes = $.grep(gastosMes, function (e) {
            return e.id != idABorrar;
        });

        console.log(gastosMes)

        //limpiar la lista de gastos y volver a imprimirla
        listaGastos.innerHTML = ""

        for (let gasto of gastosMes) {

            if (gasto.id != 0) {
                const itemLista = document.createElement('li')

                itemLista.setAttribute('id', gasto.id);
                itemLista.classList.add("gastoUnico");

                itemLista.innerHTML = `
                         ${gasto.infoGasto()}
                         <button type="button" class="btn-close eliminarGasto" aria-label="Close" id="btn-${gasto.id}"></button>
                    `
                listaGastos.appendChild(itemLista);
            }
        }

        //actualizar totales
        gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
        gastosPrint.textContent = gastos;
        balance = ingresos - gastos;
        balancePrint.textContent = balance

        //reset color presus
        resetColor(gastosFijosPrint)
        resetColor(gastosFijosPrint)
        resetColor(transportePrint)
        resetColor(ocioPrint)

        ///actualizar presupuestos
        sumarCategoria('gastosFijos', 1, gastosFijosGastadoPrint, gastosFijosSaldoPrint, gastosFijosPrint)
        sumarCategoria('compras', 2, comprasGastadoPrint, comprasSaldoPrint, comprasPrint)
        sumarCategoria('transporte', 3, transporteGastadoPrint, transporteSaldoPrint, transportePrint)
        sumarCategoria('ocio', 4, ocioGastadoPrint, ocioSaldoPrint, ocioPrint)

        //borrar de listya en pantalla
        $(this).closest(".gastoUnico").remove();

    }

});





/************************gastos anteriores *********************/
document.getElementById('contAnteriores').style.display = 'none';
let verAnteriores = document.getElementById('verAnteriores')

//crear array gastos ant
let gastosAnteriores = []

//recuperar data 
const cargarDatos = async () => {
    const resp = await fetch('../json/data.json')
    const data = await resp.json()

    gastosAnteriores = data

    mostarGastosAnt(gastosAnteriores)

}

//boton mostrar gastos ant
verAnteriores.addEventListener('click', (e) => {
    e.preventDefault()
    cargarDatos()
    document.getElementById('contAnteriores').style.display = 'block';
})


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

//filtrar gastos por categoria
// function filtro() {
//     let valorFiltroCategoria = selCategoria.value


//     let arrayFiltrado = []

//     if (valorFiltroCategoria == 'all') {
//         arrayFiltrado = gastosAnteriores
//     } else {
//         arrayFiltrado = gastosAnteriores.filter(el => el.categoria == selCategoria.value)
//     }

//     mostarGastosAnt(arrayFiltrado)
// }

// selCategoria.addEventListener('change', () => {
//     filtro()
// })


function filtrarAnt(select, param) {
    select.addEventListener('change', () => {
        let valorFiltroCategoria = select.value


        let arrayFiltrado = []

        param = el.param

        if (valorFiltroCategoria == 'all') {
            arrayFiltrado = gastosAnteriores
        } else {
            arrayFiltrado = gastosAnteriores.filter(el => param == select.value)
        }

        mostarGastosAnt(arrayFiltrado)
    })


}

filtrarAnt(selCategoria, 'categoria')
filtrarAnt(selMes, 'mes')