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
        value: 3,
        message: 'La contraseña no puede ser menor a 3 caracteres'
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

export const inputTelefono = {
    pattern: {
        value: /^[0-9]{10}$/i,
        message: 'El numero de telefono no es valido'
    },
}

export const inputNombre = {
    required: {
        value: true,
        message: 'El nombre completo es requerido'
    },
    maxLength: {
        value: 40,
        message: 'El nombre no puede ser mayor a 40 caracteres'
    },
    minLength: {
        value: 5,
        message: 'El nombre no puede ser menor a 5 caracteres'
    },
}

export const inputUserName = {
    required: {
        value: true,
        message: 'El nombre corto o "user name" es requerido'
    },
    maxLength: {
        value: 15,
        message: 'El nombre corto no puede ser mayor a 15 caracteres'
    },
    minLength: {
        value: 3,
        message: 'El nombre corto no puede ser menor a 3 caracteres'
    },
}

export const inputEmailLogin = {
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'El email no es valido'
    },
}

export const inputUserNameLogin = {
    maxLength: {
        value: 15,
        message: 'El nombre corto no puede ser mayor a 15 caracteres'
    },
    minLength: {
        value: 3,
        message: 'El nombre corto no puede ser menor a 3 caracteres'
    },
}
/////////////////////////////////////////////////////////////Predio///////////////////////////////////////////////
export const inputNombrePredio = {
    required: {
        value: true,
        message: 'El nombre del predio es requerido'
    },
    maxLength: {
        value: 100,
        message: 'El nombre no puede ser mayor a 100 caracteres'
    },
    minLength: {
        value: 5,
        message: 'El nombre no puede ser menor a 5 caracteres'
    },
}
