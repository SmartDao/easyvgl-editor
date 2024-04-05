import React from 'react'
import Navbar from "./Navbar";
import Viewport from "./Viewport";
import Footer from "./Footer";
import {Drawer, Stack} from "@mantine/core";
import Coding from "./Coding";
import {useDisclosure} from "@mantine/hooks";

const Layout = () => {

    const [ codingPanelOpened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Stack>
                <Navbar showCoding={open}/>
                <Viewport/>
            </Stack>
            <Footer/>
            <Drawer opened={codingPanelOpened} size={"xl"} onClose={close} title={"Coding"}>
                <Coding/>
            </Drawer>
        </>
    )
}
export default Layout
