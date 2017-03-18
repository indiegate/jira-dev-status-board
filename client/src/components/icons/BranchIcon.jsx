import React from 'react';
import branchIcon from '../../icons/branch.png';

import styles from '../Icon.css';

export default ({ branch }) =>
  <a href={branch.url}>
    <img src={branchIcon} className={styles.icon} alt="Branch" title={`Branch ${branch.name}`}/>
  </a>;
