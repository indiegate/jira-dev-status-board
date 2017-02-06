import * as ActionTypes from '../actionTypes';

export const appMounted = () => ({type: ActionTypes.APP_MOUNTED});
export const issuesReceived = payload => ({type: ActionTypes.ISSUES_RECEIVED, payload});
