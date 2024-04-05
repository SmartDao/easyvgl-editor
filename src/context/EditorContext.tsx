import React, {createContext, useContext, useState} from "react";
import { cloneDeep } from "lodash";

import {EditorSetup} from "../core/EditorSetup";
import {ReactTreeListItemType} from "@bartaxyz/react-tree-list";
import TypedObjectIcon from "../components/TypedObjectIcon";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import Rect = Konva.Rect;
import {randomId, useCounter} from "@mantine/hooks";
import ConverterEasyVGLC from "../core/converter/easyVGL-C";
import ConverterLVGL_C from "../core/converter/LVGL-C";

export enum egWidgetTypes
{
    view = 'EsView',
    text = 'EsText',
    button = 'EsButton',
    image = 'EsImage',

    LvRoller = 'LvRoller',
    LvList = 'LvList',
    tabview = 'EsTabview',
}

export enum ProjectExportMode
{
    easyVGL_C,
    LVGL_C
}

interface  WidgetProperty
{
    x:number,
    y:number,
    width:number,
    height:number,
    radius:number,
    color?: string,
    opacity?: number, // 0-100
    type:egWidgetTypes
}

interface PosChangeType
{
    x? : number
    y? : number
}

interface SizeChangeType
{
    w? : number
    h? : number
}

export interface  WidgetItemType extends ReactTreeListItemType
{
    text?:string
    properties: WidgetProperty
    children?: WidgetItemType[]|undefined
}

export type egNode =
{
    id: number,
    name: string,
    type: egWidgetTypes,
    children: egNode[]
}

export type egPage =
{
    id: number,
    name: string
}

type WidgetTool =
{
    setName: (node:WidgetItemType, value:string) => void;
    setColor: (node:WidgetItemType, color:string|undefined) => void;
    setPos: (node:WidgetItemType, pos:PosChangeType) => void;
    setSize: (node:WidgetItemType, size:SizeChangeType) => void;
    setOpacity: (node:WidgetItemType, opacity:number|undefined) => void;
    setRadius: (node:WidgetItemType, radius:number) => void;
}

type EditorContextType =
{
    name:string;
    widgetTool: WidgetTool|undefined,
    selectedNode: WidgetItemType|undefined,
    selectedKonvaNode: Rect|undefined,
    widgetNodes: WidgetItemType[],

    setWidgetNodes: (nodes:WidgetItemType[])=> void;
    addWidgetNode: (objectType:egWidgetTypes)=>void;
    onWidgetNodesChange: (data: WidgetItemType[])=>void;
    onWidgetNodeSelected: (item:WidgetItemType) => void;
    onWidgetNodeDrop: (draggingNode:WidgetItemType, dragNode:WidgetItemType, dragType:string) => void;

    objectOnClicked: (evt:KonvaEventObject<MouseEvent>,item:WidgetItemType)=>void;

    setEditor: (editor: EditorSetup) => void;


    saveToFile: (mode:ProjectExportMode )=> string;
}

/** Struct define
 *
    APP
     - Layers
       - Pages
         - Widgets
    Components
    Assets
     - Fonts
     - Images
    Presets
    Configs
**/

const initialWidgetNodes:WidgetItemType[] =
    [

    ];

const EditorContext = createContext<EditorContextType>({
    name:'EditorContext',
    widgetTool: undefined,
    selectedNode: undefined,
    selectedKonvaNode: undefined,
    widgetNodes: [],
    setWidgetNodes: ()=>{},
    addWidgetNode: ()=>{},
    onWidgetNodesChange: ()=>{},
    onWidgetNodeSelected: ()=>{},
    onWidgetNodeDrop: ()=>{},
    setEditor: ()=>{},
    saveToFile: (mode:ProjectExportMode ) : string => { return "" },
    objectOnClicked: ()=>{},
});

export const EditorProvider = ({children} : {children: React.ReactNode}) => {
    const [name, setName] = useState('MyEditor');
    const [editor, setEditor] = useState<EditorSetup|null>(null);
    const [selectedNode,setSelectedNode] = useState<WidgetItemType|undefined>(undefined);
    const [selectedKonvaNode, setSelectedKonvaNode] = useState<Konva.Rect|undefined>(undefined);
    const [widgetNodes,setWidgetNodes] = useState<WidgetItemType[]>(initialWidgetNodes);

    const [autoNodeId, autoNodeIdCounter] = useCounter(1000)

    // when change ( issue  1. add object not trigger  2. trigger when select )
    const onWidgetNodesChange = (data: WidgetItemType[]) => {
        setWidgetNodes(data);
    };

    const setNodeSelected = ( n:WidgetItemType, selected: boolean ) => {

        const recursiveSetSelected = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetSelected);
            if (item.id===n.id) {
                item.selected = selected;

                if (!selected)
                    setSelectedNode(undefined);
                else
                    setSelectedNode( item );

            }else
                item.selected = false
            return item;
        }
        const newWidgets = widgetNodes.map(recursiveSetSelected);
        setWidgetNodes( cloneDeep(newWidgets) );
    }

    // selected
    const onWidgetNodeSelected = (item:WidgetItemType) => {

        // if( item.id === selectedNode?.id )
        // {
            // cancel selected
            // setNodeSelected( item, !item.selected );
        // }

        setSelectedNode(cloneDeep(item));
        console.log("choosing item =", item);
    };

    // sm obj dropped in a obj
    const onWidgetNodeDrop = (draggingNode:WidgetItemType, dragNode:WidgetItemType, dragType:string) => {
        console.log("draggingNode:", draggingNode);
        console.log("dragNode:", dragNode);
        console.log("dragType:", dragType);
    };


    const addWidgetNode = (t:egWidgetTypes) =>
    {
        autoNodeIdCounter.increment();

        const newWidget = {
            label: `${t}_${autoNodeId}`,
            icon: <TypedObjectIcon icon={t}/>,
            properties: {
                type: t,
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                radius: 0,
                opacity:100
            }
        }
        const recursiveAddNode = (item:WidgetItemType)=>{
            if (item.children && item.children.length > 0)
                item.children = item.children.map(recursiveAddNode);

            if (selectedNode?.id===item.id)
            {
                if (undefined===item?.children || 0===item.children.length) item.children = [];
                item?.children?.push(newWidget)
            }
            return item;
        }

        if (selectedNode&&selectedNode.id){
            setWidgetNodes(widgetNodes.map( recursiveAddNode ));
        }else{
            widgetNodes.push(newWidget);
            setWidgetNodes(cloneDeep(widgetNodes));
        }

    }

    const setWidgetName = (n:WidgetItemType, value:string) => {
        if (value.length>24) return;

        const recursiveSetName = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetName);
            if (item.id===n.id) {
                item.label = value;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes( widgetNodes.map(recursiveSetName));
    };

    const setWidgetColor = (n:WidgetItemType, color: string|undefined) => {

        const recursiveSetColor = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetColor);
            if (item.id===n.id) {
                item.properties.color = color ? color : undefined;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes(widgetNodes.map(recursiveSetColor));
    }

    const setWidgetPosition = (n:WidgetItemType, pos:PosChangeType) => {

        const recursiveSetColor = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetColor);
            if (item.id===n.id) {
                if (typeof pos.x==='number') item.properties.x = pos.x;
                if (typeof pos.y==='number') item.properties.y = pos.y;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes(widgetNodes.map(recursiveSetColor));
    }

    const setWidgetSize = (n:WidgetItemType, size:SizeChangeType) => {

        const recursiveSetColor = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetColor);
            if (item.id===n.id) {
                if (size.w) item.properties.width = size.w;
                if (size.h) item.properties.height = size.h;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes(widgetNodes.map(recursiveSetColor));
    }

    const setWidgetOpacity = (n:WidgetItemType, opacity:number|undefined) => {

        const recursiveSetColor = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetColor);
            if (item.id===n.id) {
                if (opacity) item.properties.opacity = opacity;
                else item.properties.opacity = 0;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes(widgetNodes.map(recursiveSetColor));
    }

    const setWidgetRadius = (n:WidgetItemType, radius:number) => {

        const recursiveSetColor = (item:WidgetItemType) => {
            if (item.children && item.children.length > 0) item.children.map(recursiveSetColor);
            if (item.id===n.id) {
                if (isNaN(radius)) radius=0;
                item.properties.radius = radius;
                setSelectedNode(item);
            }
            return item;
        }
        setWidgetNodes(widgetNodes.map(recursiveSetColor));
    }

    const widgetTool = {
        setName: setWidgetName,
        setColor: setWidgetColor,
        setPos: setWidgetPosition,
        setSize: setWidgetSize,
        setOpacity: setWidgetOpacity,
        setRadius: setWidgetRadius
    };

    const objectOnClicked = (evt: KonvaEventObject<MouseEvent>,item:WidgetItemType) => {

        setNodeSelected(item,true)
        // setSelectedKonvaNode(evt.target)
        console.log(evt)
        console.log(item)
    };

    const saveToFile = ( mode:ProjectExportMode ) : string => {

        switch (mode)
        {
            case ProjectExportMode.LVGL_C:
                return ConverterLVGL_C.genPage( widgetNodes );
            case  ProjectExportMode.easyVGL_C:
            default:
                return ConverterEasyVGLC.genPage( widgetNodes );
        }
    }

    const contextValue = {
        name,
        editor,
        widgetTool,
        selectedNode,
        selectedKonvaNode,
        widgetNodes,
        setWidgetNodes,
        addWidgetNode,
        onWidgetNodesChange,
        onWidgetNodeSelected,
        onWidgetNodeDrop,
        setEditor,

        saveToFile,

        objectOnClicked,
    };

    return (
        <EditorContext.Provider value={contextValue}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = ()=> useContext(EditorContext);