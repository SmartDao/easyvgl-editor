import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { useState } from "react";
import useTransformer from "./useTransformer";
import Konva from "konva";

const useSelection = (transformer: ReturnType<typeof useTransformer>) => {
    const [selectedItems, setSelectedItems] = useState<Konva.Node[]>(
        [] as Konva.Node[],
    );

    const onSelectItem = (e?: KonvaEventObject<MouseEvent>, itemList?: Node<NodeConfig>[]) => {
        if (transformer === undefined || transformer === null) {
            console.error("transformer is not given");
            return;
        }
        if (!transformer.transformerRef.current) {
            return;
        }
        if (itemList) {
            // const newNodeList = itemList.filter(
            //   (item, _, array) =>
            //     item.attrs["data-item-type"] === "frame" ||
            //     item.getParent().attrs["name"] !== "label-group"
            // );
            // console.log("item list", newNodeList);
            transformer.transformerRef.current.nodes(itemList);
            transformer.setTransformerConfig(transformer.transformerRef.current);
            setSelectedItems(itemList);
            return;
        }
        if (!e) {
            return;
        }
        if (e.target.getType() === "Stage") {
            transformer.transformerRef.current.nodes([]);
            transformer.setTransformerConfig(transformer.transformerRef.current);
            setSelectedItems([]);
            return;
        }
        let newItemList = [] as Konva.Node[];
        const targetItem
            = e.target.name() === "label-text"
            ? e.target.getParent()!.getParent()!.findOne(".label-target")
            : e.target;
        if (!e.evt.shiftKey) {
            newItemList = [targetItem!];
        } else if (selectedItems.find((item) => item.id() === targetItem!.id())) {
            newItemList = selectedItems.filter((item) => item.id() !== targetItem!.id());
        } else {
            newItemList = [...selectedItems, targetItem!];
        }
        transformer.transformerRef.current.nodes(newItemList);
        transformer.setTransformerConfig(transformer.transformerRef.current);
        setSelectedItems(newItemList);
    };

    const clearSelection = () => {
        if (transformer.transformerRef.current) {
            transformer.transformerRef.current.nodes([]);
            transformer.setTransformerConfig(transformer.transformerRef.current);
        }
        setSelectedItems([]);
    };

    return {
        selectedItems,
        setSelectedItems,
        onSelectItem,
        clearSelection,
    };
};

export default useSelection;
