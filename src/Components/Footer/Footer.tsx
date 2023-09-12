'use client'

const Footer = (): JSX.Element => {
    return (
        <div className="  bg-slate-800">
            <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:flex lg:items-start lg:justify-between">
                    <div>
                        <div className="flex justify-center text-teal-600 lg:justify-start">
                            <span className=" text-2xl font-bold">Agroland</span>                
                        </div>
                        <p className="mx-auto mt-5 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                            Desarrollado para el registro y consulta de terrenos cultivados en Mexico.
                        </p>
                    </div>
                    <div className=" flex-col">
                        <ul className="mt-10 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                            <li>
                            <a className="text-gray-500 transition hover:text-gray-700/75" href="/">
                                Acerca de
                            </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-gray-700/75" href="/">
                                Servicios
                            </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-gray-700/75" href="/">
                                Proyectos
                            </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-gray-700/75" href="http://www.tlajomulco.tecnm.mx/">
                                TecNM-Tlajomulco
                            </a>
                            </li>
                        </ul>
                        <p className="mt-10 text-center text-sm text-gray-500 lg:text-right">
                            Copyright &copy; 2023. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Footer