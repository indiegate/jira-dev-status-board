import pullRequestIcon from '../icons/pull-request.png';
import React from 'react';

import styles from './PrStatus.css';

const getTitle = (pr) => `Pull Request ${pr.id}: ${pr.source.branch} -> ${pr.destination.branch}`;

const PrStatus = ({ pullRequest }) =>
  <a href={pullRequest.url} title={getTitle(pullRequest)}>
    <img src={pullRequestIcon}
         className={styles.icon}
         alt="Pull Request"
         />
    <span className={`${styles.status} ${styles[`${pullRequest.status}`]}`}>{pullRequest.status}</span>
  </a>;

PrStatus.propTypes = {
  pullRequest: React.PropTypes.object.isRequired,
};

export default PrStatus;