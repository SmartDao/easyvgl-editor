import {egWidgetTypes} from "../context/EditorContext";

export interface WidgetLine
{
    border: number,
    opacity: number, // 0-100
    color: string
}

export interface WidgetBorder
{
    left: WidgetLine,
    right: WidgetLine,
    top: WidgetLine,
    bottom: WidgetLine
}

export interface WidgetSimpleBorder extends WidgetLine
{

}

export interface WidgetShadow
{
    x: number,
    y: number,
    blur: number,
    color: string,
    opacity: number // 0-100
}

export interface WidgetFont
{
    font: string,
    size: number,
    color: string
}

export interface  WidgetProperty
{
    x:number,
    y:number,
    width:number,
    height:number,
    radius:number,
    color?: string,
    font?: WidgetFont,
    borders?: WidgetBorder,
    border?: WidgetSimpleBorder,
    shadow?: WidgetShadow,
    opacity?: number, // 0-100
    type:egWidgetTypes
}

export interface PosChangeType
{
    x? : number
    y? : number
}

export interface SizeChangeType
{
    w? : number
    h? : number
}
