import {WidgetItemType} from "../../context/EditorContext";

const grObjectName = ( item:WidgetItemType )=>
{
    return `lv_${item.label}`;
}

const ConverterLVGL_C =
{
    genPage( items: WidgetItemType[] ):string
    {
        let fileContent = "";

        const recursiveGenCoding = (item:WidgetItemType, depth:number, parent?: WidgetItemType)  =>
        {
            // fileContent += Array(depth).fill("\t").join('');
            fileContent += `lv_obj_t * ${grObjectName(item)} = ${item.properties.type}_create( ${parent ? grObjectName(parent) : 'NULL'} );\n`;

            fileContent += `lv_obj_set_pos( ${grObjectName(item)} , ${item.properties.x}, ${item.properties.y} );\n`;
            fileContent += `lv_obj_set_size( ${grObjectName(item)} , ${item.properties.width}, ${item.properties.height} );\n`;

            if (item.properties.radius)
                fileContent += `lv_obj_set_radius( ${grObjectName(item)} , ${item.properties.radius} )\n`;

            if (item.properties.opacity)
                fileContent += `lv_obj_set_style_bg_color( ${grObjectName(item)}, lv_color_hex( (u32)${item.properties.color}), style->onState);\n`

            fileContent += "\n";

            if (item.children && item.children.length > 0)
                for (let i = 0; i < item.children.length; i++)
                    recursiveGenCoding(item.children[i], depth + 1, item);

        }

        for (let i = 0; i < items.length; i++)
            recursiveGenCoding(items[i], 0, items[i]);

        return  fileContent;
    }
}


export default ConverterLVGL_C;