import React, {Component} from 'react';
import prIcon from '../icons/stash-pull-request.png';
import branchIcon from '../icons/stash-branch.png';
import branchDeletedIcon from '../icons/stash-branch-deleted.png';
import buildSuccessfulIcon from '../icons/bamboo-build-successful.png';
import buildFailedIcon from '../icons/bamboo-build-failed.png';

class IssueRepository extends Component {

  static propTypes = {
    repository: React.PropTypes.object,
  };

  renderRrStatus(status) {
    return <span>
      <img src={prIcon} className={`PrIcon icon`} alt="PR"/>
      <span className={`PrStatus pr-${status}`}>{status}</span>
    </span>;
  }

  renderBranchIcon() {
    return <img src={branchIcon} className="BranchIcon icon" alt="Branch"/>
  }

  renderDeletedBranchIcon() {
    return <img src={branchDeletedIcon} className="BranchIcon icon" alt="Branch"/>
  }

  renderBuildStatus(status) {
    if (status === 'SUCCESSFUL') {
      return <img src={buildSuccessfulIcon} className="BuildIcon icon" alt="Build success"/>
    } else if (status === 'FAILED'){
      return <img src={buildFailedIcon} className="BuildIcon icon" alt="Build failed"/>
    }
    return null;
  }

  renderBranchRow(branchCombined) {
    return (
      <div className="BranchRow">
        {/*<span>{branchCombined.branchName}</span>*/}
        <span> {branchCombined.branches ? branchCombined.branches.map(b => this.renderBranchIcon()) : this.renderDeletedBranchIcon()}</span>
        <span> {branchCombined.pullRequests ? branchCombined.pullRequests.map(pr => <span>{this.renderRrStatus(pr.status)}</span>) : null}</span>
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
          { combined.map(branchCombined => this.renderBranchRow(branchCombined)) }
        </div>
      </td>
    );
  }
}


export default IssueRepository;
