var elegido = "tijera";
var intentos = 2;
quiereJugar = prompt("Quiere jugar? si/no");
while (quiereJugar == "si" && intentos > 0) {
    ingresoUsuario = prompt("piedra, papel o tijera?");
    if (ingresoUsuario == elegido) {
        alert("ganaste!");
        break;
    } else {
        intentos = intentos - 1;
    }
}
if (intentos < 1) {
    alert("perdiste")
}