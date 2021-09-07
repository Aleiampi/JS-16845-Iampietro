var suenio = prompt("Tenes sueño?");
var hora = prompt("Es tarde?");


if (suenio == "si" && hora == "si") {
    console.log("andate a dormir");
} else {
    if (suenio == "si" && hora == "no") {
        console.log("Tomate un cafe");
    } else {
        console.log("mira una serie");
    }
}