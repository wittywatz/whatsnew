import { createSelector } from 'reselect';

const userSelect = (state) => state.auth;

export const currentUser = createSelector([userSelect], (auth) => auth.user);
