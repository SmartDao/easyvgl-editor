import React from 'react'
import {Anchor, Box} from "@mantine/core";

const Footer = () => {
    return (
        <Box pos='fixed' right={0} bottom={0} px={10} py={5}>
            EasyVGL ©️ <Anchor href={"https://shezw.com"} target="_blank">shezw.com</Anchor>
        </Box>
    )
}
export default Footer
