import React, {Component} from 'react';
import IssueRepository from './IssueRepository';

class IssueRow extends Component {

  static propTypes = {
    issue: React.PropTypes.object,
  };

  processState(state) {
    return state.toUpperCase().replace(/ /g, '_');
  }

  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td className="Issue">
          <div className="IssueSummary">{issue.key} {issue.summary}</div>
          <div>
            <span className="IssueTitle">Status: </span>
            <span className={`IssueState is-${this.processState(issue.issueState)}`}>{issue.issueState}</span>
          </div>
          {/*<div className="IssueTimeSpent">{issue.timeSpent}</div>*/}
        </td>
        {issue.repositories.map(rep => <IssueRepository repository={rep}/>)}
      </tr>
    );
  }
}


export default IssueRow;
