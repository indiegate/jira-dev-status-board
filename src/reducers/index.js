import createReducer from '../createReducer';
import { ISSUES_RECEIVED } from '../actionTypes';

const initialState = {
    issues: [],
    detail: null,
};

export default createReducer({
    [ISSUES_RECEIVED](state, { payload }) {
        return Object.assign({}, state, { issues: payload });
    },
}, initialState);
