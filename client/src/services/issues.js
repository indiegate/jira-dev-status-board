import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

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

function findBuild(repositoryUrl, repositories) {
  const reps = repositories.filter(r => r.url === repositoryUrl);
  if (reps.length > 0) {
    return calcBuilds(reps[0].lastCommitBuilds)
  }
  return undefined;
}

export function processIssue(issue) {

  const repositories = sortBy(uniqBy(flatten([
    issue.branches.map(b => b.repository),
    issue.pullRequests.map(pr => pr.source.repository,
    issue.commitRepositories)
  ]), rep => rep.url).map(rep => ({
    projectAvatar: rep.avatar,
    url: rep.url,
    project: rep.avatarDescription,
    name: rep.name,
    build: findBuild(rep.url, issue.commitRepositories),
  })), ['project', 'name']);

  // all existing branches
  const branches = issue.branches.map(b => ({
    name: b.name,
    url: b.url,
    deleted: false,
    createPullRequestUrl: b.createPullRequestUrl,
    repositoryUrl: b.repository.url,
  }));

  const branchNames = sortBy(uniq(branches.map(b => b.name)), b => b);

  const branchRepositories = branchNames.map(bn => ({
      branchName: bn,
      repositories: repositories.map(r => {

        const relatedBranches = branches.filter(b => b.name === bn && b.repositoryUrl === r.url);
        const pullRequests =
          issue.pullRequests.filter(pr => pr.source.branch === bn && pr.source.repository.url === r.url);
        const branch = relatedBranches.length > 0
          ? relatedBranches[0]
          : pullRequests.length > 0 ? { name: bn, deleted: true } : null;

        return { branch, pullRequests };
    })
  }));

  return {
    key: issue.key,
    id:issue.id,
    summary: issue.summary,
    issueState: issue.issueState,
    timeSpent: issue.timeSpent,
    repositoryHeaders: repositories,
    branchRepositories,
  };
}