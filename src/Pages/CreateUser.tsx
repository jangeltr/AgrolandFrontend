import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MyContext } from '../Context/context';
import { Success, Reject } from '../Components/Alerts';
import { MySpinner } from '../Components/Spinner';
import { inputEmail, inputPassword, inputNombre } from '../Common/FormInputObjects';

export default function CreateUser(): JSX.Element {
    const contexto = useContext(MyContext)
    const [showBienVenido, setShowBienVenido] = useState(false)
    const [showErrorCrearCuenta, setShowErrorCrearCuenta] = useState(false)
    const [showErrorCuentaYaExiste, setShowErrorCuentaYaExiste] = useState(false)
    const [showErrorPassword, setShowErrorPassword] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const onSubmit = handleSubmit(async(data) => {
        setShowSpinner(true)
    })

    return (
        <>
            <div className=' w-full flex justify-center'>
                <div className="flex-col text-gray-800 mt-5">
                    <span className=' text-xl border-b-2 p-2 border-gray-700'>
                        Proporciona los datos para crear tu cuenta
                    </span>
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
                            <label className="block text-principal">Nombre completo</label>
                            <input type="text" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('nombres',inputNombre)}
                            />
                            {
                                errors.nombres && <span className='text-red-500 text-xs'>{
                                    typeof errors.nombres?.message=='string' ? errors.nombres?.message : ''
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