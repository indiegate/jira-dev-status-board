import pullRequestIcon from '../icons/pull-request.png';
import React from 'react';

//import styles from './PrStatus.css';

const PrStatus = ({ status }) =>
  <span>
    <img src={pullRequestIcon} className={`PrIcon icon`} alt="Pull Request"/>
    <span className={`PrStatus pr-${status}`}>{status}</span>
  </span>;

PrStatus.propTypes = {
  status: React.PropTypes.string.isRequired,
};

export default PrStatus;