 //////************  INGRESOS ***************////////
 //ingresos iniciales
 let ingresos = 0;
 ///Crear variables
 const inputIngresos = document.getElementById('inputIngresos')
 const btnEnviarIngresos = document.getElementById('btnEnviarIngresos')
 let ingresosEnPantalla = document.getElementById('ingresosEnPantalla')

 //crear span para imprimir los ingresos en pantalla ///>>>Desafio 1: modificar el DOM con input de usuario
 let ingresosPrint = document.createElement('span')
 ingresosEnPantalla.appendChild(ingresosPrint)
 ingresosPrint.textContent = ingresos

 //reset input despues de ingreso
 function clear() {
     document.getElementById('formIngresos').reset();
 }

 ///>>>Desafio 1: modificar el DOM con input de usuario
 btnEnviarIngresos.addEventListener('click', (e) => {
     e.preventDefault();
     ingresosPrint.textContent = inputIngresos.value;
     clear();
 })
 console.log(ingresos)

 ////////////************* GASTOS  *****************///////////////////
 ///gastos iniciales
 let gastos = 0;

 ///Crear variables
 const inputGastos = document.getElementById('inputGastos')
 const btnEnviarGasto = document.getElementById('btnEnviarGasto')
 let gastosEnPantalla = document.getElementById('gastosEnPantalla')
 let listaGastos = document.getElementById('listaGastos')

 //crear span para imprimir los ingresos en pantalla ///>>>Desafio 1: modificar el DOM con input de usuario
 let gastosPrint = document.createElement('span')
 gastosEnPantalla.appendChild(gastosPrint)
 gastosPrint.textContent = gastos

 function clear2() {
     document.getElementById('formGastos').reset();
 }

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

 //funcion para que el usuario agregue sus gastos por prompt, devuelve un objeto ///>>>Desafio 2: agregar elementos al htm de un array
 function agregarGasto() {

     categoriaUsuario = document.getElementById('categoriasGastos').value;
     montoUsuario = document.getElementById('inputGastos').value;

     return {
         categoriaUsuario,
         montoUsuario,
         // detalleUsuario,
     };
 }

 function ingresoGastos() {
     let nuevoGasto = agregarGasto();
     gastosMes.push(new Gasto(nuevoGasto.categoriaUsuario, parseInt(nuevoGasto.montoUsuario)));
 }


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
 function printGastos() {


     for (let gasto of gastosMes) {

         const itemLista = document.createElement('li')
         itemLista.innerText = gasto.infoGasto();
         listaGastos.appendChild(itemLista);

     }
     console.log('last' + listaGastos)
     gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
     gastosPrint.textContent = gastos;
 }
 printGastos();

 ///agregar los datos que va ingresando el usuario al array y modificar el html
 //para que los incorporte interactivamente ///>>>Desafio 2: agregar elementos al htm de un array
 function printGastosAgregados() {
     let lastItem = gastosMes[gastosMes.length - 1]

     const printLastItem = document.createElement('li')
     printLastItem.innerText = lastItem.infoGasto();
     listaGastos.appendChild(printLastItem);



     gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)
     gastosPrint.textContent = gastos;
 }

 ///evento ejecuta las funciones (capturar info, crear objeto, agrear al array, crear elemento html)
 ///>>>Desafio 2: agregar elementos al htm de un array
 btnEnviarGasto.addEventListener('click', (e) => {
     e.preventDefault();
     ingresoGastos();
     printGastosAgregados();
     clear2();
     console.log(gastosMes);
 })

 //sumar los gastos del mes con reduce >>  ///>>>Desafio 1: modificar el DOM con input de usuario
 gastos = gastosMes.reduce((sumatoria, expense) => sumatoria + expense.monto, 0)


 //actualizo el monto del <p> que contiene la suma de los gastos ///>>>Desafio 1: modificar el DOM con input de usuario
 gastosPrint.textContent = gastos;