import React, {useState} from 'react'
import {Box, Button, Text, Group, Space, Stack, ButtonGroup, rgba} from "@mantine/core";
import { ReactTreeList, ReactTreeListProps} from "@bartaxyz/react-tree-list";
import { useEditorContext} from "../context/EditorContext";
import { IconChevronRight } from '@tabler/icons-react';


const Viewport = () => {

    const { widgetNodes, selectedNode, onWidgetNodeDrop, onWidgetNodesChange, onWidgetNodeSelected } = useEditorContext();

    return (
        <Group pt={50} grow preventGrowOverflow={false} id='workSpace' justify="space-between">
            <Stack maw={300}>
                <Box>
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
                                <Box>{selectedNode.id}</Box>
                                <Box>{selectedNode.icon} {selectedNode.label}</Box>
                                <Box>{selectedNode.children?'HasChildren':'singleNode'}</Box>
                            </Stack>
                        )
                    }
            </Stack>
        </Group>
    );
}
export default Viewport
