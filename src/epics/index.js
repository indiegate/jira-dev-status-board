import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { ajax } from 'rxjs/observable/dom/ajax';

import { APP_MOUNTED } from '../actionTypes';
import { issuesReceived } from '../actions';

import { combineEpics } from 'redux-observable';
import { processIssue } from '../services/issues';

export const getFeedsEpic = (action$, { getState }) => action$
    .ofType(APP_MOUNTED)
    .mergeMap(action =>
      ajax.getJSON(`http://eg.office.zoomint.com:3000/testIssues`)
        .map(response => issuesReceived(response.map(processIssue)))
    );

export default combineEpics(
  getFeedsEpic,
);
