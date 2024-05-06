import { defaultTasks } from '../utils/constants';
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { list: defaultTasks },
    reducers: {
        addTask(state, action) {
            state.list.push({
                _id: new Date().toISOString(),
                task: action.payload.taskValue,
                isComplete: false
            })
        },
        changeTask(state, action) {
            state.list = state.list.filter(task => task._id !== action.payload._id)
            state.list.push({
                _id: action.payload._id,
                task: action.payload.task,
                isComplete: action.payload.isComplete
            })

        },
        deleteTask(state, action) {
            state.list = state.list.filter(task => task._id !== action.payload._id);
        },
        changeStatus(state, action) {
            const foundElement = state.list.find((item) => item._id === action.payload._id)
            foundElement.isComplete = !foundElement.isComplete;
        }
    }
})

export const { addTask, changeTask, deleteTask, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;