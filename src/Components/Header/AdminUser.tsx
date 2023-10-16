import { Fragment, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { MyContext } from '../../Context/context';
import { logoutUser } from '../../Common/Users';

const navigation = [
    { name: 'Cultivos', href: '/cultivos', current: true },
    { name: 'Predios', href: '/predios/showPredios', current: false },
    { name: 'Asignar (Predio-Cultivo)', href: '/asignarPredioCultivo', current: false },
    { name: 'Usuarios', href: '/usuarios', current: false },
]

const userMenu = [
    { name: 'Mis Datos', href: '/misDatos', current: true },
    { name: 'Salir', href: '#', current: false },
]

export default function AdminUser() {
    const navigate = useNavigate()
    const contexto = useContext(MyContext)
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="h-10 w-auto rounded-lg" src="../../../public/Siembra5.jpg" alt="Logo" onClick={()=>{navigate('/home')}} />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {
                                            navigation.map((item) => (
                                                <button key={item.name} className=" text-gray-300 p-2 hover:bg-gray-700 rounded-md">
                                                    <NavLink to={item.href} className={({ isActive }) => isActive ? 'underline' : undefined} >
                                                        {item.name}
                                                    </NavLink>
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="../../../public/User.jpg" alt=""/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {
                                                userMenu.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        <NavLink to={item.href} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                                                            onClick={()=> {
                                                                if (item.name=='Salir') {
                                                                    logoutUser(contexto?.data?.user?.access_token)
                                                                    contexto?.updateData({user: null, googleMapsApiKey: null})
                                                                    navigate('/')
                                                                }
                                                            }}
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </Menu.Item>
                                                ))
                                            }
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button key={item.name} as="a" href={item.href}
                                className='text-gray-300 p-2 hover:bg-gray-700 rounded-md block'>
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
