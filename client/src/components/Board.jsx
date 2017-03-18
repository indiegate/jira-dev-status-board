import React from 'react';
import Issue from './Issue';

const Board = ({ data, columnsMax, activeFilter }) =>
  <table>
    {data.map((issue, idx) => <Issue issue={issue} columnsMax={columnsMax} key={idx}/>)}
  </table>;

Board.propTypes = {
  data: React.PropTypes.array.isRequired,
  activeFilter: React.PropTypes.any,
};

export default Board;

