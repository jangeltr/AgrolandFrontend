import React from "react"
import NavBar from "./Header/NavBar"
import Footer from "./Footer/Footer"

type Props = {children: React.ReactNode} 

const Layout = (props: Props): JSX.Element => {
    return (
        <div className=" min-h-screen flex flex-col justify-between bg-gray-300 bg-home bg-no-repeat bg-bottom bg-contain">
            <NavBar />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout