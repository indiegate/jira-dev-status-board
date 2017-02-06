var express = require('express');
var request = require('request');
var Promise = require('promise');
var rp = require('request-promise');
var app = express();
var _ = require('lodash');

const JIRA_AUTH = process.env.JIRA_AUTH;
const AUTH_HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Basic ${JIRA_AUTH}`,
};

const SEARCH_PARAMETERS = "(project %3D Encourage OR labels %3D MTENC) AND status in (\"In Progress\", \"Ready for Test\")";
const JIRA_FILTER_OPTIONS = {
  url: `http://jira:81/rest/api/2/search?jql=${SEARCH_PARAMETERS}`,
  headers: AUTH_HEADERS,
  json: true,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getIssueDetails = issueName => {
  let data;
  let repositoriesCommits;
  const promise = rp({
    url: `http://jira:81/rest/api/2/issue/${issueName}`,
    headers: AUTH_HEADERS,
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
    url: `http://jira:81/rest/dev-status/1.0/issue/detail?issueId=${data.id}&applicationType=stash&dataType=pullrequest`,
    headers: AUTH_HEADERS,
    json: true,
  })).then(response => {
    data.branches = response.detail[0] ? response.detail[0].branches : [];
    data.pullRequests = response.detail[0] ? response.detail[0].pullRequests : [];
  }).then(() => rp({
    url: `http://jira:81/rest/dev-status/1.0/issue/detail?issueId=${data.id}&applicationType=stash&dataType=repository`,
    headers: AUTH_HEADERS,
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
        url: `http://stash:7990/rest/build-status/1.0/commits/stats/${commit.id}`,
        headers: AUTH_HEADERS,
        json: true
      });
    }));
  }).then(values => {
    data.commitRepositories.forEach((rep, idx) => {
      rep.lastCommitBuilds = values[idx];
    });
  }).then(() => {
    return data;
  });
  return promise;
};

app.get('/testIssues', (req, res) => {
  const issuePromises = ['ENC-2547','ENC-3636','SC-9293','CAL-16820','SC-9272'].map(issue => getIssueDetails(issue));
    Promise.all(issuePromises).then(values => {
      res.send(values);
    }).catch(reason => {
      res.send(reason);
      console.log(reason);
    });
});

app.get('/testIssue', (req, res) => {
  getIssueDetails('ENC-2547') //ENC-2547
    .then(values => res.send([ values ]))
    .catch(reason => {
      res.send(reason);
      console.log(reason);
    });
});

app.get('/issues', (req, res) => {
  rp(JIRA_FILTER_OPTIONS).then(response => {
    const issuePromises = response.issues.map(issue => getIssueDetails(issue.id));
    Promise.all(issuePromises).then(values => {
      res.send(values);
    }).catch(reason => {
      res.send(reason);
      console.log(reason);
    });
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
