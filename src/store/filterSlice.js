import { createSlice } from '@reduxjs/toolkit';
const initialState = 'filterReset';

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (_, action) => action.payload,
    },
})

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;