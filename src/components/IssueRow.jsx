import React, {Component} from 'react';
import IssueRepository from './IssueRepository';

class IssueRow extends Component {

  static propTypes = {
    issue: React.PropTypes.object,
  };

  calcHours(seconds) {
    if (!seconds) return '';
    const hours   = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60
    return `${hours ? `${hours} h ` : ''}${minutes ? `${minutes} mins` : ''}`;
  }

  processState(state) {
    return state.toUpperCase().replace(/ /g, '_');
  }

  renderTimeSpent(timeSpent) {
    return (
      timeSpent
      ? <span className="IssueTimeSpent">{this.calcHours(timeSpent)}</span>
      : null
    );
  }

  renderIssueState(issueState) {
    return (
      <span className={`IssueState is-${this.processState(issueState)}`}>
        {issueState}
      </span>
    );
  }

  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td className="Issue">
          <div>
            {issue.key}
            {this.renderIssueState(issue.issueState)}
            {this.renderTimeSpent(issue.timeSpent)}
          </div>
          <div className="IssueSummary"> {issue.summary}</div>
        </td>
        {issue.repositories.map(rep => <IssueRepository repository={rep}/>)}
      </tr>
    );
  }
}


export default IssueRow;
