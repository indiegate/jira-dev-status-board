import React, {Component} from 'react';
import styles from './IssueSummary.css';

// calcHours(seconds) {
//   if (!seconds) return '';
//   const hours   = Math.floor(seconds / 3600);
//   const minutes = Math.floor(seconds / 60) % 60;
//   return `${hours ? `${hours} h ` : ''}${minutes ? `${minutes} mins` : ''}`;
// }
//
// processState(state) {
//   return state.toUpperCase().replace(/ /g, '_');
// }
//
// renderTimeSpent(timeSpent) {
//   return (
//     timeSpent
//       ? <span className="IssueTimeSpent">{this.calcHours(timeSpent)}</span>
//       : null
//   );
// }
//
// renderIssueState(issueState) {
//   return (
//     <span className={`IssueState is-${this.processState(issueState)}`}>
//         {issueState}
//       </span>
//   );
// }

const IssueSummary = ({ issue }) =>
  <td className={styles.issueSummary}>
    <div> {issue.summary}</div>
  </td>;

IssueSummary.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default IssueSummary;
