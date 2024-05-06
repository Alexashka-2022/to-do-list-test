import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import filterReducer from './filterSlice';

export default configureStore({
    reducer: {
        tasks: taskReducer,
        filters: filterReducer,
    }
})