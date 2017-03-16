import React from 'react';
import IssueRow from './IssueRow';

const Board = ({ data, activeFilter }) =>
  <table>
    {data.map((issue, idx) => <IssueRow issue={issue} key={idx}/>)}
  </table>;

Board.propTypes = {
  data: React.PropTypes.array.isRequired,
  activeFilter: React.PropTypes.any,
};

export default Board;

