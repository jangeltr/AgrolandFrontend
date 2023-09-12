import { useContext } from 'react';

import { MyContext } from '../../Context/context';
import WithoutUser from "./WithoutUser";
import AdminUser from "./AdminUser";
import NormalUser from "./NormalUser";

export default function NavBar() {
    const contexto = useContext(MyContext)
    return (
        <>
            {contexto?.data.user===null&& <WithoutUser />}
            {contexto?.data?.user?.rol==='Usuario'&& <NormalUser />}
            {contexto?.data?.user?.rol==='Administrador'&&<AdminUser />}
        </>
    )
}