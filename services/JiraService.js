const _ = require('lodash');
const rp = require('request-promise');
const request = require('request');
const log = require('simple-node-logger').createSimpleFileLogger('project.log');
const Rx = require('rxjs/Rx');

const authHeaders = settings => ({
  "Content-Type": "application/json",
  "Authorization": `Basic ${settings.basicAuth}`,
});

const getIssueDetails = (issueName, settings) => {
  const req = url => rp({
    url,
    headers: authHeaders(settings),
    json: true,
  });

  const issueDetails$ = Rx.Observable
    .fromPromise(req(`${settings.jira}/api/2/issue/${issueName}`))
    .map(data => ({ issueDetails: data }));

  const branches$ = issueDetails$.flatMap(data =>
    Rx.Observable
      .fromPromise(req(`${settings.jira}/dev-status/1.0/issue/detail?issueId=${data.issueDetails.id}&applicationType=stash&dataType=pullrequest`))
      .map(response => Object.assign(
        {},
        data,
        {
          branches: response.detail[0] ? response.detail[0].branches : [],
          pullRequests: response.detail[0] ? response.detail[0].pullRequests : []
        }
      ))
  );

  const builds$ = branches$.flatMap(data => {
    return Rx.Observable.forkJoin(data.branches.map(branch => {

      const projectAndRepo = branch.repository.url.match("projects/(.*)/browse")[1];

      const lastCommit$ = Rx.Observable
        .fromPromise(req(`${settings.stash}/api/1.0/projects/${projectAndRepo}/commits/?until=${branch.name}&limit=1`))
        .retry(3);

      const build$ = lastCommit$
        .flatMap(response => {
          const commitId = response.values[0].id;
          return req(`${settings.stash}/build-status/1.0/commits/stats/${commitId}`);
        })
        .retry(3);

      return build$;
    })).map(builds => Object.assign(
      {},
      data,
      { builds }
    ));
  });

  builds$.subscribe((data) => {
    console.log(data.issueDetails.key, data.branches.map(b => b.name), data.builds);
    console.log('\n\n');
  }, (err) => console.log('fuck fuck', err.message));



  return builds$;
};
//
// builds$.subscribe((data) => {
//   console.log(data.issueDetails.key, data.branches.map(b => b.name), data.builds);
//   //console.log(data);
//
// }, (err) => console.log('fuck fuck', err.message));

/*
const getIssueDetailsOld = (issueName, settings) => {
  let data;
  let repositoriesCommits;
  const headers = authHeaders(settings);


  const promise = rp({
    url: `${settings.jira}/api/2/issue/${issueName}`,
    headers,
    json: true,
  }).then(response => {
    data = {
      key: response.key,
      id: response.id,
      summary: response.fields.summary,
      issueState: response.fields.status.name,
      timeSpent: response.fields.timespent
    };
  }).then(() => rp({
    url: `${settings.jira}/dev-status/1.0/issue/detail?issueId=${data.id}&applicationType=stash&dataType=pullrequest`,
    headers,
    json: true,
  })).then(response => {
    data.branches = response.detail[0] ? response.detail[0].branches : [];
    data.pullRequests = response.detail[0] ? response.detail[0].pullRequests : [];
  }).then(() => rp({
    url: `${settings.jira}/dev-status/1.0/issue/detail?issueId=${data.id}&applicationType=stash&dataType=repository`,
    headers,
    json: true,
  })).then(response => {
    data.commitRepositories = response.detail[0] ? response.detail[0].repositories : [];
  }).then(() => {
    if (data.commitRepositories.length > 0) {
      repositoriesCommits = data.commitRepositories.map(rep => ({
        lastCommit: _.maxBy(rep.commits, commit => commit.authorTimestamp),
        name: rep.name,
        avatarDescription: rep.avatarDescription,
      }));
    } else {
      repositoriesCommits = []
    }
  }).then(() => {
    return Promise.all(repositoriesCommits.map(rep => rep.lastCommit).map(commit => {
      return rp({
        url: `${settings.stash}/build-status/1.0/commits/stats/${commit.id}`,
        headers,
        json: true
      });
    }));
  }).then(values => {
    data.commitRepositories.forEach((rep, idx) => {
      rep.lastCommitBuilds = values[idx];
    });
  })
  // .catch(reason => {
  //   console.log(`Stash API error: ${reason.statusCode}`);
  //   //console.log(reason);
  //   log.error(reason);
  //   return Promise.reject(`Stash API error: ${reason.statusCode}`);
  // })
  .then(() => {
    return data;
  });
  return promise;
};*/

const constructOptions = (filterName, settings) => ({
  url: `${settings.jira}/api/2/search`,
  qs: {
    jql: settings.filters[filterName],
  },
  headers: authHeaders(settings),
  json: true,
});

const getIssues = (filterName, settings) => Rx.Observable
  .fromPromise(rp(constructOptions(filterName, settings)))
    .do(console.log)
  .flatMap(response =>
    Rx.Observable.forkJoin(response.issues.map(issue => getIssueDetails(issue.id, settings))))
  //Rx.Observable.forkJoin([Rx.Observable.range(0, 3), Rx.Observable.range(3, 6)]))
;

exports.getIssues = getIssues;

