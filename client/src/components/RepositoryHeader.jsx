import React from 'react';

import BuildStatus from './BuildStatus';

import styles from './RepositoryHeader.css';

const RepositoryHeader = ({ repository }) =>
  <span className={styles.line}>
    <img src={repository.projectAvatar} className={styles.icon} alt={repository.project} title={repository.project}/>
    <span className={styles.label}>{repository.name}</span>
    <BuildStatus status={repository.build}/>
  </span>;

RepositoryHeader.propTypes = {
  repository: React.PropTypes.object.isRequired,
};

export default RepositoryHeader;
