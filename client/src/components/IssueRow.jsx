import React from 'react';

import Branch from './Branch';
import IssueSummary from './IssueSummary';
import RepositoryHeader from './RepositoryHeader';

import styles from './IssueRow.css';

const IssueRow = ({ issue, columnsMax }) => (
  <tbody className={styles.row}>
    <tr>
      <td width="20%" rowSpan={issue.branchRepositories.length + 1}>
        <IssueSummary issue={issue}/>
      </td>
      <td></td>
      {issue.repositoryHeaders.map((rep, idx) => <td key={idx}><RepositoryHeader repository={rep}/></td>)}
    </tr>
    {issue.branchRepositories.map((br, idx) => <Branch branchRepository={br} columnsMax={columnsMax} key={idx}/>)}
  </tbody>
);

IssueRow.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default IssueRow;
