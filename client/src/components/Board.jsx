import React from 'react';
import IssueRow from './IssueRow';

const Board = ({ data, columnsMax, activeFilter }) =>
  <table>
    {data.map((issue, idx) => <IssueRow issue={issue} columnsMax={columnsMax} key={idx}/>)}
  </table>;

Board.propTypes = {
  data: React.PropTypes.array.isRequired,
  activeFilter: React.PropTypes.any,
};

export default Board;

