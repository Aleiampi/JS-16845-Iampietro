//boton ingresar
$('#comenzar').on("click", (async function() {
    const { value: text } = await Swal.fire({
        title: 'Ingrese su usuario',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        input: 'text',
        inputPlaceholder: 'Ingrese su nombre de usuario',
        inputValidator: (value) => {
            if (!value) {
                return 'Tienes que ingresar tu nombre!'
            }
        }
    })

    if (text) {

        Swal.fire({
            title: 'Bienvenido!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            text: "Encontramos tus gastos de meses anteriores",
            icon: 'question',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar nuevo mes',
            cancelButtonText: 'Iniciar nuevo mes'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open("./pages/presupuesto.html", "_self");
            } else {
                window.open("#");
            }
        })
    }
}))