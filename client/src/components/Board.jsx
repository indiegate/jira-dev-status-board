import React from 'react';
import IssueRow from './IssueRow';

const Board = ({ data, activeFilter }) =>
  <table>
    <tbody>
      {data.map((issue, idx) => <IssueRow issue={issue} key={idx}/>)}
    </tbody>
  </table>;

Board.propTypes = {
  data: React.PropTypes.array.isRequired,
  activeFilter: React.PropTypes.any,
};

export default Board;

