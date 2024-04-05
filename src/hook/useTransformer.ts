import {RefObject, useRef} from "react";
import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";


const useTransformer = () => {

    const transformerRef = useRef() as RefObject<Konva.Transformer>;

    const onTransformEnd = ( e: KonvaEventObject<Event> )=>{

    }

    const setTransformerConfig = (transformer: Konva.Transformer) => {

    }

    return {
        transformerRef,
        onTransformEnd,
        setTransformerConfig,
    };
}

export default useTransformer;