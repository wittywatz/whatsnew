import { createSelector } from 'reselect';

const errorSelect = (state) => state.errors;

export const errors = createSelector([errorSelect], (auth) => auth.error);
