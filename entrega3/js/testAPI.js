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