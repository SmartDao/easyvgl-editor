import React from 'react'
import {Menu, Button, Box, Group, Image, Space, ActionIcon, Avatar, Text, Stack, ButtonGroup} from "@mantine/core";
import {
    IconArrowsMove,
    IconHandStop,
    IconSquareRoundedPlus,
    IconNewSection,
    IconRectangle,
    IconPhoto,
    IconTextSize,
    IconHandFinger,
} from '@tabler/icons-react';

import {egWidgetTypes, egWidgetTypes as ObjType, useEditorContext} from '../context/EditorContext';

import easyVGLLogo from "../assets/images/easyvgl-logo.svg";
import TypedObjectIcon from "./TypedObjectIcon";

const Navbar = () => {

    const { widgetNodes, setWidgetNodes, addWidgetNode } = useEditorContext();

    return (
        <Group bg={'#111'} grow pos={'fixed'} w="100%" preventGrowOverflow={false} top={0} left={0} justify='space-between'>
            <Group>
                <Image src={easyVGLLogo} w={200} mx={20}/>
                <Space w="md" />
                <>
                    <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="move">
                        <IconArrowsMove  stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="pan">
                        <IconHandStop  stroke={1.5} />
                    </ActionIcon>

                    <Menu shadow="md" width={200} position="bottom-start" offset={8} arrowPosition="center">
                        <Menu.Target>
                            <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="basic">
                                <IconSquareRoundedPlus  stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Basic Objects</Menu.Label>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvObject}/>} onClick={()=>{ addWidgetNode(ObjType.LvObject) }}>
                                Object
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvLabel}/>} onClick={()=>{ addWidgetNode(ObjType.LvLabel) }}>
                                Label
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvImage}/>} onClick={()=>{ addWidgetNode(ObjType.LvImage) }} >
                                Image
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvButton}/>} onClick={()=>{ addWidgetNode(ObjType.LvButton) }} >
                                Button
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Label>Simple Widgets</Menu.Label>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvRoller}/>} onClick={()=>{ addWidgetNode(ObjType.LvRoller) }} >
                                Roller
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvList}/>} onClick={()=>{ addWidgetNode(egWidgetTypes.LvList) }}>
                                List
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.LvTabview}/>} onClick={()=>{ addWidgetNode(egWidgetTypes.LvTabview) }}>
                                Tabview
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="extra">
                        <IconNewSection  stroke={1.5} />
                    </ActionIcon>
                </>
                <Space w="md" />
            </Group>
            <Group w={160} maw={160} px={10} py={5}>
                <Avatar color="cyan" radius="xl">SP</Avatar> <Text>Sprite</Text>
            </Group>
        </Group>
    )
}
export default Navbar
