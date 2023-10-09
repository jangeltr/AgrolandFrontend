import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Predio } from '../Common/PredioTypes'

type Props = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    predio: Predio
} 

export function DataPredio(props: Props): JSX.Element {
    return (
        <>
            <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.setShow}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Predio: {props.predio.nombre}   
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Estado: {props.predio.estado},
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Municipio: {props.predio.estado},
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Extension: {props.predio.extension} has
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Propietario: {props.predio.propietario.nombre} 
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Telefono: {props.predio.propietario.telefono} 
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        eMail: {props.predio.propietario.email} 
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Coordenadas: {JSON.stringify(props.predio.coordenadas)}
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
                                    onClick={() => props.setShow(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}