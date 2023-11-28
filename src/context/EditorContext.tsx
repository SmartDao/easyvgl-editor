import React, {createContext, useContext, useState} from "react";
import { useImmer } from "use-immer";
import {Draft, produce, setAutoFreeze} from "immer";

import {EditorSetup} from "../core/EditorSetup";
import {ReactTreeListItemType} from "@bartaxyz/react-tree-list";
import TypedObjectIcon from "../components/TypedObjectIcon";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
setAutoFreeze(false);

export enum egWidgetTypes
{
    LvObject = 'lv_object',
    LvLabel = 'lv_label',
    LvButton = 'lv_button',
    LvImage = 'lv_image',

    LvRoller = 'lv_roller',
    LvList = 'lv_list',
    LvTabview = 'lv_tabview',
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
    setName: (node:ReactTreeListItemType, value:string) => void;
}

type EditorContextType =
{
    name:string;
    widgetTool: WidgetTool|undefined,
    selectedType: egWidgetTypes|undefined,
    selectedNode: ReactTreeListItemType|undefined,
    widgetNodes: ReactTreeListItemType[],

    setWidgetNodes: (nodes:ReactTreeListItemType[])=> void;
    addWidgetNode: (objectType:egWidgetTypes)=>void;
    onWidgetNodesChange: (data: ReactTreeListItemType[])=>void;
    onWidgetNodeSelected: (item:ReactTreeListItemType) => void;
    onWidgetNodeDrop: (draggingNode:ReactTreeListItemType, dragNode:ReactTreeListItemType, dragType:string) => void;
    setEditor: (editor: EditorSetup) => void;
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


const initialWidgetNodes:ReactTreeListItemType[] =
    [

    ];

const EditorContext = createContext<EditorContextType>({
    name:'EditorContext',
    widgetTool: undefined,
    selectedType: undefined,
    selectedNode: undefined,
    widgetNodes: [],
    setWidgetNodes: ()=>{},
    addWidgetNode: ()=>{},
    onWidgetNodesChange: ()=>{},
    onWidgetNodeSelected: ()=>{},
    onWidgetNodeDrop: ()=>{},
    setEditor: ()=>{}
});

export const EditorProvider = ({children} : {children: React.ReactNode}) => {
    const [name, setName] = useState('MyEditor');
    const [editor, setEditor] = useState<EditorSetup|null>(null);
    const [selectedType,setSelectedType] = useState<egWidgetTypes|undefined>(undefined);
    const [selectedNode,setSelectedNode] = useState<ReactTreeListItemType|undefined>(undefined);

    const [widgetNodes,setWidgetNodes] = useState<ReactTreeListItemType[]>(initialWidgetNodes);


    // when change ( issue  1. add object not trigger  2. trigger when select )
    const onWidgetNodesChange = (data: ReactTreeListItemType[]) => {
        setWidgetNodes(data);
        console.log(data);
        console.log("tree list changed.");
    };

    // selected
    const onWidgetNodeSelected = (item:ReactTreeListItemType) => {
        setSelectedNode(item);
        console.log("choosing item =", item);
    };

    // sm obj dropped in a obj
    const onWidgetNodeDrop = (draggingNode:ReactTreeListItemType, dragNode:ReactTreeListItemType, dragType:string) => {
        console.log("draggingNode:", draggingNode);
        console.log("dragNode:", dragNode);
        console.log("dragType:", dragType);
    };


    const addWidgetNode = (t:egWidgetTypes) =>
    {
        setWidgetNodes( produce((draft) => {
            draft.push({
                label: t,
                icon: <TypedObjectIcon icon={t}/>
            })
        }));
    }

    const setWidgetName = (n:ReactTreeListItemType, value:string) => {
        if (value.length>24) return;

        // produce immer update ( update input error * cannot update deep data )
        // setWidgetNodes(produce((draft) => {
        //     const node = draft.find(a => a.id === n.id);
        //     if (node) {
        //         node.label = value;
        //         // setSelectedNode(node);
        //     }
        //     // console.log(node)
        // }));

        // setState update ( cannot update deep data )
        // const nextWidgetNodes:ReactTreeListItemType[] = widgetNodes.map( (node)=>{
        //     if (node.id===n.id){
        //         node.label = value;
        //         setSelectedNode(node);
        //         return node;
        //     }else
        //         return node;
        // });
        // setWidgetNodes(nextWidgetNodes);



    };

    const widgetTool = {
        setName: setWidgetName
    };

    const contextValue = {
        name,
        editor,
        widgetTool,
        selectedType,
        selectedNode,
        widgetNodes,
        setWidgetNodes,
        addWidgetNode,
        onWidgetNodesChange,
        onWidgetNodeSelected,
        onWidgetNodeDrop,
        setEditor
    };

    return (
        <EditorContext.Provider value={contextValue}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = ()=> useContext(EditorContext);