 //////************  INGRESOS ***************////////
 //ingresos iniciales
 let ingresos = 0;
 ///Crear variables
 const inputIngresos = document.getElementById('inputIngresos')
 const btnEnviarIngresos = document.getElementById('btnEnviarIngresos')
 let ingresosEnPantalla = document.getElementById('ingresosEnPantalla');
 const formIngresos = document.getElementById('formIngresos');
 let btnResetIngresos = document.getElementById('btnResetIngresos');
 //crear span para imprimir los ingresos en pantalla ///
 let ingresosPrint = document.createElement('span')
 ingresosEnPantalla.appendChild(ingresosPrint)
 ingresosPrint.textContent = ingresos




 //evitar que se ingresen los datos con tecla enter
 document.addEventListener('DOMContentLoaded', () => {
     document.querySelectorAll('input[type=text]').forEach(node => node.addEventListener('keypress', e => {
         if (e.keyCode == 13) {
             e.preventDefault();
         }
     }))
 });

 //reset input despues de ingreso
 function clear() {
     document.getElementById('formIngresos').reset();
 }

 ////ingresar solo numeros
 function soloNumeros(input) {
     input.addEventListener('keyup', () => {
         input.value = input.value.replace(/\s/g, '').replace(/\D/g, '');

     })
 }

 soloNumeros(inputIngresos);
 ///modificar el DOM con input de usuario
 btnEnviarIngresos.addEventListener('click', (e) => {
     e.preventDefault();
     ingresosPrint.textContent = inputIngresos.value.replace(/\s/g, '').replace(/\D/g, '');
     clear();
     ingresos = ingresosPrint.textContent;
     formIngresos.classList.toggle('oculto')
     btnResetIngresos.classList.toggle('oculto')
 })

 btnResetIngresos.addEventListener('click', (e) => {
     e.preventDefault();
     formIngresos.classList.toggle('oculto')
     btnResetIngresos.classList.toggle('oculto')
 })
 console.log(ingresos)

 ///////////***********PRESUPUESTOS****** *////////
 const formularioGastos = document.querySelector('#formularioGastos'),
     listaPresupuestos = document.querySelector('#listaPresupuestos');

 let inputGFijos = document.getElementById('inputGFijos'),
     inputCompras = document.getElementById('inputCompras'),
     inputTrasnporte = document.getElementById('inputTrasnporte'),
     inputOcio = document.getElementById('inputOcio'),
     printGastosFijos = document.querySelector('#printGastosFijos'),
     printCompras = document.querySelector('#printCompras'),
     printTransporte = document.querySelector('#printTransporte'),
     printOcio = document.querySelector('#printOcio'),
     printTotalPresus = document.getElementById('printTotalPresus'),
     btnEnviarPresu = document.getElementById('btnEnviarPresu'),
     btnPresuGFijos = document.getElementById('btnPresuGFijos'),
     btnPresuCompras = document.getElementById('btnPresuCompras'),
     btnPresuTrasnporte = document.getElementById('btnPresuTrasnporte'),
     btnPresuOcio = document.getElementById('btnPresuOcio');

 let presusMes = [];

 //borrar el input luego de confirmar el monto
 function clearInputs() {
     document.getElementById('formularioGastos').reset();
 }

 class Presupuesto {
     constructor(categoria, monto) {
         this.categoria = categoria;
         this.monto = monto;
     }
     detallePresupuestos() {
         return `Planeas gastar ${this.monto} en ${this.categoria}`
     }
 }


 //funcion para sumar los presupuestos como total
 let totalPresu = 0;

 function totalPresusMes() {
     totalPresu = presusMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0);
     printTotalPresus.textContent = totalPresu;
 }

 //ingresar solo numeros en los inputs de presu
 soloNumeros(inputGFijos);
 soloNumeros(inputCompras);
 soloNumeros(inputTrasnporte);
 soloNumeros(inputOcio);

 //eventos booton: agrega el monto a la lista de gastos y agrega el elemento al array
 function clickBtnPresu(boton, input, print, categoria) {
     boton.addEventListener('click', (e) => {
         e.preventDefault();
         let valorInput = input.value.replace(/\s/g, '').replace(/\D/g, '');
         print.textContent = valorInput;
         presusMes.push(new Presupuesto(categoria, parseInt(valorInput)))
         clearInputs();
         totalPresusMes()
     })
 }

 clickBtnPresu(btnPresuGFijos, inputGFijos, printGastosFijos, 'Gastos Fijos')
 clickBtnPresu(btnPresuCompras, inputCompras, printCompras, 'Compras')
 clickBtnPresu(btnPresuTrasnporte, inputTrasnporte, printTransporte, 'Transporte')
 clickBtnPresu(btnPresuOcio, inputOcio, printOcio, 'Ocio')

 totalPresusMes()
 console.log(totalPresu)


 /////LOCAL STORAGE DE DATA
 function gardarLocal() {
     const presusJSON = JSON.stringify(presusMes);
     localStorage.setItem("presusJSON", presusJSON);
     localStorage.setItem('ingresos', ingresos);

 }
 //  const presusJSON = JSON.stringify(presusMes);
 //  localStorage.setItem("testJSON", presusJSON);

 btnEnviarPresu.addEventListener('click', (e) => {
     e.preventDefault();
     gardarLocal();
     window.open('./pages/diario.html', "_self")
 })

 ////////////////animate
 $(function() {
     var titulo = $('h1');
     setInterval(function() {
         titulo.fadeIn(1000, function() {
             titulo.fadeOut(1500, function() {
                 titulo.fadeIn(1500)
             });
         });
     }, 5000);
 });