import React from 'react';

import styles from './IssueSummary.css';

const calcHours = seconds => {
  if (!seconds) return '';
  const hours   = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return `${hours ? `${hours} h ` : ''}${minutes ? `${minutes} mins` : ''}`;
};

const processState = state => state.toUpperCase().replace(/ /g, '_');

const renderTimeSpent = timeSpent =>
  timeSpent
    ? <span className={styles.timeSpent}>{calcHours(timeSpent)}</span>
    : null;

const renderIssueState = issueState =>
  <span className={`${styles.state} ${styles[processState(issueState)]}`}>
    {issueState}
  </span>;

const IssueSummary = ({ issue }) =>
  <div className={styles.issueSummary}>
    <div>
      <span>{issue.key}</span>
      {renderIssueState(issue.issueState)}
      {renderTimeSpent(issue.timeSpent)}
    </div>
    <div className={styles.summary}>{issue.summary}</div>
  </div>;

IssueSummary.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default IssueSummary;
