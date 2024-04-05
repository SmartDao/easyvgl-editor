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

const Viewport = () => {

    return (
        <>
            <Group grow gap={5} preventGrowOverflow={false} id='workSpace' justify="space-between" align="start">
                <LayerPanel/>
                <Canvas/>
                <PropertyPanel/>
            </Group>
        </>
    );
}
export default Viewport
