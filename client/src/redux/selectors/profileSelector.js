import { createSelector } from 'reselect';

const profileSelect = (state) => state.profile;

export const currentProfile = createSelector(
  [profileSelect],
  (auth) => auth.profile
);
