import React from 'react'
import {Box, Stack} from "@mantine/core";
import {ReactTreeList} from "@bartaxyz/react-tree-list";
import {IconChevronRight} from "@tabler/icons-react";
import {useEditorContext} from "../context/EditorContext";

const LayerPanel = () => {

    const { widgetNodes, widgetTool, selectedNode, onWidgetNodeDrop, onWidgetNodesChange, onWidgetNodeSelected } = useEditorContext();

    return (
        <Stack w="300px" justify="flex-start" p={5}>
            <Box>
                {/*todo padding-left in each line little big*/}
                <ReactTreeList
                    data={widgetNodes}
                    draggable={true}
                    onDrop={onWidgetNodeDrop}
                    onChange={onWidgetNodesChange}
                    selectedId=""
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
    )
}
export default LayerPanel
