import React, {ReactNode} from 'react'
import {Box, Code, Flex, Stack, Text} from "@mantine/core";
import {egWidgetTypes, ProjectExportMode, useEditorContext, WidgetItemType} from "../context/EditorContext";

const Coding = () => {

    const { saveToFile } = useEditorContext();

    return (
        <Code block>
            { saveToFile( ProjectExportMode.easyVGL_C ) }
        </Code>
    )
}
export default Coding
