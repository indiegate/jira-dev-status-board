import React from 'react';
import Filter from './Filter';

const Filters = ({ filters, onSelect }) =>
  <div>{Object.keys(filters).map((key, idx) => <Filter key={idx} name={key} filter={filters[key]} onSelect={onSelect}/>)}</div>;

Filters.propTypes = {
  filters: React.PropTypes.object.isRequired,
};

export default Filters;