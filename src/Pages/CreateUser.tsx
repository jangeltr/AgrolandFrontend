import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { NewUser, User } from '../Common/UserType';
import { MyContext } from '../Context/context';
import { Success, Reject } from '../Components/Alerts';
import { MySpinner } from '../Components/Spinner';
import { inputEmail, inputPassword, inputNombre, inputUserName } from '../Common/FormInputObjects';


export default function CreateUser(): JSX.Element {
    const contexto = useContext(MyContext)
    const navigate = useNavigate()
    const [showBienVenido, setShowBienVenido] = useState(false)
    const [showErrorCrearCuenta, setShowErrorCrearCuenta] = useState(false)
    const [showErrorCuentaYaExiste, setShowErrorCuentaYaExiste] = useState(false)
    const [showErrorPassword, setShowErrorPassword] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const onSubmit = handleSubmit(async(data) => {
        setShowSpinner(true)
        const usuario: NewUser = {
            userName: data.userName,
            email: data.email,
            password: data.password,
            nombre: data.nombre
        }
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Agroland",
            "Content-Type": "application/json"
        }
        const bodyContent = JSON.stringify(usuario)
        const URL = import.meta.env.VITE_AGROLAND_BACKEND_URL + '/usuarios/createuser'
        const response = await fetch(URL, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        if (response.status===201) {
            setShowSpinner(false)
            setShowBienVenido(true)
            const data: User = await response.json()
            setTimeout(() => {
                contexto?.updateData({user: data})
                navigate('/home')
            }, 2000);
        }else if (response.status===400)
            {   const res= await response.json()
                if (typeof res.message=='string' && res.message.includes('ya existen'))
                    setShowErrorCuentaYaExiste(true)
                else if (typeof res.message=='object')
                        setShowErrorPassword(true)
                    else
                        setShowErrorCrearCuenta(true)
            }
    })

    return (
        <>
            <div className=' w-full flex justify-center'>
                <div className="flex-col text-gray-800 mt-5">
                    <div className='flex justify-center'>
                        <span className=' text-xl border-b-2 p-2 border-gray-700'>
                            Proporciona los datos para crear tu cuenta
                        </span>
                    </div>
                    <form onSubmit={onSubmit} className=' mt-8 mb-5'>
                        <div className=' mb-5'>
                            <label className="block text-principal">Tu email</label>
                            <input type="email" className='h-8 w-full rounded-md text-center text-principal' 
                                {...register('email',inputEmail)}
                            />
                            {
                                errors.email && <span className='text-red-500 text-xs'>{
                                    typeof errors.email?.message=='string' ? errors.email?.message : ''
                                }</span>
                            }
                        </div>
                        <div>
                            <label className="block text-principal">Contraseña</label>
                            <input type="password" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('password',inputPassword)}
                            />
                            {
                                errors.password && <span className='text-red-500 text-xs'>{
                                    typeof errors.password?.message=='string' ? errors.password?.message : ''
                                }</span>
                            }
                        </div>
                        <div>
                            <label className="block text-principal">Confirmar contraseña</label>
                            <input type="password" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('confirmPassword',
                                    {
                                        validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                                    }
                                )}
                            />
                            {
                                errors.confirmPassword && <span className='text-red-500 text-xs'>{
                                    typeof errors.confirmPassword?.message=='string' ? errors.confirmPassword?.message : ''
                                }</span>
                            }
                        </div>
                        <div className=' mt-5'>
                            <label className="block text-principal">Nombre de usuario</label>
                            <input type="text" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('userName',inputUserName)}
                            />
                            {
                                errors.userName && <span className='text-red-500 text-xs'>{
                                    typeof errors.userName?.message=='string' ? errors.userName?.message : ''
                                }</span>
                            }
                        </div>
                        <div className=''>
                            <label className="block text-principal">Nombre completo</label>
                            <input type="text" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('nombre',inputNombre)}
                            />
                            {
                                errors.nombre && <span className='text-red-500 text-xs'>{
                                    typeof errors.nombre?.message=='string' ? errors.nombre?.message : ''
                                }</span>
                            }
                        </div>
                        <div className="flex justify-center mt-7">
                            <button type='submit' className='text-gray-100 bg-gray-700 rounded-md py-2 px-8 hover:bg-gray-500'>
                                Crear la cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showSpinner&& <MySpinner />}
            <Success show={showBienVenido} title='Felicidades' text={'Tu cuenta se creo con exito'} setShow={setShowBienVenido}/>
            <Reject show={showErrorCrearCuenta} title='Error al crear la cuenta' text='Faltan datos o alguno no cumple los requisitos' setShow={setShowErrorCrearCuenta}/>
            <Reject show={showErrorCuentaYaExiste} title='Error al crear la cuenta' text='La cuenta de correo electronico ya existe' setShow={setShowErrorCuentaYaExiste}/>
            <Reject show={showErrorPassword} title='Error al crear la cuenta' text='La contraseña no reune los requisitos minimos de seguridad' setShow={setShowErrorPassword}/>
        </>
    )
}