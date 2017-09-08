import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const FilteredBtns = ({ filteredKeys, columns, onFilterRemoveClick }) => {
    return (
        <div className="re-filtered-btns">
            {filteredKeys.map(id => {
                let val = columns.find(_ => _.id === id).name;
                return <button key={uuid.v4()} onClick={() => onFilterRemoveClick(id)} className="re-tbar-btn">{val} <i className="fa fa-remove" />  </button>;
            })}
        </div>

    );
};

FilteredBtns.propTypes = {
    filteredKeys: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onFilterRemoveClick: PropTypes.func.isRequired
};

export default FilteredBtns;
