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

const recursiveGenCode = (item:WidgetItemType, depth:number, parent?: WidgetItemType): string => {

    let content = "";

    content += propertiesToEasyVGLView(item, depth, parent);

    if (item.children && item.children.length > 0)
        for (let i = 0; i < item.children.length; i++)
            content += recursiveGenCode(item.children[i], depth + 1, item);

    return content;
}

const ConverterEASYGL_C =
{
    genStyles(item: WidgetItemType[]): string
    {
        return ""
    },

    genViews(item: WidgetItemType[]): string
    {
        return ""
    },

    genPage( items: WidgetItemType[] ):string
    {

        let fileContent = '';

        // const useLVGLCase = false;
        //
        // const recursiveGenerateCoding = (item:WidgetItemType, depth:number, parent?: WidgetItemType) =>
        // {
        //     if (useLVGLCase) {
        //         // fileContent += Array(depth).fill("\t").join('');
        //         fileContent += `lv_obj_t * ${grObjectName(item)} = ${item.properties.type}_create( ${parent ? grObjectName(parent) : 'NULL'} );\n`;
        //
        //         fileContent += `lv_obj_set_pos( ${grObjectName(item)} , ${item.properties.x}, ${item.properties.y} );\n`;
        //         fileContent += `lv_obj_set_size( ${grObjectName(item)} , ${item.properties.width}, ${item.properties.height} );\n`;
        //
        //         if (item.properties.radius)
        //             fileContent += `lv_obj_set_radius( ${grObjectName(item)} , ${item.properties.radius} )\n`;
        //
        //         if (item.properties.opacity)
        //             fileContent += `lv_obj_set_style_bg_color( ${grObjectName(item)}, lv_color_hex( (u32)${item.properties.color}), style->onState);\n`
        //
        //
        //         fileContent += "\n";
        //     }
        //     else
        //     {
        //         fileContent += `EsyViewStyle ess_${grObjectName(item)}[] = {\n`
        //         fileContent += propertiesToEasyVGL( item );
        //         fileContent += `};\n`
        //
        //         fileContent += `ESY_CREATE( ${item.properties.type}, ${ parent ? grObjectName(parent) : 'NULL' } );\n`
        //         fileContent += `ESY_STYLE( ${grObjectName(item)}, ess_${grObjectName(item)} );\n`
        //
        //         fileContent += "\n";
        //     }
        //     if (item.children && item.children.length > 0)
        //         for (let i = 0; i < item.children.length; i++)
        //             recursiveGenerateCoding(item.children[i], depth + 1, item);
        //
        // }

        for (let i = 0; i < items.length; i++)
            fileContent += recursiveGenStyle( items[i], 0, undefined );

        for (let i = 0; i < items.length; i++)
            fileContent += recursiveGenCode( items[i], 0, undefined );

        // console.log(fileContent);
        return fileContent;

        // return this.genStyles( items ) + this.genViews( items )
    }
}

export default ConverterEASYGL_C;