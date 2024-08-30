import Swal, { } from 'sweetalert2';

export const alertaGeneral = (mensaje, isError = false) => {
    Swal.fire({
        title: isError ? 'Error!' : 'Correcto!',
        text: mensaje,
        icon: isError ? 'error' : 'success',
        confirmButtonText: 'Ok'
    });
}

export function alertaToast({ titulo, position = 'top-end', icon = 'success', tiempoMs = 2000, funcion }) {
    Swal.fire({
        position: position,
        title: titulo,
        icon: icon,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: tiempoMs,
        toast: true
    }).then(() => {
        funcion ? funcion() : null;
    });
}

export function alertaToastFuncionAsync({ position = 'top-end', titulo, funcionAsync }) {
    //esta funcion es para manejar mejor los errores desde afuera y no desde aqui mismo
    Swal.fire({
        position: position,
        title: titulo,
        showConfirmButton: false,
        timerProgressBar: true,
        toast: true,
        didOpen: () => {
            Swal.showLoading();
            funcionAsync();
        }
    })
}

export function alertaCargandoProceso({ titulo, messageHtml, funcionAsync, segundaFuncion = null }) {
    Swal.fire({
        title: titulo,
        html: messageHtml,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            // Inicia la operación del servidor
            funcionAsync(); //El then y catch se maneja en la funcion que llama a esta funcion
        }
    });
}