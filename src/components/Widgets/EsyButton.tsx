import {Rect,Text as TextItem} from "react-konva";
import React from "react";
import {WidgetItemType} from "../../context/EditorContext";

const EsyButton = ( item: WidgetItemType ) =>
{

    return <>
        <Rect
            draggable
            // onDragMove={onObjectDragMove}
            // onDragEnd={onObjectDragEnd}
            // onClick={onObjectSelected}
            id={item.id}
            key={item.id}
            width={item.properties.width}
            height={item.properties.height}
            x={item.properties.x}
            y={item.properties.y}
            fill={item.properties.color}
            opacity={item.properties.opacity?item.properties.opacity/100:0}
            stroke={ item.properties.border ? item.properties.border?.color : undefined }
            cornerRadius={item.properties.radius}
        />
    </>
}


export default EsyButton
