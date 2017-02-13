import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { ajax } from 'rxjs/observable/dom/ajax';

import { APP_MOUNTED, ISSUES_RECEIVED } from '../actionTypes';
import { issuesReceived, appMounted } from '../actions';

import { combineEpics } from 'redux-observable';
import { processIssue } from '../services/issues';

export const getFeedsEpic = (action$, { getState }) => action$
    .ofType(APP_MOUNTED)
    .mergeMap(action =>
      ajax.getJSON(`http://eg.office.zoomint.com:4001/issues`)
        .map(response => issuesReceived(response.map(processIssue)))
);

export const intervalEpic = (action$, { getState }) => action$
  .ofType(ISSUES_RECEIVED)
  .delay(1000 * 60 * 5)
  .map(_ => appMounted());

export default combineEpics(
  getFeedsEpic,
  intervalEpic
);
