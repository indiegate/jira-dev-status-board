import React, {Component} from 'react';
import { connect } from 'react-redux';

import { subscribe, requestFilters } from './actions';
import IssueRow from './components/IssueRow';
import './App.css';

class App extends Component {

  static propTypes = {
    data: React.PropTypes.array,
    filters: React.PropTypes.object,
    subscribe: React.PropTypes.func.isRequired,
    requestFilters: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    const path = window.location.pathname.substring(1);

    if (path) {
      this.props.subscribe(path);
    } else {
      this.props.requestFilters();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>storyboard/</h2>
        </div>
        <div>
          <table>
            <tbody>
              {this.props.data.map((issue, idx) => <IssueRow issue={issue} key={idx}/>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const actions = {
  subscribe,
  requestFilters
};

const mapStateToProps = state => ({
  data: state.data,
  filters: state.filters,
});

export default connect(mapStateToProps, actions)(App);
