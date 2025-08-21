// JS lee de arriba a abajo
// return: buena práctica

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Mientras más genérica, más reutilizable
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicidades! Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'} .`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor. Intenta de nuevo.');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor. Intenta de nuevo.');
        }
        intentos++;
    }
    return;
}

function limpiarJuego() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    } else {
        // Si el número ya fue sorteado, se genera otro
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del Número Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarJuego();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();