import React from 'react';

const Filters = ({ filters, onSelect }) =>
  <div>
    {
      Object.keys(filters).map((key, idx) =>
          (<span key={idx} onClick={() => onSelect(key)}>
            <span className="filterNmae">{key}</span>
            <span className="filterContent">{filters[key]}</span>
          </span>))
    }
  </div>;


Filters.propTypes = {
  filters: React.PropTypes.object.isRequired,
};

export default Filters;