import { createSelector } from '@reduxjs/toolkit';

export const selectAllTasks = state => state.tasks.list;
export const selectActiveFilter = state => state.filters;

export const selectTasksByFilter = createSelector(
    [selectAllTasks, selectActiveFilter],
    (allTasks, activeFilter) => {
        if (activeFilter === 'filterReset') return allTasks;
        if (activeFilter === 'filterComplete') {
            return allTasks.filter(task => task.isComplete)
        }
        if (activeFilter === 'filterNoComplete') {
            return allTasks.filter(task => !task.isComplete)
        };
    }
)