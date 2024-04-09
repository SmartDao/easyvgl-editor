import React, {RefObject} from 'react'
import {egWidgetTypes, useEditorContext, WidgetItemType} from "../context/EditorContext";
import {Rect,Text as TextItem} from "react-konva";
import {KonvaEventObject, Node, NodeConfig} from "konva/lib/Node";
import useTransformer from "../hook/useTransformer";
import EsyButton from "./Widgets/EsyButton";

const CanvasObject = ( item: WidgetItemType, transformer: ReturnType<typeof useTransformer>, isContainer: boolean = false ) => {

    const { objectOnClicked, widgetTool } = useEditorContext()

    const onObjectDragMove = (evt: KonvaEventObject<DragEvent>) => {
        // console.log("onObjectMove")
    };

    const onObjectDragEnd = (evt: KonvaEventObject<DragEvent>) => {
        console.log("child onObjectMoveEnd",item,evt,evt.target.x(),evt.target.y())

        widgetTool?.setPos( item, {x:evt.target.x(),y: evt.target.y()} )
    };

    const onObjectSelected = (evt: KonvaEventObject<MouseEvent>, itemList?:Node<NodeConfig>[] )=>{
        objectOnClicked(evt,item)
    }

    switch (item.properties.type) {
        case egWidgetTypes.view:
            return <Rect
                draggable={!isContainer}
                onDragMove={onObjectDragMove}
                onDragEnd={onObjectDragEnd}
                onClick={onObjectSelected}
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={isContainer?0:item.properties.x}
                y={isContainer?0:item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                cornerRadius={item.properties.radius}
                stroke={ item.properties.border ? item.properties.border?.color : undefined }
            />;
        case egWidgetTypes.text:
            return <TextItem
                draggable={!isContainer}
                onDragMove={onObjectDragMove}
                onDragEnd={onObjectDragEnd}
                onClick={onObjectSelected}
                text={item.text||'Text'}
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={isContainer?0:item.properties.x}
                y={isContainer?0:item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                stroke={ item.properties.border ? item.properties.border?.color : undefined }
                cornerRadius={item.properties.radius}
            />;
        case egWidgetTypes.button:
            // return EsyButton(item);
            return <Rect
                draggable={!isContainer}
                onDragMove={onObjectDragMove}
                onDragEnd={onObjectDragEnd}
                onClick={onObjectSelected}
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={isContainer?0:item.properties.x}
                y={isContainer?0:item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                stroke={ item.properties.border ? item.properties.border?.color : undefined }
                cornerRadius={item.properties.radius}
            />;
        // case egWidgetTypes.image:
        //     return <Image image={}/>;
        // case egWidgetTypes.LvRoller:
        //     return </>;
        // case egWidgetTypes.LvList:
        //     return </>;
        // case egWidgetTypes.tabview:
        //     return </>;
        default:
            return <Rect
                draggable={!isContainer}
                onDragMove={onObjectDragMove}
                onDragEnd={onObjectDragEnd}
                onClick={onObjectSelected}
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={isContainer?0:item.properties.x}
                y={isContainer?0:item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                stroke={ item.properties.border ? item.properties.border?.color : undefined }
                cornerRadius={item.properties.radius}
            />;
    }
}
export default CanvasObject
