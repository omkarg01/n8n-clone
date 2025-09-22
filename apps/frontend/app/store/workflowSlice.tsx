import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Node {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        label: string;
    };
    taskName: string;
    image: string;
}

const initialState: Node[] = [
{
  id: "1",
  type: "task",
  position: { x: 100, y: 100 },
  data: { label: "Start" },
  taskName: "Telegram",
  image: "https://images.icon-icons.com/923/PNG/256/telegram_icon-icons.com_72055.png"
}]

const workflowSlice = createSlice({
    name: 'workflow',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<Node>) {
            const { id, ...rest } = action.payload;
            const newNode = { id: (state.length + 1).toString(), ...rest };
            console.log("newNode", newNode)
            return [...state, newNode];
        }
    }
})


export const { addNode } = workflowSlice.actions;
export default workflowSlice.reducer;
