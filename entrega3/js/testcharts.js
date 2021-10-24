// let gastosPrevios = []
// /************funciona********* */
// let gastoPrev = document.getElementById('gastoPrev')
// getDataAnt('../json/data.json');

// async function getDataAnt(file) {
//     let respuesta = await fetch(file);
//     let data = await respuesta.text();
//     document.getElementById("gastosAnt").innerHTML = data;
//     gastosPrevios = data
//         // document.getElementById('gastosPrevios').innerHTML = gastosPrevios

//     gastosPrevios.forEach(gasto => {
//         let gastoViejo = document.createElement('p');
//         gastoViejo.texcontent = `
//             <p class="list-group-item">${gasto.categoria}: $ <span>${gasto.monto}</span></p>
//     `
//         gastoPrev.appendChild(gastoViejo)
//     })
// }
/**********************************no funciona */
// fetch('../json/data.json')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)
//         gastosPrevios = data
//             // const categoria = data.categoria
//             // const monto = data.monto
//             // const mes = data.mes

//     })



// const cargarGastosPrevios = async() => {
//     const respuesta = await fetch('../json/data.json')
//     const data = await respuesta.json()

//     gastosPrevios = data
//         // printGastosAnt (gastosAnteriores)
//     console.log(gastosPrevios)
// }



// const cargarGastosPrevios = async() => {
//     let respuesta = await fetch('../json/data.json')
//     let data = await respuesta.json()
//     console.log(data)

//     gastosPrevios = data

//     printGastosAnt(gastosPrevios)

// }


// async function getText('../json/data.json') {
//     let x = await fetch('../json/data.json');
//     let y = await x.text();
//     myDisplay(y);
// }

// let dataRecuperata = data.sting



// fetch('../json/data.json')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)

//         gastosPrevios = data
//             // const categoria = data.categoria
//             // const monto = data.monto
//             // const mes = data.mes
//     })



// console.log('hola')


let gastosPrevios = []

class GastoAnterior {
    constructor(item) {
        this.categoria = item.categoria;
        this.monto = item.monto;
        this.mes = item.mes;
    }
}

document.getElementById('btnRecuperarData').addEventListener('click', traerDatos)

function traerDatos() {

    const datosGuardados = new XMLHttpRequest();

    datosGuardados.open('GET', '../json/data.json', true)

    datosGuardados.send();

    datosGuardados.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);

            let dataAnt = JSON.parse(this.responseText)

            let dataRecPrint = document.getElementById('dataRecPrint')
            dataRecPrint.innerHTML = '';
            console.log(dataAnt)

            for (let item of dataAnt) {

                console.log(item.categoria)
                dataRecPrint.innerHTML += `
                <tr>
                <td>${item.categoria}</td>
                <td>${item.monto}</td>
                <td>${item.mes}</td>
              </tr>
                `
            }

            for (let item of dataAnt) {
                gastosPrevios.push(new GastoAnterior(item))
            }

        }
    }
}

let filtroCategoria = document.getElementById('filtroCategoria')


function filtroGastos() {
    let catElegidaFiltro = filtroCategoria.value

    let arrayFiltrado = []

    if (catElegidaFiltro == 'gFijos') {
        arrayFiltrado = gastosPrevios.filter(el => el.categoria == filtroCategoria.value)
    }

    for (let item of arrayFiltrado) {

        console.log(item.categoria)
        dataRecPrint.innerHTML += `
        <tr>
        <td>${item.categoria}</td>
        <td>${item.monto}</td>
        <td>${item.mes}</td>
      </tr>
        `
    }

}

filtroCategoria.addEventListener('change', () => {
    filtroGastos()
})