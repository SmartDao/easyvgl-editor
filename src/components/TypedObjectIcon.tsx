import React from 'react'
import {
    IconArrowsMove,
    IconHandStop,
    IconSquareRoundedPlus,
    IconNewSection,
    IconRectangle,
    IconPhoto,
    IconTextSize,
    IconHandFinger,
    IconList,
    IconBaselineDensitySmall,
    IconContainer
} from '@tabler/icons-react';

import {egWidgetTypes as ObjType} from '../context/EditorContext';

export enum IconSizeType
{
    s = 's',
    m = 'm',
    l = 'l',
    xl = 'xl',
    xxl = 'xxl'
}

function getIconSize( size?:IconSizeType )
{
    switch (size) {
        case IconSizeType.s:
            return 12;
        case IconSizeType.m:
            return 16;
        case IconSizeType.xl:
            return 24;
        case IconSizeType.xxl:
            return 32;
        case IconSizeType.l:
        default:
            return 20;
    }
}

function selectedIcon(iconName: string, size?: IconSizeType) {

    switch (iconName) {

        case ObjType.image:
            return <IconPhoto size={getIconSize(size)}/>;

        case ObjType.text:
            return <IconTextSize size={getIconSize(size)}/>;

        case ObjType.button:
            return <IconHandFinger size={getIconSize(size)}/>;

        case ObjType.LvList:
            return <IconList size={getIconSize(size)}/>;

        case ObjType.LvRoller:
            return <IconBaselineDensitySmall size={getIconSize(size)}/>;

        case ObjType.tabview:
            return <IconContainer size={getIconSize(size)}/>;

        case ObjType.view:
        default:
            return <IconRectangle size={getIconSize(size)}/>;
    }


}



const TypedObjectIcon = ( { icon, size } : {icon:string,size?:IconSizeType} ) => {
    return (
        selectedIcon(icon,size)
    );
}

export default TypedObjectIcon
