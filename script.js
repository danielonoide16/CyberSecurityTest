/*
    MESA VERDE
    Actividad académica de Hacking Ético.

    Todos los datos son ficticios.

    Las vulnerabilidades están colocadas
    deliberadamente para la actividad.
*/


// =====================================================
// CLIENTES
// =====================================================

// VULNERABILIDAD:
// Las credenciales están almacenadas directamente
// en JavaScript que recibe el navegador.
//
// En un sistema real esto sería inseguro.

const internalCustomers = {

    client01: {

        username: "client01",

        password: "123456",

        name: "María López",

        account: "**** 4821",

        balance: "$24,850.00"

    },


    client02: {

        username: "client02",

        password: "mesa123",

        name: "Carlos Ramírez",

        account: "**** 7613",

        balance: "$18,420.00"

    },


    client03: {

        username: "client03",

        password: "verde2026",

        name: "Ana Torres",

        account: "**** 3158",

        balance: "$31,250.00"

    },


    admin: {

        username: "admin",

        password: "admin123",

        name: "Administrador",

        account: "**** 0001",

        balance: "$0.00"

    }

};


// =====================================================
// INFORMACIÓN TÉCNICA
// =====================================================

// VULNERABILIDAD:
// Información interna expuesta al cliente.

const systemInformation = {

    server: "Apache/2.4.58",

    database: "MesaVerde_Produccion",

    environment: "Producción",

    version: "3.8.2"

};


// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");


const usernameInput =
    document.getElementById("username");


const passwordInput =
    document.getElementById("password");


const loginMessage =
    document.getElementById("loginMessage");


if (loginForm) {


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                usernameInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            // =========================================
            // VULNERABILIDAD:
            // ENUMERACIÓN DE USUARIOS
            // =========================================

            // El sistema revela si el usuario existe.

            if (!internalCustomers[username]) {

                loginMessage.textContent =
                    `El usuario ${username} no existe.`;

                loginMessage.className =
                    "login-message error";

                return;

            }


            // El usuario sí existe,
            // pero la contraseña es incorrecta.

            if (
                internalCustomers[username].password
                !== password
            ) {

                loginMessage.textContent =
                    `La contraseña es incorrecta para el usuario ${username}.`;

                loginMessage.className =
                    "login-message error";

                return;

            }


            // =========================================
            // LOGIN CORRECTO
            // =========================================

            sessionStorage.setItem(
                "loggedUser",
                username
            );


            // =========================================
            // VULNERABILIDAD:
            // ID DE CLIENTE EN LA URL
            // =========================================

            window.location.href =
                `home.html?cliente=${username}`;

        }

    );

}


// =====================================================
// HOME
// =====================================================

const customerName =
    document.getElementById("customerName");


const accountNumber =
    document.getElementById("accountNumber");


const balance =
    document.getElementById("balance");


if (customerName) {


    // =========================================
    // VULNERABILIDAD:
    // ACCESO DIRECTO A HOME.HTML
    //
    // No se comprueba si el usuario inició sesión.
    // Cualquier persona puede abrir directamente:
    //
    // home.html
    // =========================================


    const params =
        new URLSearchParams(
            window.location.search
        );


    // =========================================
    // VULNERABILIDAD:
    // CONTROL DE ACCESO DEFICIENTE
    //
    // El cliente se obtiene directamente
    // desde la URL.
    //
    // Ejemplo:
    //
    // home.html?cliente=client01
    //
    // se puede cambiar por:
    //
    // home.html?cliente=client02
    // =========================================

    const requestedClient =
        params.get("cliente")
        || "client01";


    const currentUser =
        internalCustomers[requestedClient];


    if (currentUser) {


        customerName.textContent =
            currentUser.name;


        accountNumber.textContent =
            currentUser.account;


        balance.textContent =
            currentUser.balance;


    } else {


        customerName.textContent =
            "Cliente no encontrado";


        accountNumber.textContent =
            "**** ----";


        balance.textContent =
            "$0.00";

    }

}


// =====================================================
// PANEL ADMINISTRATIVO
// =====================================================

const adminPanel =
    document.getElementById("adminPanel");


if (adminPanel) {


    const params =
        new URLSearchParams(
            window.location.search
        );


    // =========================================
    // VULNERABILIDAD:
    // PANEL ADMINISTRATIVO SIN AUTORIZACIÓN
    //
    // Basta con cambiar la URL a:
    //
    // home.html?admin=true
    // =========================================

    if (
        params.get("admin")
        === "true"
    ) {

        adminPanel.classList.remove(
            "hidden"
        );

        adminPanel.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// CERRAR SESIÓN
// =====================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {


    logoutButton.addEventListener(
        "click",
        function () {


            sessionStorage.removeItem(
                "loggedUser"
            );


            window.location.href =
                "index.html";

        }
    );

}


// =====================================================
// CONSOLA
// =====================================================

console.log(
    "Mesa Verde - Sistema iniciado."
);


console.log(
    "Información del sistema:",
    systemInformation
);


// No imprimimos directamente las contraseñas
// en consola para que no sea demasiado obvio.
// Aun así, siguen estando dentro del JavaScript.

console.log(
    "Clientes registrados:",
    Object.keys(internalCustomers)
);