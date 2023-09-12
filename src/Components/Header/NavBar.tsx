'use client'

import { NavLink } from "react-router-dom"
import { useContext } from 'react';

import { MyContext } from '../../Context/context';
import WithoutUser from "./WithoutUser";
import AdminUser from "./AdminUser";
import NormalUser from "./NormalUser";

const NavBar = (): JSX.Element => {
    const contexto = useContext(MyContext)
    return (
        <>
            {/* <WithoutUser /> */}
            <AdminUser />
            {/* <NormalUser /> */}
        </>
    )
}

export default NavBar