import React, {createContext, useContext, useState} from "react";

import {EditorSetup} from "../core/EditorSetup";
import {ReactTreeListItemType} from "@bartaxyz/react-tree-list";
import TypedObjectIcon from "../components/TypedObjectIcon";

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

type EditorContextType =
{
    name:string;
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
    // todo move to context


    const addWidgetNode = (t:egWidgetTypes) =>
    {
        setWidgetNodes([...widgetNodes,{
            label: t,
            icon: <TypedObjectIcon icon={t}/>
        }])
    }

    const contextValue = {
        name,
        editor,
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