import createReducer from '../createReducer';
import { DATA_RECEIVED, FILTERS_RECEIVED } from '../actionTypes';
import { processIssue } from '../services/issues';

const initialState = {
    data: [],
    filters: {},
};

export default createReducer({
  [DATA_RECEIVED](state, { payload }) {
    return Object.assign({}, state, { data: payload.map(processIssue) });
  },
  [FILTERS_RECEIVED](state, { payload }) {
    return Object.assign({}, state, { filters: payload });
  },

}, initialState);
