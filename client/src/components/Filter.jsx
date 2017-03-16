import React from 'react';
import styles from './Filter.css';

const Filter = ({ name, filter, onSelect }) =>
  <div className={styles.filter} onClick={() => onSelect(name)}>
    <h3>{name}</h3>
    <div className={styles.panel}>{filter}</div>
  </div>;


Filter.propTypes = {
  name: React.PropTypes.string.isRequired,
  filter: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

export default Filter;