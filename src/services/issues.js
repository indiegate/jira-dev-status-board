import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

function calcBuilds(buildsStatus) {
  if (buildsStatus.inProgress > 0) {
    return 'IN_PROGRESS';
  } else if (buildsStatus.failed > 0) {
    return 'FAILED';
  } else if (buildsStatus.successful > 0) {
    return 'SUCCESSFUL';
  }
  return 'NONE';
}

export function processIssue(issue) {
  const groupedBranches = groupBy(issue.branches, branch => (`${branch.repository.avatarDescription}/${branch.repository.name}`));
  const groupsMap = mapValues(groupedBranches, value => ({ branches: value }));

  const groupedPullRequsts = groupBy(issue.pullRequests, pr => (`${pr.source.repository.avatarDescription}/${pr.source.repository.name}`));

  Object.keys(groupedPullRequsts).forEach(key => {
    if (!groupsMap[key]) {
      groupsMap[key] = {};
    }
    groupsMap[key].pullRequests = groupedPullRequsts[key];
  });

  issue.commitRepositories.forEach(rep => {
    const n = `${rep.avatarDescription}/${rep.name}`;
    if (!groupsMap[n]) {
      groupsMap[n] = {};
    }
    groupsMap[n].lastCommitBuild = calcBuilds(rep.lastCommitBuilds);
  });

  const keys = Object.keys(groupsMap);
  issue.repositories = keys.map(key => ({
    name: key,
    ...groupsMap[key],
  }));

  issue.repositories.forEach(rep => {
    const map = {};

    const bMap = groupBy(rep.branches, b => b.name);
    const prMap = groupBy(rep.pullRequests, p=>p.source.branch);

    Object.keys(bMap).forEach(key => {
      map[key] = { branches: bMap[key]}
    });

    Object.keys(prMap).forEach(key => {
      if (!map[key]) {
        map[key] = {};
      }
      map[key].pullRequests = prMap[key];
    });

    const ks = Object.keys(map);
    rep.combined = ks.map(key => ({
      branchName: key,
      ...map[key],
    }));
  });

  return issue;
}