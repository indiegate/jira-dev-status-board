import React, {Component} from 'react';
import IssueRepository from './IssueRepository';

class IssueRow extends Component {

  static propTypes = {
    issue: React.PropTypes.object,
  };

  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td className="Issue">
          <div className="IssueSummary">{issue.summary}</div>
        </td>
        {issue.repositories.map(rep => <IssueRepository repository={rep}/>)}
      </tr>
    );
  }
}


export default IssueRow;
