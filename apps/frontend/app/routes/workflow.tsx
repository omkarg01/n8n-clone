import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SquarePlus } from 'lucide-react'
import TaskNode from "~/components/Workflow/TaskNode";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";


const nodeTypes = {
  task: TaskNode,
};

// const initialNodes = [
//   {
//     id: "1",
//     type: "task",
//     position: { x: 100, y: 100 },
//     data: { label: "Start" } 
//    },
// ];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#ff0000', strokeWidth: 2 }
  }
];
export default function Workflow() {
  const initialNodes: any = useSelector((state: RootState) => state.workflow);
  console.log("intialNodes", initialNodes)
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((ns: any) => {
        const updatedNodes = applyNodeChanges(changes, ns);

        // Log positions of all nodes
        updatedNodes.forEach((node: any) => {
          console.log(`Node ${node.id} position:`, node.position);
        });

        return updatedNodes;
      });
    },
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((es: any) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((es: any) => addEdge(params, es)),
    []
  );

  return (
    <div style={{ width: "100%", height: "90vh", background: "#2D2E2E" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background gap={8} size={0.6} />
      </ReactFlow>
    </div>
  );
}
