///iniciales
let ingresos = 0;
let gastos = 0;
let balance = ingresos - gastos;
let presusMes = [];


///constructor presupuestos
class Presupuesto {
    constructor(categoria, monto) {
        this.categoria = categoria;
        this.monto = monto;
    }
    detallePresupuestos() {
        return `Planeas gastar ${this.monto} en ${this.categoria}`
    }
}

// constantes para mostrar en pantalla
// let reporte = document.getElementById('reporte'),
//     formGastos = document.getElementById('formGastos'),
let inputIngresos = document.getElementById('inputIngresos'),
    ingresosPrint = document.getElementById('ingresosPrint'),
    inputGFijos = document.getElementById('inputGFijos'),
    inputCompras = document.getElementById('inputCompras'),
    inputTrasnporte = document.getElementById('inputTrasnporte'),
    inputOcio = document.getElementById('inputOcio'),
    gastosFijosPrint = document.getElementById('gastosFijosPrint'),
    comprasPrint = document.getElementById('comprasPrint'),
    transportePrint = document.getElementById('transportePrint'),
    ocioPrint = document.getElementById('ocioPrint'),
    gastosPrint = document.getElementById('gastosPrint'),
    balancePrint = document.getElementById('balancePrint'),
    btnAbrirFormulario = document.getElementById('btn-abrir-formulario'),
    datosUsuario = document.getElementById('datosUsuario'),
    botonEnviar = document.getElementById('botonEnviar');


//abrir el formulario 
$('#btn-abrir-formulario').on('click', (() => {
    $("#datosUsuario").toggleClass("activo");
}))

///capturar los datos del usuario y mostrarlos en pantalla
function capturarDatos(input, print) {
    input.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        input.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');
        if (input.value == "") {
            valorInput = 0;
        }
        print.textContent = valorInput;
    })
    
    input.addEventListener('blur', () => {
        let gastosSuma = parseInt(gastosFijosPrint.textContent) + parseInt(comprasPrint.textContent) + parseInt(transportePrint.textContent) + parseInt(ocioPrint.textContent);
        gastosPrint.textContent = gastosSuma;

        let balVivo = parseInt(ingresosPrint.textContent) - parseInt(gastosPrint.textContent);
        balancePrint.textContent = balVivo;

        if (balVivo < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Planeas gastar mas de lo que ganas!',
            })
        }
    })
}



capturarDatos(inputIngresos, ingresosPrint);
capturarDatos(inputGFijos, gastosFijosPrint);
capturarDatos(inputCompras, comprasPrint);
capturarDatos(inputTrasnporte, transportePrint);
capturarDatos(inputOcio, ocioPrint);


///guardar datos en submit
$("form").on('submit', (function(e) {
    e.preventDefault();
    let capturaInfo = ($(this).serializeArray());
    console.log(capturaInfo);
    const presusJSON = JSON.stringify(capturaInfo);
    localStorage.setItem("presusJSON", presusJSON);
    window.open('./diario.html', "_self")
}));