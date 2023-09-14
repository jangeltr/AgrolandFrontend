export const inputPassword = {
    required: {
        value: true,
        message: 'La contraseña es requerida'
    },
    maxLength: {
        value:30,
        message: 'La contraseña no puede ser mayor a 30 caracteres'
    },
    minLength: {
        value: 5,
        message: 'La contraseña no puede ser menor a 5 caracteres'
    },
}

export const inputEmail = {
    required: {
        value: true,
        message: 'El email es requerido'
    },
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'El email no es valido'
    },
}

export const inputNombre = {
    required: {
        value: true,
        message: 'El nombre es requerido'
    },
    maxLength: {
        value: 40,
        message: 'El nombre no puede ser mayor a 40 caracteres'
    },
    minLength: {
        value: 3,
        message: 'El nombre no puede ser menor a 3 caracteres'
    },
}
