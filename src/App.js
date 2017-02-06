import React, {Component} from 'react';
import { connect } from 'react-redux';

import { appMounted } from './actions';
import IssueRow from './components/IssueRow';
import './App.css';

class App extends Component {

  static propTypes = {
    issues: React.PropTypes.array,
    appMounted: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.appMounted();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>storyboard/</h2>
        </div>
        <div>
          <table border="1">
            <tbody>
              {this.props.issues.map(issue => <IssueRow issue={issue}/>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const actions = {
  appMounted,
};

const mapStateToProps = state => ({
  issues: state.issues,
});

export default connect(mapStateToProps, actions)(App);
