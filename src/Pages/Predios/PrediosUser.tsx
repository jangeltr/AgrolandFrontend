import { Outlet } from "react-router-dom"

export default function PrediosAdmin(): JSX.Element {
    return (
    <>
        <div className='w-full flex items-center justify-center mt-8'>
            <div className='w-full lg:max-w-5xl flex-col'>
                <div className=' mb-5'>
                    <h1 className=' text-3xl text-center text-principal'>Predios de Usuario</h1>
                </div>
                
                <Outlet />
            </div>
        </div>
    </>
)}