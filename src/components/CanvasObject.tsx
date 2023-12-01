import React from 'react'
import {egWidgetTypes, WidgetItemType} from "../context/EditorContext";
import {Rect} from "react-konva";
import {Text as TextItem} from "react-konva";

const CanvasObject = ( item:WidgetItemType ) => {
    switch (item.properties.type) {
        case egWidgetTypes.LvObject:
            return <Rect id={item.id} key={item.id} width={item.properties.width} height={item.properties.height} x={item.properties.x} y={item.properties.y} fill={item.properties.color} opacity={item.properties.opacity?item.properties.opacity/100:0} cornerRadius={item.properties.radius}/>;
        case egWidgetTypes.LvLabel:
            return <TextItem text={item.text||'Text'} id={item.id} key={item.id} width={item.properties.width} height={item.properties.height} x={item.properties.x} y={item.properties.y} fill={item.properties.color} opacity={item.properties.opacity?item.properties.opacity/100:0} cornerRadius={item.properties.radius}/>;
        case egWidgetTypes.LvButton:
            return <Rect id={item.id} key={item.id} width={item.properties.width} height={item.properties.height} x={item.properties.x} y={item.properties.y} fill={item.properties.color} opacity={item.properties.opacity?item.properties.opacity/100:0} cornerRadius={item.properties.radius}/>;
        // case egWidgetTypes.LvImage:
        //     return <Image image={}/>;
        // case egWidgetTypes.LvRoller:
        //     return </>;
        // case egWidgetTypes.LvList:
        //     return </>;
        // case egWidgetTypes.LvTabview:
        //     return </>;
        default:
            return <Rect id={item.id} key={item.id} width={item.properties.width} height={item.properties.height} x={item.properties.x} y={item.properties.y} fill={item.properties.color} opacity={item.properties.opacity?item.properties.opacity/100:0} cornerRadius={item.properties.radius}/>;
    }
}
export default CanvasObject
