import {WidgetItemType} from "../../context/EditorContext";

const grObjectName = ( item:WidgetItemType )=>
{
    return `esy_${item.label}`;
}

const propertiesToEasyVGLStyle = function ( item: WidgetItemType, depth: number, parent?: WidgetItemType ):string
{
    let allEss = `EsyViewStyle ess_${grObjectName(item)}[] = {\n`

    allEss += `\tessPos( ${item.properties.x}, ${item.properties.y} ),\n`

    if(item.properties.opacity && item.properties.color)
        allEss += `\tessBg( ${item.properties.color} ),\n`
    else
        allEss += '\tessNoBg(),\n'

    allEss += `\tessEnd()\n`
    allEss += "};\n"

    return allEss;
}

const recursiveGenStyle = (item:WidgetItemType, depth:number, parent?: WidgetItemType): string => {

    let content = "";

    content += propertiesToEasyVGLStyle(item, depth, parent);

    if (item.children && item.children.length > 0)
        for (let i = 0; i < item.children.length; i++)
            content += recursiveGenStyle(item.children[i], depth + 1, item);

    return content;
}
const propertiesToEasyVGLView = function ( item: WidgetItemType, depth: number, parent?: WidgetItemType ):string {

    return "\n"
    + `ESY_CREATE( ${item.properties.type}, ${ parent ? grObjectName(parent) : 'NULL' } );\n`
    + `ESY_STYLE( ${grObjectName(item)}, ess_${grObjectName(item)} );\n`
}

const recursiveGenView = (item:WidgetItemType, depth:number, parent?: WidgetItemType): string => {

    let content = "";

    content += propertiesToEasyVGLView(item, depth, parent);

    if (item.children && item.children.length > 0)
        for (let i = 0; i < item.children.length; i++)
            content += recursiveGenView(item.children[i], depth + 1, item);

    return content;
}

const ConverterEASYGL_C =
{
    genStyles(items: WidgetItemType[]): string
    {
        let styles = "";

        for (let i = 0; i < items.length; i++)
            styles += recursiveGenStyle( items[i], 0, undefined );

        return styles;
    },

    genViews(items: WidgetItemType[]): string
    {
        let views = "";

        for (let i = 0; i < items.length; i++)
            views += recursiveGenView( items[i], 0, undefined );

        return views;
    },

    genPage( items: WidgetItemType[] ):string
    {
        return this.genStyles( items ) + this.genViews( items );
    }
}

export default ConverterEASYGL_C;