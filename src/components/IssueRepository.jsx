import React, {Component} from 'react';
import pullRequestIcon from '../icons/pull-request.png';
import branchIcon from '../icons/branch.png';
import branchDeletedIcon from '../icons/branch-deleted.png';
import buildSuccessfulIcon from '../icons/build-successful.png';
import buildFailedIcon from '../icons/build-failed.png';
import buildInProgressIcon from '../icons/build-in-progress.gif';

class IssueRepository extends Component {

  static propTypes = {
    repository: React.PropTypes.object,
  };

  renderRrStatus(status, idx) {
    return <span key={idx}>
      <img src={pullRequestIcon} className={`PrIcon icon`} alt="PR"/>
      <span className={`PrStatus pr-${status}`}>{status}</span>
    </span>;
  }

  renderBranchIcon(idx) {
    return <img src={branchIcon} className="BranchIcon icon" alt="Branch" key={idx}/>
  }

  renderDeletedBranchIcon() {
    return <img src={branchDeletedIcon} className="BranchIcon icon" alt="Branch"/>
  }

  renderBuildStatus(status) {
    if (status === 'SUCCESSFUL') {
      return <img src={buildSuccessfulIcon} className="BuildIcon icon" alt="Build success"/>
    } else if (status === 'FAILED'){
      return <img src={buildFailedIcon} className="BuildIcon icon" alt="Build failed"/>
    } else if (status === 'IN_PROGRESS'){
      return <img src={buildInProgressIcon} className="BuildIcon icon" alt="Build is in progress"/>
    }
    return null;
  }

  renderBranchRow(branchCombined, idx) {
    return (
      <div className="BranchRow" key={idx}>
        {/*<span>{branchCombined.branchName}</span>*/}
        <span> {branchCombined.branches ? branchCombined.branches.map((b, idx) => this.renderBranchIcon(idx)) : this.renderDeletedBranchIcon()}</span>
        <span> {branchCombined.pullRequests ? branchCombined.pullRequests.map((pr, idx) => this.renderRrStatus(pr.status, idx)) : null}</span>
      </div>
    );
  }

  render() {
    const { name, combined, lastCommitBuild } = this.props.repository;
    return (
      <td>
        <div className="RepositoryName">
          {name} {this.renderBuildStatus(lastCommitBuild)}
        </div>
        <div>
          {combined.map((branchCombined, idx) => this.renderBranchRow(branchCombined, idx))}
        </div>
      </td>
    );
  }
}

export default IssueRepository;
