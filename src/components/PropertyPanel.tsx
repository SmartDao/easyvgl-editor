import React from 'react'
import {Box, Button, ColorInput, Group, Input, NumberInput, Slider, Stack, Text} from "@mantine/core";
import {IconHexagonLetterI,IconAugmentedReality,IconFocus2} from "@tabler/icons-react";
import {useEditorContext} from "../context/EditorContext";
import EasyVglConfig from "../context/Configs";
import {max} from "lodash";

const PropertyPanel = () => {

    const { widgetTool, selectedNode, onWidgetNodeDrop, onWidgetNodesChange, onWidgetNodeSelected } = useEditorContext();

    return (
        <Stack w="240px">
            <Text>Properties</Text>
            {
                selectedNode && (
                    <Stack pr={10}>
                        <Input radius="md"
                               value={selectedNode.label?.toString()}
                               placeholder="Set object name"
                               onChange={(event) => {
                                   widgetTool?.setName(selectedNode, event.currentTarget.value);
                               }}
                        />
                        <Group grow gap={10}>
                            <NumberInput
                                size="xs"
                                radius="md"
                                leftSectionWidth={70}
                                leftSection="x"
                                placeholder="axis of X"
                                min={-4096}
                                max={4096}
                                value={selectedNode.properties.x}
                                onChange={(v)=>{ widgetTool?.setPos(selectedNode,{x:parseInt(String(v))}) }}
                            />
                            <NumberInput
                                size="xs"
                                radius="md"
                                leftSection="Y"
                                leftSectionWidth={70}
                                placeholder="axis of Y"
                                min={-4096}
                                max={4096}
                                value={selectedNode.properties.y}
                                onChange={(v)=>{ widgetTool?.setPos(selectedNode,{y:parseInt(String(v))}) }}
                            />
                        </Group>
                        <Group grow gap={10}>
                            <NumberInput
                                size="xs"
                                radius="md"
                                leftSectionWidth={70}
                                leftSection="Width"
                                placeholder="width of object"
                                min={1}
                                max={4096}
                                value={selectedNode.properties.width}
                                onChange={(v)=>{ widgetTool?.setSize(selectedNode,{w:parseInt(String(v))}) }}
                            />
                            <NumberInput
                                size="xs"
                                radius="md"
                                leftSectionWidth={70}
                                leftSection="Height"
                                placeholder="width of object"
                                min={1}
                                max={4096}
                                value={selectedNode.properties.height}
                                onChange={(v)=>{ widgetTool?.setSize(selectedNode,{h:parseInt(String(v))}) }}
                            />
                        </Group>
                        <Group gap={10} grow>

                            <NumberInput
                                size="xs"
                                radius="md"
                                leftSectionWidth={70}
                                leftSection="Radius"
                                placeholder="radius of object"
                                min={0}
                                max={ Math.max(selectedNode.properties.width,selectedNode.properties.height) }
                                value={selectedNode.properties.radius}
                                onChange={(v)=>{ widgetTool?.setRadius(selectedNode,parseInt(String(v))) }}
                            />
                            <Slider
                                mt={10}
                                size="lg"
                                value={selectedNode.properties.radius}
                                min={0}
                                max={ Math.max(selectedNode.properties.width,selectedNode.properties.height) }
                                color={selectedNode.properties.color?selectedNode.properties.color:'indigo'}
                                onChange={ (value)=> { widgetTool?.setRadius(selectedNode,value)}}
                            />
                        </Group>
                        <Group gap={10} grow>
                            <ColorInput
                                value={selectedNode.properties.color||""}
                                onChange={ (value)=> { widgetTool?.setColor(selectedNode,value)}}
                                eyeDropperIcon={<IconFocus2 style={{ width: 18, height: 18 }} stroke={1.5} />}
                                radius="md"
                                label="Background"
                                placeholder="BgColor"
                                swatches={ EasyVglConfig.themeColors }
                            />
                            <Slider
                                mt={25}
                                size="lg"
                                value={selectedNode.properties.opacity||0}
                                color={selectedNode.properties.color?(selectedNode.properties.color+Math.floor((selectedNode.properties.opacity||100)/100*0xff).toString(16)):'indigo'}
                                onChange={ (value)=> { widgetTool?.setOpacity(selectedNode,value)}}
                            />
                        </Group>
                        <Group grow gap={10}>
                            <ColorInput
                                value={selectedNode.properties.border?selectedNode.properties.border.color:""}
                                onChange={ (value)=> { widgetTool?.setBorderColor(selectedNode,value)}}
                                eyeDropperIcon={<IconFocus2 style={{ width: 18, height: 18 }} stroke={1.5} />}
                                radius="md"
                                label="BorderColor"
                                placeholder="BgColor"
                                swatches={ EasyVglConfig.themeColors }
                            />
                            <Slider
                                mt={25}
                                size="lg"
                                value={selectedNode.properties.border?.opacity||0}
                                color={selectedNode.properties.border?(selectedNode.properties.border.color+Math.floor((selectedNode.properties.border.opacity||100)/100*0xff).toString(16)):'indigo'}
                                onChange={ (value)=> { widgetTool?.setBorderOpacity(selectedNode,value)}}
                            />
                        </Group>

                        <Group gap={5}><IconAugmentedReality size={18}/><Text>{selectedNode.id}</Text></Group>
                        <Group gap={5}>{selectedNode.icon}<Text>{selectedNode.label}</Text></Group>
                        <Box>{(selectedNode.children&&selectedNode.children.length)?'HasChildren':'singleNode'}</Box>
                    </Stack>
                )
            }
        </Stack>
    )
}
export default PropertyPanel
