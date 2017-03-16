import React, {Component} from 'react';
import BuildStatus from './BuildStatus';
import Branch from './Branch';
import styles from './IssueRepository.css';

class IssueRepository extends Component {

  static propTypes = {
    repository: React.PropTypes.object,
  };

  render() {
    const { name, combined, lastCommitBuild } = this.props.repository;
    return (
      <td className={styles.root}>
        <div className="RepositoryName">
          {name} <BuildStatus status={lastCommitBuild}/>
        </div>
        <div>
          {combined.map((branchCombined, idx) => <Branch branchCombined={branchCombined} key={idx}/>)}
        </div>
      </td>
    );
  }
}

export default IssueRepository;
