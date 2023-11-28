import React, {useState} from 'react'
import {Box, Button, Input, Text, Group, Space, Stack, ButtonGroup, rgba} from "@mantine/core";
import { ReactTreeList, ReactTreeListProps} from "@bartaxyz/react-tree-list";
import { useEditorContext} from "../context/EditorContext";
import { IconChevronRight, IconHexagonLetterI } from '@tabler/icons-react';

const Viewport = () => {

    const { widgetNodes, widgetTool, selectedNode, onWidgetNodeDrop, onWidgetNodesChange, onWidgetNodeSelected } = useEditorContext();

    return (
        <Group pt={50} grow preventGrowOverflow={false} id='workSpace' justify="space-between">
            <Stack maw={300}>
                <Box>
                     {/*todo padding-left in each line little big*/}
                    <ReactTreeList
                        data={widgetNodes}
                        draggable={true}
                        onDrop={onWidgetNodeDrop}
                        onChange={onWidgetNodesChange}
                        selectedId="1"
                        onSelected={onWidgetNodeSelected}
                        itemDefaults={{
                            open: false,
                            arrow: <IconChevronRight/>
                        }}
                        itemOptions={{
                            focusedOutlineColor: 'rgba(84,54,235,0.8)',
                            focusedOutlineWidth: 2,
                            focusedBorderRadius: 50,
                            focusedBackgroundColor: 'rgba(84,54,235,0.35)',
                        }}
                    />
                </Box>
            </Stack>
            <Box>ViewPort
                <>Canvas
                    <>InfoView</>
                </>
            </Box>
            <Stack maw={300}>
                <Text>Properties</Text>
                    {
                        selectedNode && (
                            <Stack>
                                <Input radius="xl"
                                       value={selectedNode.label?.toString()}
                                       placeholder="Set object name"
                                       onChange={(event) => {
                                           widgetTool?.setName(selectedNode, event.currentTarget.value);
                                       }}
                                />
                                <Group gap={5}><IconHexagonLetterI size={18}/><Text>{selectedNode.id}</Text></Group>
                                <Group gap={5}>{selectedNode.icon}<Text>{selectedNode.label}</Text></Group>
                                <Box>{selectedNode.children?'HasChildren':'singleNode'}</Box>
                            </Stack>
                        )
                    }
            </Stack>
        </Group>
    );
}
export default Viewport
