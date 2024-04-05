import React, {ReactNode} from 'react'
import {Box, Code, Flex, Stack, Text} from "@mantine/core";
import {egWidgetTypes, useEditorContext, WidgetItemType} from "../context/EditorContext";
import { useMouse } from '@mantine/hooks';
import {Stage, Layer, Rect, Text as TextItem, Transformer} from 'react-konva';
import CanvasObject from "./CanvasObject";

const Canvas = () => {

    const { widgetNodes,selectedKonvaNode } = useEditorContext();
    const { ref, x, y } = useMouse();

    const renderObjectsRecursive: (item: WidgetItemType) => (JSX.Element) = (item: WidgetItemType) => {
        // todo return group object
        if (item.children && item.children.length)
        {
            return (
            <>
                { CanvasObject(item) }
                { item.children.map(renderObjectsRecursive) }
            </>
            )
        }else{
            return CanvasObject(item);
        }

    }
    // stage.stageRef.current.batchDraw();

    return (
        <Flex ref={ref} direction={{base:'column'}}>
            <Stage width={window.innerWidth-640} height={window.innerHeight-100}>
                <Layer>
                    { widgetNodes.map( renderObjectsRecursive ) }
                    {/*{ selectedKonvaNode && <Transformer node={  }></Transformer> }*/}
                </Layer>
            </Stage>
            <Box h={20}><Text>{`x: ${x}, y: ${y} `}</Text></Box>
        </Flex>
    )
}
export default Canvas
