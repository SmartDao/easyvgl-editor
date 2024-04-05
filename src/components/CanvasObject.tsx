import React from 'react'
import {egWidgetTypes, useEditorContext, WidgetItemType} from "../context/EditorContext";
import {Rect} from "react-konva";
import {Text as TextItem} from "react-konva";
import {KonvaEventObject} from "konva/lib/Node";


const CanvasObject = ( item:WidgetItemType ) => {

    const { objectOnClicked, widgetTool } = useEditorContext()

    const onObjectDragMove = (evt: KonvaEventObject<DragEvent>) => {
        console.log("onObjectMove")
    };

    const onObjectDragEnd = (evt: KonvaEventObject<DragEvent>) => {

        console.log(evt.target.x(),evt.target.y())
        console.log("onObjectMoveEnd")

        widgetTool?.setPos( item, {x:evt.target.x(),y: evt.target.y()} )

    };

    switch (item.properties.type) {
        case egWidgetTypes.view:
            return <Rect
                draggable
                onDragMove={onObjectDragMove}
                onDragEnd={onObjectDragEnd}
                onClick={ (evt)=>{objectOnClicked(evt,item)} }
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={item.properties.x}
                y={item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                cornerRadius={item.properties.radius}
            />;
        case egWidgetTypes.text:
            return <TextItem
                text={item.text||'Text'}
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={item.properties.x}
                y={item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
                cornerRadius={item.properties.radius}
            />;
        case egWidgetTypes.button:
            return <Rect
                id={item.id}
                key={item.id}
                width={item.properties.width}
                height={item.properties.height}
                x={item.properties.x}
                y={item.properties.y}
                fill={item.properties.color}
                opacity={item.properties.opacity?item.properties.opacity/100:0}
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
            return <Rect id={item.id} key={item.id} width={item.properties.width} height={item.properties.height} x={item.properties.x} y={item.properties.y} fill={item.properties.color} opacity={item.properties.opacity?item.properties.opacity/100:0} cornerRadius={item.properties.radius}/>;
    }
}
export default CanvasObject
