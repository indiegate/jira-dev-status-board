import max from 'lodash/max';

import createReducer from '../createReducer';
import { DATA_RECEIVED, FILTERS_RECEIVED, REQUEST_FILTERS, SUBSCRIBE } from '../actionTypes';
import { processIssue } from '../services/issues';

const initialState = {
  data: [],
  columnsMax: 0,
  filters: {},
  activeFilter: undefined,
};

export default createReducer({
  [DATA_RECEIVED](state, { payload }) {
    const data = payload.map(processIssue);
    const columnsMax = max(data.map(d => d.repositoryHeaders.length));
    return Object.assign({}, state, { data, columnsMax });
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
