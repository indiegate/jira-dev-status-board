import max from 'lodash/max';

import createReducer from '../createReducer';
import { DATA_RECEIVED, DATA_RECEIVED_FAILED, FILTERS_RECEIVED, REQUEST_FILTERS, SUBSCRIBE } from '../actionTypes';
import { processIssue } from '../services/issues';

const initialState = {
  showError: undefined,
  data: [],
  columnsMax: 0,
  filters: {},
  activeFilter: undefined,
};

export default createReducer({
  [DATA_RECEIVED](state, { payload }) {
    console.log(payload);
    const data = payload.map(processIssue);
    const columnsMax = max(data.map(d => d.repositoryHeaders.length));
    return Object.assign({}, state, { data, columnsMax, showError: undefined });
  },
  [DATA_RECEIVED_FAILED](state) {
    return Object.assign({}, state, { showError: 'Error with getting data from Jira or Stash' });
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
