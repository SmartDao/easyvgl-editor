import React from 'react'
import Navbar from "./Navbar";
import Viewport from "./Viewport";
import Footer from "./Footer";
import {Stack} from "@mantine/core";

const Layout = () => {
    return (
        <>
            <Stack>
                <Navbar/>
                <Viewport/>
            </Stack>
            <Footer/>
        </>
    )
}
export default Layout
