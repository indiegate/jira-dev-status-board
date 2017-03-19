import React from 'react';

import Branch from './Branch';
import IssueSummary from './IssueSummary';
import RepositoryHeader from './RepositoryHeader';

import styles from './Issue.css';

const renderFull = (issue, columnsMax) =>
  <tbody className={styles.row}>
    <tr>
      <td width="20%" rowSpan={issue.branchRepositories.length + 1}>
        <IssueSummary issue={issue}/>
      </td>
      <td></td>
      {issue.repositoryHeaders.map((rep, idx) => <td key={idx}><RepositoryHeader repository={rep}/></td>)}
    </tr>
    {issue.branchRepositories.map((br, idx) => <Branch branchRepository={br} columnsMax={columnsMax} key={idx}/>)}
  </tbody>;

const renderWithoutData = (issue, columnsMax) =>
  <tbody className={styles.row}>
    <tr>
      <td width="20%">
        <IssueSummary issue={issue}/>
      </td>
      <td></td>
      {/*hack to show full row border*/}
      {[...Array(columnsMax)].map((e, idx) => <td key={idx}/>)}
    </tr>
  </tbody>;

const Issue = ({ issue, columnsMax }) =>
  issue.branchRepositories.length > 0
    ? renderFull(issue, columnsMax)
    : renderWithoutData(issue, columnsMax);


Issue.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default Issue;
