import React, {JSX, ReactNode} from 'react'
import {Box, Code, Flex, Stack, Text} from "@mantine/core";
import {egWidgetTypes, useEditorContext, WidgetItemType} from "../context/EditorContext";
import { useMouse } from '@mantine/hooks';
import {Stage, Layer, Rect, Text as TextItem, Group as GroupItem, Transformer} from 'react-konva';
import CanvasObject from "./CanvasObject";
import useTransformer from "../hook/useTransformer";
import {KonvaEventObject, Node, NodeConfig} from "konva/lib/Node";

const Canvas = () => {

    const { widgetNodes, selectedNode, objectOnClicked, widgetTool } = useEditorContext();
    const { ref, x, y } = useMouse();
    const transformer = useTransformer();
    const renderObjectsRecursive: (item: WidgetItemType) => (JSX.Element) = (item: WidgetItemType) => {
        // todo return group object

        const onObjectDragEnd = (evt: KonvaEventObject<DragEvent>) => {

            if(item.id+'_cont' === evt.target.id())
                widgetTool?.setPos( item, {x:evt.target.x(),y: evt.target.y()} )
        };

        if (item.children && item.children.length)
        {
            return (
            <>
                <GroupItem
                    draggable
                    onDragEnd={onObjectDragEnd}
                    id={item.id+'_cont'}
                    key={item.id+'_cont'}
                    width={item.properties.width}
                    height={item.properties.height}
                    x={item.properties.x}
                    y={item.properties.y}
                    // fill={item.properties.color}
                    opacity={item.properties.opacity?item.properties.opacity/100:0}
                    // cornerRadius={item.properties.radius}
                    // stroke={ item.properties.border ? item.properties.border?.color : undefined }
                >
                    { CanvasObject(item, transformer, true) }
                    { item.children.map(renderObjectsRecursive) }
                </GroupItem>

                {/*{ item.children.map(renderObjectsRecursive) }*/}
            </>
            )
        }else{
            return CanvasObject(item, transformer);
        }

    }
    // stage.stageRef.current.batchDraw();

    return (
        <Flex ref={ref} direction={{base:'column'}}>
            <Stage width={window.innerWidth-640} height={window.innerHeight-100}>
                <Layer>
                    { widgetNodes.map( renderObjectsRecursive ) }
                    {
                        selectedNode &&
                        <Transformer
                            ref={transformer.transformerRef}
                            keepRatio
                            shouldOverdrawWholeArea
                            boundBoxFunc={(_, newBox) => newBox}
                            onTransformEnd={transformer.onTransformEnd}
                        />
                    }
                </Layer>
            </Stage>
            <Box h={20}><Text>{`x: ${x}, y: ${y} `}</Text></Box>
        </Flex>
    )
}
export default Canvas
