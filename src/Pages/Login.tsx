import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { User, UserLogin } from '../Common/UserType';
import { MyContext } from '../Context/context';
import { Success, Reject } from '../Components/Alerts';
import { MySpinner } from '../Components/Spinner';
import { inputEmailLogin, inputPassword, inputUserNameLogin } from '../Common/FormInputObjects';
import { loginUser } from '../Common/Users';

export default function Login(): JSX.Element {
    const navigate = useNavigate()
    const contexto = useContext(MyContext)
    const [showBienVenido, setShowBienVenido] = useState(false)
    const [showErrorCuentaNoExiste, setShowErrorCuentaNoExiste] = useState(false)
    const [showErrorPassword, setShowErrorPassword] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = handleSubmit(async(data) => {
        setShowSpinner(true)
        const response = await loginUser(data.userName, data.email, data.password)
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
                if (typeof res.message=='string' && res.message.includes('no existe'))
                    setShowErrorCuentaNoExiste(true)
                else if (typeof res.message=='string' && res.message.includes('incorrecta'))
                    setShowErrorPassword(true)
            }
    })

    return (
        <>
            <div className=' w-full flex justify-center'>
                <div className="flex-col text-gray-800 mt-5">
                    <div className='flex justify-center'>
                        <span className=' text-xl border-b-2 p-2 border-gray-700'>
                            Proporciona tu "nombre de usuario o email" y "contraseña"
                        </span>
                    </div>
                    <form onSubmit={onSubmit} className=' mt-8 mb-5'>
                        <div className=' mt-5'>
                            <label className="block text-principal">Nombre de usuario</label>
                            <input type="text" className='h-8 w-full rounded-md text-center text-principal'
                                {...register('userName',inputUserNameLogin)}
                            />
                            {
                                errors.userName && <span className='text-red-500 text-xs'>{
                                    typeof errors.userName?.message=='string' ? errors.userName?.message : ''
                                }</span>
                            }
                        </div>
                        <div className=' mt-5 mb-5'>
                            <label className="block text-principal">Tu email</label>
                            <input type="email" className='h-8 w-full rounded-md text-center text-principal' 
                                {...register('email',inputEmailLogin)}
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
                        <div className="flex justify-center mt-7">
                            <button type='submit' className='text-gray-100 bg-gray-700 rounded-md py-2 px-8 hover:bg-gray-500'>
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showSpinner&& <MySpinner />}
            <Success show={showBienVenido} title='Agroland' text={'Bienvenido'} setShow={setShowBienVenido}/>
            <Reject show={showErrorCuentaNoExiste} title='Error al iniciar sesion' text='La cuenta no existe' setShow={setShowErrorCuentaNoExiste}/>
            <Reject show={showErrorPassword} title='Error al iniciar sesion' text='Contraseña incorrecta' setShow={setShowErrorPassword}/>
        </>
    )
}