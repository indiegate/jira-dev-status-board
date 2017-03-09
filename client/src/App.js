import React, {Component} from 'react';
import { connect } from 'react-redux';

import { subscribe, requestFilters } from './actions';
import './App.css';

import Filters from './components/Filters';
import Board from './components/Board';

class App extends Component {

  static propTypes = {
    activeFilter: React.PropTypes.any,
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
    const { data, activeFilter, filters } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <h2>storyboard/</h2>
        </div>
        <div>
          {
            activeFilter
              ? <Board data={data} activeFilter={activeFilter}/>
              : <Filters onSelect={this.props.subscribe} filters={filters}/>
          }
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
  activeFilter: state.activeFilter,
  data: state.data,
  filters: state.filters,
});

export default connect(mapStateToProps, actions)(App);
