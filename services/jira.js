const _ = require('lodash');
const rp = require('request-promise');
const Promise = require('promise');
const request = require('request');
const log = require('simple-node-logger').createSimpleFileLogger('project.log');

const authHeaders = settings => ({
  "Content-Type": "application/json",
  "Authorization": `Basic ${settings.basicAuth}`,
});

const getIssueDetails = (issueName, settings) => {
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
  }).catch(reason => {
    console.log(`Stash API error: ${reason.statusCode}`);
    //console.log(reason);
    log.error(reason);
  }).then(() => {
    return data;
  });
  return promise;
};

const constructOptions = (filterName, settings) => ({
  url: `${settings.jira}/api/2/search`,
  qs: {
    jql: settings.filters[filterName],
  },
  headers: authHeaders(settings),
  json: true,
});

exports.getIssues = (filterName, settings) => rp(constructOptions(filterName, settings))
  .then(response => Promise.all(response.issues.map(issue => getIssueDetails(issue.id, settings))))
  .catch(reason => console.log(`Jira API error: ${reason.statusCode}`));

