import React, {Component} from 'react';

class IssueRepository extends Component {

  static propTypes = {
    repository: React.PropTypes.object,
  };


  renderBranchRow(branchCombined) {
    return (
      <div>
        {/*<span>{branchCombined.branchName}</span>*/}
        <span> {branchCombined.branches ? branchCombined.branches.map(b => <span>[b]</span>) : null}</span>
        <span> {branchCombined.pullRequests ? branchCombined.pullRequests.map(pr => <span>[pr {pr.status}]</span>) : null}</span>
      </div>
    );
  }


  render() {
    const { name, combined } = this.props.repository;
    return (
      <td>
        <div>
          {name}
        </div>
        <div>
          { combined.map(branchCombined => this.renderBranchRow(branchCombined)) }
        </div>
      </td>
    );
  }
}


export default IssueRepository;
