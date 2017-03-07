import * as ActionTypes from '../actionTypes';

export const subscribe = payload => ({type: ActionTypes.SUBSCRIBE, payload});
export const dataReceived = payload => ({type: ActionTypes.DATA_RECEIVED, payload});
export const requestFilters = () => ({type: ActionTypes.REQUEST_FILTERS});
export const filtersReceived = payload => ({type: ActionTypes.FILTERS_RECEIVED, payload});