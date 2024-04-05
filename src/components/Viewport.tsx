import React from 'react'
import {
    Box,
    Button,
    Input,
    Text,
    Group,
    Space,
    Stack,
    ButtonGroup,
    rgba,
    NumberInput,
    Tabs,
    TabsPanel, Drawer
} from "@mantine/core";
import PropertyPanel from './PropertyPanel';
import LayerPanel from './LayerPanel';
import Canvas from "./Canvas";
import Coding from "./Coding";
import {useDisclosure} from "@mantine/hooks";

const Viewport = () => {

    const [ codingPanelOpened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Group grow gap={5} preventGrowOverflow={false} id='workSpace' justify="space-between" align="start">
                <LayerPanel/>
                <Canvas/>
                <PropertyPanel showCoding={open}/>
            </Group>
            <Drawer opened={codingPanelOpened} size={"xl"} onClose={close} title={"Coding"}>
                <Coding/>
            </Drawer>
        </>
    );
}
export default Viewport
