import React from 'react';
import buildSuccessfulIcon from '../icons/build-successful.png';
import buildFailedIcon from '../icons/build-failed.png';
import buildInProgressIcon from '../icons/build-in-progress.gif';

//import styles from './BuildStatus.css';

const icons = {
  'SUCCESSFUL': <img src={buildSuccessfulIcon} className="BuildIcon icon" alt="Build success"/>,
  'FAILED': <img src={buildFailedIcon} className="BuildIcon icon" alt="Build failed"/>,
  'IN_PROGRESS': <img src={buildInProgressIcon} className="BuildIcon icon" alt="Build is in progress"/>,
};

const BuildStatus = ({ status }) => icons[status] || null;

BuildStatus.propTypes = {
  status: React.PropTypes.string,
};

export default BuildStatus;
