import React from 'react'
import {Menu, Button, Box, Group, Image, Space, ActionIcon, Avatar, Text, Stack, ButtonGroup} from "@mantine/core";
import {
    IconArrowsMove,
    IconHandStop,
    IconSquareRoundedPlus,
    IconNewSection,
    Icon3dCubeSphere,
    IconRectangle,
    IconPhoto,
    IconTextSize,
    IconHandFinger,
    IconFileExport, IconBrandReact, IconBrandVue, IconBoxAlignBottomLeft
} from '@tabler/icons-react';

import {egWidgetTypes, egWidgetTypes as ObjType, useEditorContext} from '../context/EditorContext';

import easyVGLLogo from "../assets/images/easyvgl-logo.svg";
import TypedObjectIcon from "./TypedObjectIcon";

const Navbar = () => {

    const { widgetNodes, setWidgetNodes, addWidgetNode, saveToFile } = useEditorContext();

    return (
        <Group bg={'#111'} grow w="100%" preventGrowOverflow={false} top={0} left={0} justify='space-between'>
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
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.view}/>} onClick={()=>{ addWidgetNode(ObjType.view) }}>
                                View
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.text}/>} onClick={()=>{ addWidgetNode(ObjType.text) }}>
                                Text
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.image}/>} onClick={()=>{ addWidgetNode(ObjType.image) }} >
                                Image
                            </Menu.Item>
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.button}/>} onClick={()=>{ addWidgetNode(ObjType.button) }} >
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
                            <Menu.Item leftSection={<TypedObjectIcon icon={ObjType.tabview}/>} onClick={()=>{ addWidgetNode(egWidgetTypes.tabview) }}>
                                Tabview
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="extra">
                        <IconNewSection  stroke={1.5} />
                    </ActionIcon>

                        <Menu shadow="md" width={200} position={"bottom-start"} arrowPosition={"center"}>
                            <Menu.Target>
                                <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="frameworks">
                                    <Icon3dCubeSphere  stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconBoxAlignBottomLeft size={20}/>} >
                                    LVGL
                                </Menu.Item>
                                {/*<Menu.Item leftSection={<IconBrandReact size={20}/>} >*/}
                                {/*    React*/}
                                {/*</Menu.Item>*/}
                                {/*<Menu.Item leftSection={<IconBrandVue size={20}/>} >*/}
                                {/*    Vue*/}
                                {/*</Menu.Item>*/}
                            </Menu.Dropdown>
                        </Menu>

                    <ActionIcon variant="transparent" color="gray" radius="xl" aria-label="export">
                        <IconFileExport  stroke={1.5} onClick={()=>{ saveToFile() }}/>
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
