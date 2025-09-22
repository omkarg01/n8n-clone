// TaskNode.tsx (example node)
import { Handle, Position } from "@xyflow/react";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import Drawer from "./Drawer";

export default function TaskNode({ data }: any) {
    console.log("data", data)
    // let isRoot = data.id == "1";
    // console.log("isRoot", isRoot)

    const [showDrawer, setShowDrawer] = useState(false);
    const [showNode, setShowNode] = useState(false)
    const [nodeData, setNodeData] = useState<{id?: "1"}>({})

    const handleChildData = (data: any): void => {
        setNodeData(data)
        setShowNode(true)
    }

    if (!showNode) {
        // Show only Plus initially
        return (
            <>
                <button onClick={() => setShowDrawer(true)}>
                    <SquarePlus className="hover:text-[var(--orange)]" size={14} />
                </button>
                <Drawer placement={"end"} show={showDrawer} onClose={() => setShowDrawer(false)} onSendData={handleChildData} />
            </>
        );
    }

    return (
        <div
            className="p-2.5 text-xs font-normal border border-white bg-[var(--charcoal)] rounded-lg 
      min-w-[50px] min-h-[50px] text-center flex flex-col items-center justify-center relative"
        >
            <strong>{data.label}</strong>

            {/* Left edge only if not root */}
            {nodeData.id == "1" && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!w-3 !h-3 bg-white border border-gray-500"
                />
            )}

            {/* Right edge → with extend button */}
            <Handle
                type="source"
                position={Position.Right}
                className="!w-2 !h-2 bg-white border-none"
            >
                <button
                    className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1 
                     hover:bg-[var(--orange)]"
                    onClick={() => data.onAdd?.(data.id)}
                >
                    <SquarePlus size={14} />
                </button>
            </Handle>
        </div>
    );
}
