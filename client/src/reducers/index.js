import createReducer from '../createReducer';
import { DATA_RECEIVED, FILTERS_RECEIVED, REQUEST_FILTERS, SUBSCRIBE } from '../actionTypes';
import { processIssue } from '../services/issues';

const initialState = {
  data: [],
  filters: {},
  activeFilter: undefined,
};

export default createReducer({
  [DATA_RECEIVED](state, { payload }) {
    return Object.assign({}, state, { data: payload.map(processIssue) });
  },
  [FILTERS_RECEIVED](state, { payload }) {
    return Object.assign({}, state, { filters: payload });
  },
  [REQUEST_FILTERS](state) {
    return Object.assign({}, state, { activeFilter: undefined });
  },
  [SUBSCRIBE](state, { payload }) {
    return Object.assign({}, state, { activeFilter: payload });
  },
}, initialState);
